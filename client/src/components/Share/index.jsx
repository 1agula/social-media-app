import { useContext, useRef, useState, useEffect } from "react";
import { CurrentUserContext } from "../../App";
import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  MdAddPhotoAlternate,
  MdTag,
  MdAddLocationAlt,
  MdCancel,
} from "react-icons/md";

export default function Share({ setPosts }) {
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { profilePicture, _id } = currentUser.user;
  const handleProfile = () => {
    const { username } = currentUser.user;
    navigate(`/profile/${username}`);
  };
  const handleShare = (e) => {
    e.preventDefault();
    if (desc.current.value) {
      let imgName;
      if (file) {
        const formdata = new FormData();
        const getExtension = (str) => str.slice(str.lastIndexOf("."));
        const extString = getExtension(file.name);
        const fileName =
          "post-" + currentUser.user._id + "-" + Date.now() + extString;
        formdata.append("name", fileName);
        formdata.append("images", file);
        imgName = fileName;
        PostService.uploadImage(formdata);
      }

      PostService.post(_id, desc.current.value, imgName);
      desc.current.value = "";
      setFile(null);
      const fetchPost = () => {
        PostService.getTimelinePosts().then((response) => {
          setPosts(response.data);
        });
      };
      fetchPost();
    } else {
      return;
    }
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      UserService.getUser(_id).then((response) => {
        setUser(response.data);
      });
    };
    fetchUser();
  }, [_id]);

  return (
    <form className="share" onSubmit={handleShare}>
      <div className="shareTop">
        <img
          onClick={handleProfile}
          src={
            (user.profilePicture && IMAGE_URL + user.profilePicture) ||
            "/assets/person/noAvatar.jpg"
          }
          alt=""
        />
        <textarea required ref={desc} placeholder="What's in your mind?" />
      </div>
      {file && (
        <div className="shareImgContainer">
          <img src={URL.createObjectURL(file)} alt="" />
          <MdCancel
            className="shareCancelImg"
            onClick={() => {
              setFile(null);
            }}
          />
        </div>
      )}
      <hr className="shareHr" />
      <div className="shareBottom">
        <div className="shareIcons">
          <label htmlFor="file">
            <MdAddPhotoAlternate />
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <label htmlFor="">
            <MdTag />
          </label>
          <label htmlFor="">
            <MdAddLocationAlt />
          </label>
        </div>
        <button type="submit">Share</button>
      </div>
    </form>
  );
}
