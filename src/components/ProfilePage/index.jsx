import { useState, useEffect } from "react";
import "./index.scss";
import Post from "../Post";
import PostService from "../../services/post.service";

export default function ProfilePage({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      PostService.getAllPosts(user._id).then((response) => {
        setPosts(response.data);
      });
    };
    fetchPost();
  }, [user._id]);
  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="topContainer">
          <img src="/assets/post/3.jpg" alt="" />
        </div>
        <img
          className="pfp"
          src={user.profilePicture || "/assets/person/noAvatar.jpg"}
          alt=""
        />
        <div className="bottomContainer">
          <div className="username">{user.username}</div>
        </div>
      </div>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
