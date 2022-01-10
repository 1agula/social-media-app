import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../../App";
import "./index.scss";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ChatService from "../../services/chat.service";
import UserService from "../../services/user.service";
import { io } from "socket.io-client";

export default function MessageComponent() {
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const scrollRef = useRef();
  const { conversationId } = useParams();
  const [message, setMessage] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();
  const [receiver, setReceiver] = useState();
  const [socket, setSocket] = useState();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    setSocket(io("ws://localhost:8990"));
  }, []);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        _id: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessage((previous) => [...previous, arrivalMessage]);
  }, [arrivalMessage, receiver]);

  useEffect(() => {
    if (receiver?._id) {
      socket?.emit("addReceiver", receiver._id);
      socket?.on("getReceivers", (receiveres) => {
        // console.log(receiveres);
      });
    }
  }, [receiver, socket]);

  useEffect(() => {
    const fetchUser = async () => {
      const messages = await ChatService.getMessage(conversationId);
      setMessage(messages.data);

      const conversation = await ChatService.getConversation(
        currentUser.user._id
      );
      const userId = await conversation.data[0].members.filter(
        (user) => user !== currentUser.user._id
      )[0];
      const user = await UserService.getUser(userId);
      setReceiver(user.data);
    };
    fetchUser();
  }, [conversationId, currentUser]);

  const inputMessage = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    socket?.emit("sendMessage", {
      senderId: currentUser.user._id,
      receiverId: receiver?._id,
      text: inputMessage.current.value,
    });

    ChatService.addMessage(conversationId, inputMessage.current.value);
    inputMessage.current.value = "";
  };
  return (
    <div className="chatComponent">
      <div className="goBack">
        <MdArrowBack
          onClick={() => {
            navigate(-1);
          }}
          className="arrowBack"
        ></MdArrowBack>
        <span>Message</span>
      </div>
      <div className="chat">
        <div className="chatWrapper">
          <div className="chatTop">
            {receiver &&
              message?.map((msg) => {
                return (
                  <div
                    ref={scrollRef}
                    key={msg._id}
                    className={`chatContent ${
                      currentUser.user._id === msg.sender && "own"
                    }`}
                  >
                    <img
                      className="chatPfp"
                      src={
                        currentUser.user._id === msg.sender
                          ? IMAGE_URL + currentUser.user.profilePicture
                          : IMAGE_URL + receiver?.profilePicture
                      }
                      alt=""
                    />
                    <div className="chatText">
                      <span>{msg.text}</span>
                      <p>1 hour ago</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <form className="chatBottom" onSubmit={handleSubmit}>
            <input
              ref={inputMessage}
              required
              placeholder="write somthing..."
            ></input>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
