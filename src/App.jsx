import { useState, createContext } from "react";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import AuthService from "./services/auth.service";
const CurrentUserContext = createContext();
const { Provider } = CurrentUserContext;

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <>
      <Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/:mate/:username" element={<Friends />}></Route>
          <Route path="/:mate/:username" element={<Friends />}></Route>
          <Route path="/bookmarks" element={<Bookmarks />}></Route>
        </Routes>
      </Provider>
    </>
  );
}
export { CurrentUserContext };
export default App;
