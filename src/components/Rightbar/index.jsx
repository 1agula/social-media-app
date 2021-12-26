import "./index.scss";

export default function Right(props) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <p className="rightbarTitle">Who to follow</p>
        <ul className="rightbarFriendList">
          {props.users.map((user) => {
            return (
              <li key={user.id} className="rightbarFriend">
                <div className="rightbarPfp">
                  <img src={user.profilePicture} alt="pfp" />
                  <span className="badge"></span>
                </div>
                <span className="rightbarName">{user.username}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
