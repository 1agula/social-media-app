import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  MdMoreVert,
  MdFavoriteBorder,
  MdShare,
  MdChatBubbleOutline,
  MdRepeat,
  MdFavorite,
} from "react-icons/md";
import { format } from "timeago.js";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";
import { CurrentUserContext } from "../../App";

export default function Post({ post }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(
    post.likes.find((d) => {
      return d === currentUser.user._id;
    })
  );
  const [isActive, setIsActive] = useState({
    more: false,
    repost: false,
    share: false,
    comment: false,
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      UserService.getUser(post.userId).then((response) => {
        setUser(response.data);
      });
    };
    fetchUser();
  }, [post.userId]);

  const hideComment = useRef();
  const hideCommentInput = useRef();
  const hideMore = useRef();
  const hideRepost = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !hideCommentInput.current.contains(event.target) &&
        !hideComment.current.contains(event.target) &&
        !hideRepost.current.contains(event.target) &&
        !hideMore.current.contains(event.target)
      ) {
        setIsActive({
          more: false,
          repost: false,
          share: false,
          comment: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const likeHandler = () => {
    PostService.likePost(post._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((previous) => {
      return !previous;
    });
  };

  const thisPost = useRef();
  const handleDelete = () => {
    try {
      thisPost.current.style.display = "none";
      PostService.deletePost(post._id);
    } catch (err) {
      console.log(err);
    }
  };

  const bookmarkHandler = () => {
    try {
      if (currentUser.user.bookmarks.includes(post._id)) {
        PostService.bookmarkPost(post._id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            bookmarks: currentUser.user.bookmarks.filter(
              (data) => data !== post._id
            ),
          },
        };
        localStorage.user = JSON.stringify(newState);
        setCurrentUser(newState);
      } else {
        PostService.bookmarkPost(post._id);
        const newState = {
          ...currentUser,
          user: {
            ...currentUser.user,
            bookmarks: currentUser.user.bookmarks.concat(post._id),
          },
        };
        localStorage.user = JSON.stringify(newState);
        setCurrentUser(newState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = () => {
    try {
      if (currentUser.user.followings.includes(post.userId)) {
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
    <div ref={thisPost} className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              onClick={() => {
                navigate(`/profile/${user.username}`);
              }}
              src={
                (user.profilePicture &&
                  "http://localhost:8800/posts/" + user.profilePicture) ||
                "/assets/person/noAvatar.jpg"
              }
              alt=""
            />
            <span
              onClick={() => {
                navigate(`/profile/${user.username}`);
              }}
              className="postUserName"
            >
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div
            onClick={() => {
              setIsActive({ ...isActive, more: !isActive.more });
            }}
            className="postTopRight"
            ref={hideMore}
          >
            <MdMoreVert className="dropbtn" />
            <ul
              style={isActive.more ? { display: "block" } : { display: "none" }}
              className="dropdown-content"
            >
              {currentUser.user._id === post.userId && (
                <li onClick={handleDelete}>Delete Post</li>
              )}
              {currentUser.user._id !== post.userId &&
                (currentUser.user.followings.includes(post.userId) ? (
                  <li onClick={handleFollow}>Unfollow This User</li>
                ) : (
                  <li onClick={handleFollow}>Follow This User</li>
                ))}
              {currentUser.user.bookmarks.includes(post._id) ? (
                <li onClick={bookmarkHandler}>Delete From Bookmarks</li>
              ) : (
                <li onClick={bookmarkHandler}>Add To Bookmarks</li>
              )}
            </ul>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {post.img && (
            <img src={"http://localhost:8800/posts/" + post.img} alt="" />
          )}
        </div>

        <div className="postBottom">
          <div
            onClick={() => {
              setIsActive({
                ...isActive,
                comment: !isActive.comment,
                repost: false,
              });
            }}
            style={isActive.comment ? { color: "cornflowerblue" } : {}}
            className="iconContainer"
            ref={hideComment}
          >
            <MdChatBubbleOutline className="icon" />
            <span>3</span>
          </div>
          <div
            onClick={() => {
              setIsActive({
                ...isActive,
                repost: !isActive.repost,
                comment: false,
              });
            }}
            style={isActive.repost ? { color: "limegreen" } : {}}
            className="iconContainer"
            ref={hideRepost}
          >
            <MdRepeat className="icon dropbtn" />
            <span>5</span>
          </div>
          <div onClick={likeHandler} className="iconContainer">
            {isLiked ? (
              <MdFavorite style={{ color: "crimson" }} className="icon" />
            ) : (
              <MdFavoriteBorder className="icon" />
            )}

            <span>{like}</span>
          </div>
          <div className="iconContainer">
            <MdShare className="icon" />
          </div>
        </div>
        <div
          style={
            isActive.comment || isActive.repost
              ? { display: "block" }
              : { display: "none" }
          }
          className="PostHidden"
          ref={hideCommentInput}
        >
          <div className="inputSection">
            <img
              src={
                (user.profilePicture &&
                  "http://localhost:8800/posts/" + user.profilePicture) ||
                "/assets/person/noAvatar.jpg"
              }
              alt=""
            />
            <input
              type="text"
              placeholder={isActive.repost ? "Quote" : "Comment"}
              required
            />
          </div>
          <div className="sendSection">
            <button
              style={
                isActive.repost
                  ? { backgroundColor: "limegreen" }
                  : { backgroundColor: "cornflowerblue" }
              }
            >
              {isActive.repost ? "Repost" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
