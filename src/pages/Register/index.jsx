import React from "react";
import "./index.scss";

export default function login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">Bocchi Social</div>
          <span className="loginDesc">
            Connect with bocchis and the world around you on bocchi social.
          </span>
        </div>
        <div className="loginRight">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="loginBox"
          >
            <input placeholder="User Name" type="text" className="loginInput" />
            <input placeholder="Email" type="Email" className="loginInput" />
            <input
              placeholder="Password"
              type="Password"
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="Password"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
