import { useContext, Fragment, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import FriendList from "../../components/FriendList";
import "./index.scss";
import { Users } from "../../dummyData";
import { CurrentUserContext } from "../../App";
import UserService from "../../services/user.service";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [followings, setFollowings] = useState([]);
  useEffect(() => {
    UserService.getFollowings().then((followings) => {
      setFollowings(followings.data);
    });
  }, []);

  return (
    <>
      {!currentUser && <Navigate to="/login" />}
      {currentUser && (
        <Fragment>
          <Topbar />
          <div className="bodyContainer">
            <div className="friendContainer">
              <Sidebar />
              <div className="friendListContainer">
                <div className="goBack">
                  <MdArrowBack
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="arrowBack"
                  ></MdArrowBack>
                  <span>Friends</span>
                </div>
                {followings.map((following) => {
                  return (
                    <FriendList key={following._id} following={following} />
                  );
                })}
              </div>
              <Rightbar users={Users} />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
}
