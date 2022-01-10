import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  MdHome,
  MdNotifications,
  MdBookmark,
  MdChat,
  MdExitToApp,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import AuthService from "../../services/auth.service";

export default function Navigation() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    window.alert("Logout Successfully, now you are redirect to the homepage.");
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  };
  const handleProfile = () => {
    const { username } = currentUser.user;
    navigate(`/profile/${username}`);
  };
  return (
    <div className="navigation">
      <ul>
        <li
          onClick={() => {
            navigate("/home");
          }}
        >
          <MdHome className="icon" />
          <span>Home</span>
        </li>
        <li>
          <MdSearch className="icon" />
          <span>Search</span>
        </li>
        <li
          onClick={() => {
            navigate("/chats");
          }}
        >
          <MdChat className="icon" />
          <span>Chats</span>
        </li>
        <li>
          <MdNotifications className="icon" />
          <span>Notification</span>
        </li>
        <li
          onClick={() => {
            navigate("/bookmarks");
          }}
        >
          <MdBookmark className="icon" />
          <span>Bookmarks</span>
        </li>

        <li onClick={handleProfile}>
          <MdPerson className="icon" />
          <span>Profile</span>
        </li>
        <li onClick={handleLogout}>
          <MdExitToApp className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}
