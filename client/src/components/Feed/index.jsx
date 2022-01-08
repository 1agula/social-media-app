import { useState, useEffect } from "react";
import "./index.scss";
import Share from "../Share";
import PostComponent from "../PostComponent";
import PostService from "../../services/post.service";

export default function Feed() {
  let [posts, setPosts] = useState([]);
  posts.sort(function (a, b) {
    const keyA = new Date(a.createdAt);
    const keyB = new Date(b.createdAt);
    // nulls sort before anything else
    if (a.length === 0 || b.length === 0) return -1;
    // Compare the 2 dates
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });

  useEffect(() => {
    const fetchPost = () => {
      PostService.getTimelinePosts().then((response) => {
        setPosts(response.data);
      });
    };
    fetchPost();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share setPosts={setPosts} />
        {posts.map((post) => {
          return <PostComponent key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}
