import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import Feed from "../../components/Feed";
import "./index.scss";
import { Users } from "../../dummyData";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="homeContainer">
          <Sidebar />
          <Feed />
          <Rightbar users={Users} />
        </div>
      </div>
    </>
  );
}
