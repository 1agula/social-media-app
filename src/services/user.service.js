import axios from "axios";
const API_URL = "http://192.168.0.8:8080/api/course";

class CourseService {
  post(title, description, price) {
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

    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getTimelinePosts() {
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
    return axios.get("/post/timeline/" + _id, {
      headers: { Authorization: token },
    });
  }

  enroll(_id, user_id) {
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

    return axios.post(
      API_URL + "/enroll/" + _id,
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getCourseByName(name) {
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
    return axios.get(API_URL + "/findbyname/" + name, {
      headers: { Authorization: token },
    });
  }

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
    return axios.get(`/user?userId=` + userId, {
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
    return axios.get(`/user?username=` + username, {
      headers: { Authorization: token },
    });
  }
}

export default new CourseService();
