import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class UserService {
  getUser(userId) {
    let token;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.get(`/user?userId=` + userId, {
      headers: { Authorization: token },
    });
  }
  getUserName(username) {
    let token;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.get(`/user?username=` + username, {
      headers: { Authorization: token },
    });
  }

  follow(id) {
    let token;
    let _id;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
        _id = JSON.parse(localStorage.getItem("user")).user._id;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.put(
      "/user/" + id + "/follow",
      { userId: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  unfollow(id) {
    let token;
    let _id;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
        _id = JSON.parse(localStorage.getItem("user")).user._id;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.put(
      "/user/" + id + "/unfollow",
      { userId: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getFollowers(userId) {
    let token;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.get("/user/followers/" + userId, {
      headers: { Authorization: token },
    });
  }
  getFollowings(userId) {
    let token;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.get("/user/followings/" + userId, {
      headers: { Authorization: token },
    });
  }
  updateUser(user) {
    let token;
    let _id;
    try {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
        _id = JSON.parse(localStorage.getItem("user")).user._id;
      } else {
        token = "";
      }
    } catch (error) {
      console.log(error);
    }
    return axiosInstance.put("/user/" + _id, user, {
      headers: { Authorization: token },
    });
  }
}

export default new UserService();
