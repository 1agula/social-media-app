import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import "./index.scss";
import Post from "../Post";
import { MdArrowBack } from "react-icons/md";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";

export default function ProfilePage({ user, setUser }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [edit, setEdit] = useState(false);
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

  const userName = useRef();
  const desc = useRef();
  const [file, setFile] = useState(null);
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleSubmit = () => {
    let imgName = user.profilePicture;
    if (file) {
      const formdata = new FormData();
      const getExtension = (str) => str.slice(str.lastIndexOf("."));
      const extString = getExtension(file.name);
      const fileName =
        "avatar-" + currentUser.user._id + "-" + Date.now() + extString;
      formdata.append("name", fileName);
      formdata.append("post", file);
      imgName = fileName;
      PostService.uploadImage(formdata);
    }
    setEdit(!edit);
    UserService.updateUser({
      ...currentUser.user,
      username: userName.current.value,
      desc: desc.current.value,
      profilePicture: imgName,
    });
    setUser({
      ...user,
      username: userName.current.value,
      desc: desc.current.value,
    });
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
            <label htmlFor="file">
              <img
                src={
                  (user.profilePicture &&
                    "http://localhost:8800/posts/" + user.profilePicture) ||
                  "/assets/person/noAvatar.jpg"
                }
                alt=""
              />
              {edit && (
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              )}
            </label>
          </div>
          <div className="profileDetail">
            <div className="profileTop">
              {edit ? (
                <input
                  ref={userName}
                  type="text"
                  defaultValue={user.username}
                />
              ) : (
                <span>{user.username}</span>
              )}

              {username !== currentUser.user.username ? (
                <button onClick={handleFollow}>
                  {followed ? "Unfollow" : "Follow"}
                </button>
              ) : edit ? (
                <div>
                  <button onClick={handleEdit}>Cancel</button>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              ) : (
                <button onClick={handleEdit}>Edit Profile</button>
              )}
            </div>
            <div className="profileCenter">
              <span
                onClick={() => {
                  user.username && navigate("/follower/" + user.username);
                }}
              >
                {`${user.followers.length}`} Followers
              </span>
              <span
                onClick={() => {
                  user.username && navigate("/following/" + user.username);
                }}
              >
                {`${user.followings.length}`} Following
              </span>
            </div>
            <div className="profileBottom">
              {edit ? (
                <textarea ref={desc} type="text" defaultValue={user.desc} />
              ) : (
                <span>{user.desc}</span>
              )}
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
