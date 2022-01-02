import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import ProfilePage from "../../components/ProfilePage";
import "./index.scss";
import { Users } from "../../dummyData";
import UserService from "../../services/user.service";

export default function Profile() {
  const params = useParams;
  const { username } = params();
  const [user, setUser] = useState({});

  useEffect(() => {
    UserService.getUserName(username).then((response) => {
      setUser(response.data);
    });
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="profileContainer">
          <Sidebar />
          {user._id && <ProfilePage user={user} />}
          <Rightbar users={Users} />
        </div>
      </div>
    </>
  );
}
