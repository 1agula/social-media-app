import "./index.scss";
import {
  RssFeed,
  Event,
  School,
  WorkOutline,
  HelpOutline,
  Bookmark,
  Chat,
  VideoLabel,
  Group,
} from "@material-ui/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <VideoLabel className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Group</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="https://i.pinimg.com/736x/fc/13/e3/fc13e3d41ea79b82f9c8199e85ef3f3a--icons.jpg"
              alt="friendpfp"
            />
            <span className="sidebarFriendName">Big Gay</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
