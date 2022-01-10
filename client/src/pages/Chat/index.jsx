import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App";
import { MdArrowBack } from "react-icons/md";
import ChatService from "../../services/chat.service";
import UserService from "../../services/user.service";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import ChatComponent from "../../components/ChatComponent";
import "./index.scss";

export default function Message() {
  const { currentUser } = useContext(CurrentUserContext);
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const conversation = await ChatService.getConversation(
        currentUser.user._id
      );
      const users = await Promise.all(
        conversation.data.map(async (data) => {
          const userId = data.members.filter(
            (user) => user !== currentUser.user._id
          );
          const user = await UserService.getUser(userId);
          return { ...user.data, conversationId: data._id };
        })
      );
      setUsers(users);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="chatContainer">
          <Sidebar />
          <ChatComponent users={users} />
          <Rightbar />
        </div>
      </div>
    </>
  );
}
