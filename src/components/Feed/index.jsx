import "./index.scss";
import Share from "../Share";
import Post from "../Post";
import { Users, Posts } from "../../dummyData";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => {
          return <Post key={post.id} post={post} users={Users} />;
        })}
      </div>
    </div>
  );
}
