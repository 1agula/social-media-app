import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import "./index.scss";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";
import {
  MdMoreVert,
  MdFavoriteBorder,
  MdShare,
  MdChatBubbleOutline,
  MdRepeat,
  MdFavorite,
} from "react-icons/md";

export default function PostComponent({ post }) {
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(
    post.likes.find((d) => {
      return d === currentUser.user._id;
    })
  );
  const params = useParams();
  const [isActive, setIsActive] = useState({
    more: false,
    repost: false,
    share: false,
    comment: false,
  });
  const [user, setUser] = useState({});
  const comment = useRef();
  const hideComment = useRef();
  const hideCommentInput = useRef();
  const hideMore = useRef();
  const hideShare = useRef();
  const hideRepost = useRef();
  const thisPost = useRef();
  const postTopLeft = useRef();
  const likeButton = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      UserService.getUser(post.userId).then((response) => {
        setUser(response.data);
      });
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !hideCommentInput.current.contains(event.target) &&
        !hideComment.current.contains(event.target) &&
        !hideRepost.current.contains(event.target) &&
        !hideMore.current.contains(event.target) &&
        !hideShare.current.contains(event.target)
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

  const handleClickInside = (event) => {
    if (
      !hideCommentInput.current.contains(event.target) &&
      !hideComment.current.contains(event.target) &&
      !hideRepost.current.contains(event.target) &&
      !hideMore.current.contains(event.target) &&
      !hideShare.current.contains(event.target) &&
      !likeButton.current.contains(event.target) &&
      !postTopLeft.current.contains(event.target)
    ) {
      navigate("/post/" + post._id);
    }
  };

  const likeHandler = () => {
    PostService.likePost(post._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((previous) => {
      return !previous;
    });
  };
  const commentHandler = (e) => {
    e.preventDefault();
    setIsActive({ ...isActive, comment: false });
    PostService.commentPost(
      post._id,
      comment.current.value,
      currentUser.user.username
    )
      .then(() => {
        comment.current.value = "";
        params.postId && window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
  const handleClipboard = () => {
    var type = "text/plain";
    var blob = new Blob([window.location.origin + "/post/" + post._id], {
      type,
    });
    var data = [new window.ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);
  };

  return (
    <div
      onClick={!params.postId ? handleClickInside : undefined}
      ref={thisPost}
      className="post"
    >
      <div className="postTop">
        <div ref={postTopLeft} className="postTopLeft">
          <img
            onClick={() => {
              navigate(`/profile/${user.username}`);
            }}
            src={
              (user.profilePicture && IMAGE_URL + user.profilePicture) ||
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
        {post.img && <img src={IMAGE_URL + post.img} alt="" />}
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
          <span>{post.comments.length}</span>
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
          <span></span>
        </div>
        <div ref={likeButton} onClick={likeHandler} className="iconContainer">
          {isLiked ? (
            <MdFavorite style={{ color: "crimson" }} className="icon" />
          ) : (
            <MdFavoriteBorder className="icon" />
          )}

          <span>{like}</span>
        </div>
        <div
          onClick={() => {
            setIsActive({ ...isActive, share: !isActive.share });
          }}
          ref={hideShare}
          className="iconContainer"
        >
          <MdShare className="icon" />
          <ul
            style={isActive.share ? { display: "block" } : { display: "none" }}
            className="dropdown-content"
          >
            <li onClick={handleClipboard}>Copy Post URL</li>
          </ul>
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
        <form className="inputSection" onSubmit={commentHandler}>
          <img
            src={
              (user.profilePicture && IMAGE_URL + user.profilePicture) ||
              "/assets/person/noAvatar.jpg"
            }
            alt=""
          />
          <input
            ref={comment}
            type="text"
            placeholder={isActive.repost ? "Quote" : "Comment"}
            required
          />
          <button
            type="submit"
            style={
              isActive.repost
                ? { backgroundColor: "limegreen" }
                : { backgroundColor: "cornflowerblue" }
            }
          >
            {isActive.repost ? "Repost" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
