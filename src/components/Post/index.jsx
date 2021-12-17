import "./index.scss";
import { MoreVert, Reply } from "@material-ui/icons";
import RepeatIcon from "@material-ui/icons/Repeat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src="https://icon-library.com/images/f22fac699c_68431.png"
              alt="pfp"
            />
            <span className="postUserName">chin chin</span>
            <span className="postDate">5min ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {" "}
          <span className="postText">Ore wa ochinchin ga daisuki nandayo</span>
          <img
            src="https://wallpaperboat.com/wp-content/uploads/2019/06/pink-guy-05.jpg"
            alt="post"
          />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <RepeatIcon htmlColor="grey" className="rightIcon" />
            <span className="rightCounter">5</span>
            <ThumbUpAltIcon htmlColor="grey" className="rightIcon" />
            <span className="rightCounter">32</span>
          </div>
          <div className="postBottomRight">
            <Reply htmlColor="grey" className="commentIcon" />
            <span className="commentCounter">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
