import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import MessageComponent from "../../components/MessageComponent";
import "./index.scss";
import { Users } from "../../dummyData";

export default function Message() {
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="chatContainer">
          <Sidebar />
          <MessageComponent />
          <Rightbar users={Users} />
        </div>
      </div>
    </>
  );
}
