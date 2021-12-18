import "./index.scss";
import Post from "../Post";
import { Users, Posts } from "../../dummyData";

export default function index() {
  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="topContainer">
          <img src="assets/post/3.jpg" alt="" />
        </div>
        <img className="pfp" src="assets/person/1.jpg" alt="" />
        <div className="bottomContainer">
          <div className="username">poopoo</div>
        </div>
      </div>
      {Posts.map((post) => {
        return <Post key={post.id} post={post} users={Users} />;
      })}
    </div>
  );
}
