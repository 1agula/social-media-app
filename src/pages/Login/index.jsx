import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/auth.service";
import "./index.scss";
import { CurrentUserContext } from "../../App";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    AuthService.login(email.current.value, password.current.value)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setCurrentUser(AuthService.getCurrentUser());
        }
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
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
              Login
            </button>
            {message && <span className="loginErr">{message}!</span>}
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
