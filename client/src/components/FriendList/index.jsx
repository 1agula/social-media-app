import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import UserService from "../../services/user.service";

export default function FriendList({ friends }) {
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  const { _id, username, profilePicture, desc } = friends;
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [followed, setFollowed] = useState(
    currentUser.user.followings.includes(_id)
  );
  useEffect(() => {
    setFollowed(currentUser.user.followings.includes(_id));
  }, [_id, currentUser]);
  const handleFollow = () => {
    try {
      if (followed) {
        UserService.unfollow(_id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            followings: currentUser.user.followings.filter(
              (data) => data !== _id
            ),
          },
        };
        localStorage.user = JSON.stringify(newState);
        setCurrentUser(newState);
      } else {
        UserService.follow(_id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            followings: currentUser.user.followings.concat(_id),
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
                navigate(`/profile/${username}`);
              }}
              src={
                (profilePicture && IMAGE_URL + profilePicture) ||
                "/assets/person/noAvatar.jpg"
              }
              alt=""
            />
          </div>
          <div className="friendDetail">
            <div className="friendTop">
              <span
                onClick={() => {
                  navigate(`/profile/${username}`);
                }}
              >
                {username}
              </span>
              {_id !== currentUser.user._id && (
                <button onClick={handleFollow}>
                  {followed ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="friendBottom">
              <span>{desc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
