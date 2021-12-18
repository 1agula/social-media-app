import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import ProfilePage from "../../components/ProfilePage";
import "./index.scss";
import { Users } from "../../dummyData";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="profileContainer">
          <Sidebar users={Users} />
          <ProfilePage />
          <Rightbar users={Users} />
        </div>
      </div>
    </>
  );
}
