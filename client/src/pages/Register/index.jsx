import { useRef } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function Register() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const handleClick = () => {
    email.current.value &&
      AuthService.register(
        username.current.value,
        email.current.value,
        password.current.value
      )
        .then(() => {
          window.alert(
            "Registration succeeds. You are now redirect to the login page."
          );
          navigate("/login");
        })
        .catch((error) => {
          console.log(error.response);
        });
  };

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
            <input
              ref={username}
              required
              placeholder="User Name"
              type="text"
              className="loginInput"
            />
            <input
              ref={email}
              required
              placeholder="Email"
              type="Email"
              className="loginInput"
            />
            <input
              ref={password}
              required
              minLength="6"
              placeholder="Password"
              type="Password"
              className="loginInput"
            />
            <button onClick={handleClick} className="loginButton">
              Sign Up
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="loginRegisterButton"
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
