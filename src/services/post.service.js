import axios from "axios";
const API_URL = "http://192.168.0.8:8080/api/course";

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

class CourseService {
  post(title, description, price) {
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
    return axios.get("/post/timeline/" + _id, {
      headers: { Authorization: token },
    });
  }

  getAllPosts(userId) {
    return axios.get("/post/profile/" + userId, {
      headers: { Authorization: token },
    });
  }

  likePost(postId) {
    return axios.put(
      "/post/" + postId + "/like",
      { userId: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getCourseByName(name) {
    return axios.get(API_URL + "/findbyname/" + name, {
      headers: { Authorization: token },
    });
  }

  get(_id) {
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }
}

export default new CourseService();
