import "./index.scss";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/1.jpg" alt="pfp" />
          <input placeholder="What's in your mind?" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Image</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="steelblue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="yellowgreen" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}
