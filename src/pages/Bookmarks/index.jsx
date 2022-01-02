import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import Post from "../../components/Post";
import "./index.scss";
import { Users } from "../../dummyData";
import { MdArrowBack } from "react-icons/md";
import PostService from "../../services/post.service";
import { useNavigate } from "react-router-dom";

export default function Bookmarks() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = () => {
      PostService.getBookmarks().then((response) => {
        setPosts(response.data);
      });
    };
    fetchPost();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="homeContainer">
          <Sidebar />
          <div className="postContainer">
            <div className="goBack">
              <MdArrowBack
                onClick={() => {
                  navigate(-1);
                }}
                className="arrowBack"
              ></MdArrowBack>
              <span>Bookmarks</span>
            </div>
            {posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
          <Rightbar users={Users} />
        </div>
      </div>
    </>
  );
}
