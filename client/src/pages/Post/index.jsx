import { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/Rightbar";
import PostComponent from "../../components/PostComponent";
import "./index.scss";
import { Users } from "../../dummyData";
import { MdArrowBack, MdComment } from "react-icons/md";
import PostService from "../../services/post.service";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    PostService.getOnePost(postId).then((data) => {
      setPost(data.data);
    });
  }, [postId]);
  // console.log(post.comments.length);
  return (
    <>
      <Topbar />
      <div className="bodyContainer">
        <div className="homeContainer">
          <Sidebar />
          {post._id && (
            <div className="postContainer">
              <div className="goBack">
                <MdArrowBack
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="arrowBack"
                ></MdArrowBack>
                <span>Post</span>
              </div>
              <PostComponent post={post} />
              <ul>
                {post.comments.length !== 0 && (
                  <div className="goBack">
                    <MdComment className="arrowBack"></MdComment>
                    <span>Comments</span>
                  </div>
                )}
                {post.comments
                  .sort((a, b) => {
                    const keyA = new Date(a.commentedAt);
                    const keyB = new Date(b.commentedAt);
                    // nulls sort before anything else
                    if (a.length === 0 || b.length === 0) return -1;
                    // Compare the 2 dates
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                  })
                  .map((data) => {
                    return (
                      <li key={data._id}>
                        <img
                          onClick={() => {
                            navigate("/profile/" + data.username);
                          }}
                          src="/assets/person/noAvatar.jpg"
                          alt=""
                        />
                        <div>
                          <div>
                            <span
                              onClick={() => {
                                navigate("/profile/" + data.username);
                              }}
                              className="username"
                            >
                              {data.username}
                            </span>
                            <span className="timeago">
                              {format(data.commentedAt)}
                            </span>
                          </div>
                          <div className="desc">
                            <span>{data.desc}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          <Rightbar users={Users} />
        </div>
      </div>
    </>
  );
}
