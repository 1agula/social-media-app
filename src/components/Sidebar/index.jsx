import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Notifications,
  Bookmark,
  Chat,
  Group,
  ExitToApp,
  Person,
} from "@material-ui/icons";
import AuthService from "../../services/auth.service";

export default function Sidebar() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await AuthService.logout();
    window.alert("Logout Successfully, now you are redirect to the homepage.");
    navigate("/login");
  };
  const handleProfile = () => {
    const { username } = currentUser.user;
    navigate(`/profile/${username}`);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li
            className="sidebarListItem"
            onClick={() => {
              navigate("/home");
            }}
          >
            <Home className="sidebarIcon" />
            <span className="sidebarListItemText">Home</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Followers</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">Notification</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>

          <li className="sidebarListItem" onClick={handleProfile}>
            <Person className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem" onClick={handleLogout}>
            <ExitToApp className="sidebarIcon" />
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}
