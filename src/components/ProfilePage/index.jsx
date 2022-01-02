import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import "./index.scss";
import Post from "../Post";
import { MdArrowBack } from "react-icons/md";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";

export default function ProfilePage({ user }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const params = useParams;
  const { username } = params();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      PostService.getAllPosts(user._id).then((response) => {
        setPosts(response.data);
      });
    };
    fetchPost();
  }, [user._id]);

  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    setFollowed(currentUser.user.followings.includes(user._id));
  }, [user, currentUser]);
  const handleFollow = () => {
    try {
      if (followed) {
        UserService.unfollow(user._id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            followings: currentUser.user.followings.filter(
              (data) => data !== user._id
            ),
          },
        };
        localStorage.user = JSON.stringify(newState);
        setCurrentUser(newState);
      } else {
        UserService.follow(user._id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            followings: currentUser.user.followings.concat(user._id),
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
    <div className="profilePage">
      <div className="profilePageWrapper">
        <div className="goBack">
          <MdArrowBack
            onClick={() => {
              navigate(-1);
            }}
            className="arrowBack"
          ></MdArrowBack>
          <span>Profile</span>
        </div>
        <div className="profile">
          <div className="profileImg">
            <img
              src={user.profilePicture || "/assets/person/noAvatar.jpg"}
              alt=""
            />
          </div>
          <div className="profileDetail">
            <div className="profileTop">
              <span>{user.username}</span>
              {username !== currentUser.user.username ? (
                <button onClick={handleFollow}>
                  {followed ? "Unfollow" : "Follow"}
                </button>
              ) : (
                <button>Edit Profile</button>
              )}
            </div>
            <div className="profileCenter">
              <span>{`${user.followers.length}`} Followers</span>
              <span>{`${user.followings.length}`} Following</span>
            </div>
            <div className="profileBottom">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore facere eum suscipit tempora saepe blanditiis neque
                dicta
              </span>
            </div>
          </div>
        </div>
      </div>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
