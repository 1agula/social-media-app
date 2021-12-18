import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import "./index.scss";
import { Users } from "../../dummyData";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="profileContainer">
          <Sidebar users={Users} />
          <div className="profileRight"></div>
        </div>
      </div>
    </>
  );
}
