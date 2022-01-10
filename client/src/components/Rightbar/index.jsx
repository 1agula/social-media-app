import "./index.scss";
import {
  BsGithub,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import ChatService from "../../services/chat.service";
export default function Contact() {
  const navigate = useNavigate();
  const addConversation = () => {
    ChatService.addConversation("61d3ebaad30bce46f3780d8c").then((data) => {
      console.log(data);
      navigate("/message/" + data.data._id);
    });
  };

  return (
    <div className="Contact">
      <ul>
        <li>
          <span>Contact</span>
        </li>
        <li>
          <a onClick={addConversation}>
            <BsFillChatDotsFill className="icon" />
            Message
          </a>
        </li>
        <li>
          <a href="mailto:sudopain@gmail.com" target="_blank" rel="noreferrer">
            <GrMail className="icon" />
            Email
          </a>
        </li>
        <li>
          <a
            href="https://github.com/sudopain"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub className="icon" />
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCbslYgFIf11sbJ8G-b4nd5Q"
            target="_blank"
            rel="noreferrer"
          >
            <BsYoutube className="icon" />
            Youtube
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/yuridanshi/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram className="icon" />
            Instagram
          </a>
        </li>
        <li>
          <a href="https://twitter.com/home" target="_blank" rel="noreferrer">
            <BsTwitter className="icon" />
            Twitter
          </a>
        </li>
      </ul>
    </div>
  );
}
