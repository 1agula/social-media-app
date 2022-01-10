import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function ChatComponent({ users }) {
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  const navigate = useNavigate();
  return (
    <div className="chats">
      <div className="goBack">
        <MdArrowBack
          onClick={() => {
            navigate(-1);
          }}
          className="arrowBack"
        ></MdArrowBack>
        <span>Chats</span>
      </div>
      <ul>
        {users?.map((user) => {
          return (
            <li
              onClick={() => {
                navigate("/message/" + user.conversationId);
              }}
              key={user.conversationId}
            >
              <img
                src={
                  user.profilePicture === ""
                    ? "/assets/person/noAvatar.jpg"
                    : IMAGE_URL + user.profilePicture
                }
                alt="pfp"
              />
              <span>{user.username}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
