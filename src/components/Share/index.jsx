import { useContext, useRef, useState } from "react";
import { CurrentUserContext } from "../../App";
import PostService from "../../services/post.service";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { MdAddPhotoAlternate, MdTag, MdAddLocationAlt } from "react-icons/md";

export default function Share({ setPosts }) {
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { profilePicture, _id } = currentUser.user;
  const handleProfile = () => {
    const { username } = currentUser.user;
    navigate(`/profile/${username}`);
  };
  const handleShare = () => {
    if (desc.current.value) {
      let imgName;
      if (file) {
        const formdata = new FormData();
        const getExtension = (str) => str.slice(str.lastIndexOf("."));
        const extString = getExtension(file.name);
        const fileName =
          "post-" + currentUser.user._id + "-" + Date.now() + extString;
        formdata.append("name", fileName);
        formdata.append("post", file);
        imgName = fileName;
        PostService.uploadImage(formdata);
      }

      PostService.post(_id, desc.current.value, imgName);
      desc.current.value = "";
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

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            onClick={handleProfile}
            src={profilePicture || "/assets/person/noAvatar.jpg"}
            alt=""
          />
          <textarea ref={desc} placeholder="What's in your mind?" />
          <p>{file && file.name}</p>
        </div>
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
          <button onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
}
