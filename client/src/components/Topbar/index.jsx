import { MdSearch } from "react-icons/md";
import "./index.scss";

export default function Topbar() {
  return (
    <nav>
      <div className="navLeft">
        <span className="logo">Bocchi Social</span>
      </div>
      <div className="navCenter">
        <div className="searchBar">
          <MdSearch className="searchIcon" />
          <input placeholder="Search" />
        </div>
      </div>
      <div className="navRight"></div>
    </nav>
  );
}
