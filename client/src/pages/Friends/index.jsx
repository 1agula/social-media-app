import { useContext, Fragment, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
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
  const [friends, setFriends] = useState([]);
  const params = useParams;
  const { username, mate } = params();
  const [user, setUser] = useState({});
  useEffect(() => {
    UserService.getUserName(username).then((response) => {
      setUser(response.data);
    });
  }, [username]);
  useEffect(() => {
    mate === "following" &&
      user._id &&
      UserService.getFollowings(user._id).then((friends) => {
        setFriends(friends.data);
      });
    mate === "follower" &&
      user._id &&
      UserService.getFollowers(user._id).then((friends) => {
        setFriends(friends.data);
      });
  }, [user, mate]);

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
                  <span>
                    {mate === "following" ? "Followings" : "Followers"}
                  </span>
                </div>
                {friends.map((friends) => {
                  return <FriendList key={friends._id} friends={friends} />;
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
