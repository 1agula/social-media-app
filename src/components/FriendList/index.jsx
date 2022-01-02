import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import UserService from "../../services/user.service";

export default function FriendList({ following }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [followed, setFollowed] = useState(
    currentUser.user.followings.includes(following._id)
  );
  useEffect(() => {
    setFollowed(currentUser.user.followings.includes(following._id));
  }, [following, currentUser]);
  const handleFollow = () => {
    try {
      if (followed) {
        UserService.unfollow(following._id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            followings: currentUser.user.followings.filter(
              (data) => data !== following._id
            ),
          },
        };
        localStorage.user = JSON.stringify(newState);
        setCurrentUser(newState);
      } else {
        UserService.follow(following._id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            followings: currentUser.user.followings.concat(following._id),
          },
        };
        localStorage.user = JSON.stringify(newState);
        setCurrentUser(newState);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="friendList">
      <div className="friendListWrapper">
        <div className="friend">
          <div className="friendImg">
            <img
              onClick={() => {
                navigate(`/profile/${following.username}`);
              }}
              src={following.profilePicture || "/assets/person/noAvatar.jpg"}
              alt=""
            />
          </div>
          <div className="friendDetail">
            <div className="friendTop">
              <span
                onClick={() => {
                  navigate(`/profile/${following.username}`);
                }}
              >
                {following.username}
              </span>
              <button onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="friendBottom">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore facere eum suscipit tempora saepe blanditiis neque
                dicta
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
