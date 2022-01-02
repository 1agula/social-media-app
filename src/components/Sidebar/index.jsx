import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  MdHome,
  MdNotifications,
  MdBookmark,
  MdChat,
  MdGroup,
  MdExitToApp,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import AuthService from "../../services/auth.service";

export default function Sidebar() {
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
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li
            className="sidebarListItem"
            onClick={() => {
              navigate("/home");
            }}
          >
            <MdHome className="sidebarIcon" />
            <span className="sidebarListItemText">Home</span>
          </li>
          <li className="sidebarListItem">
            <MdSearch className="sidebarIcon" />
            <span className="sidebarListItemText">Search</span>
          </li>
          <li className="sidebarListItem">
            <MdChat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li
            onClick={() => {
              navigate("/friends");
            }}
            className="sidebarListItem"
          >
            <MdGroup className="sidebarIcon" />
            <span className="sidebarListItemText">Friends</span>
          </li>
          <li className="sidebarListItem">
            <MdNotifications className="sidebarIcon" />
            <span className="sidebarListItemText">Notification</span>
          </li>
          <li
            onClick={() => {
              navigate("/bookmarks");
            }}
            className="sidebarListItem"
          >
            <MdBookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>

          <li className="sidebarListItem" onClick={handleProfile}>
            <MdPerson className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem" onClick={handleLogout}>
            <MdExitToApp className="sidebarIcon" />
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}
