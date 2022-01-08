import { useContext, Fragment } from "react";
import { Navigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import Feed from "../../components/Feed";
import "./index.scss";
import { Users } from "../../dummyData";
import { CurrentUserContext } from "../../App";

export default function Home() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return (
    <>
      {!currentUser && <Navigate to="/login" />}
      {currentUser && (
        <Fragment>
          <Topbar />
          <div className="bodyContainer">
            <div className="homeContainer">
              <Sidebar />
              <Feed />
              <Rightbar users={Users} />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
}
