import { Search, Person, Notifications, Chat } from "@material-ui/icons";
import "./index.scss";

export default function Topbar() {
  return (
    <nav>
      <div className="navLeft">
        <span className="logo">Bocchi Social</span>
      </div>
      <div className="navCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input placeholder="Search" />
        </div>
      </div>
      <div className="navRight">
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
      </div>
    </nav>
  );
}
