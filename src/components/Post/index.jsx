import { useState } from "react";
import "./index.scss";
import {
  MoreVert,
  FavoriteBorder,
  Share,
  ChatBubbleOutline,
  Repeat,
  Favorite,
} from "@material-ui/icons";

export default function Post({ post, users }) {
  const user = users.filter((user) => {
    return user.id === post.userId;
  })[0];
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((previous) => {
      return !previous;
    });
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture} alt="pfp" />
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="post" />
        </div>

        <div className="postBottom">
          <div className="iconContainer">
            <ChatBubbleOutline className="icon" />
            <span>{post.comment}</span>
          </div>
          <div className="iconContainer">
            <Repeat className="icon" />
            <span>5</span>
          </div>
          <div onClick={likeHandler} className="iconContainer">
            {isLiked ? (
              <Favorite htmlColor="crimson" className="icon" />
            ) : (
              <FavoriteBorder className="icon" />
            )}

            <span>{like}</span>
          </div>
          <div className="iconContainer">
            <Share className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
