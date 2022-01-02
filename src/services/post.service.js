import axios from "axios";
const API_URL = "http://192.168.0.8:8080/api/course";

class CourseService {
  post(userId, desc, img) {
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
      "/post",
      { desc, userId, img },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  uploadImage(data) {
    return axios.post("/upload", data);
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

  getOnePost(postId) {
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
    return axios.get("/post/" + postId, {
      headers: { Authorization: token },
    });
  }

  getAllPosts(userId) {
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
    return axios.get("/post/profile/" + userId, {
      headers: { Authorization: token },
    });
  }

  likePost(postId) {
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

  bookmarkPost(postId) {
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
    return axios.put(
      "/post/" + postId + "/bookmark",
      { userId: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getBookmarks() {
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
    return axios.get("/post/bookmarks/" + _id, {
      headers: { Authorization: token },
    });
  }
}

export default new CourseService();
