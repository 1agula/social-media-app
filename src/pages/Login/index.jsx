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
            <input placeholder="Email" type="Email" className="loginInput" />
            <input
              placeholder="Password"
              type="Password"
              className="loginInput"
            />
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
