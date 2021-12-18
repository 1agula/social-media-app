import "./index.scss";

export default function Right(props) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <img
          className="rightbarAd"
          src="https://www.advertgallery.com/wp-content/uploads/2018/02/furniture-world-thanks-a-lot-sale-minimum-50-off-ad-times-of-india-hyderabad-09-02-2018.png"
          alt="ad"
        />
        <h4 className="rightbarTitle">Who to follow</h4>
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
