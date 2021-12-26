import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import {
  MoreVert,
  FavoriteBorder,
  Share,
  ChatBubbleOutline,
  Repeat,
  Favorite,
} from "@material-ui/icons";
import { format } from "timeago.js";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";
import { CurrentUserContext } from "../../App";

export default function Post({ post }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [like, setLike] = useState(post.likes.length);
  let result = post.likes.find((d) => {
    return d === currentUser.user._id;
  });
  console.log(result);
  const [isLiked, setIsLiked] = useState(
    post.likes.find((d) => {
      return d === currentUser.user._id;
    })
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      UserService.getUser(post.userId).then((response) => {
        setUser(response.data);
      });
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = () => {
    PostService.likePost(post._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((previous) => {
      return !previous;
    });
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <Link className="postTopLeft" to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture || "/assets/person/noAvatar.jpg"}
              alt=""
            />
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </Link>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.img} alt="" />
        </div>

        <div className="postBottom">
          <div className="iconContainer">
            <ChatBubbleOutline className="icon" />
            <span>3</span>
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
