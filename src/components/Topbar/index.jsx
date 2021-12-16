import { Search, Person, Notifications, Chat } from "@material-ui/icons";
import "./index.scss";

export default function Topbar() {
  return (
    <nav>
      <div className="navLeft">
        <span className="logo">уул.</span>
      </div>
      <div className="navCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input placeholder="Search" />
        </div>
      </div>
      <div className="navRight">
        <div className="navLinks">
          <span className="navLink">Homepage</span>
          <span className="navLink">Timeline</span>
        </div>
        <div className="navIcons">
          <div className="navIconItem">
            <Person />
            <span className="badge">1</span>
          </div>
          <div className="navIconItem">
            <Chat />
            <span className="badge">1</span>
          </div>
          <div className="navIconItem">
            <Notifications />
            <span className="badge">1</span>
          </div>
        </div>
        <img
          src="https://i.pinimg.com/originals/ed/64/55/ed6455552d33668a6b88185933f670f1.jpg"
          alt="pfp"
        />
      </div>
    </nav>
  );
}
