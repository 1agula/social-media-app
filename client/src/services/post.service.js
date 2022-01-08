import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class PostService {
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
    return axiosInstance.post(
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
    return axiosInstance.post("/upload", data);
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
    return axiosInstance.get("/post/timeline/" + _id, {
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
    return axiosInstance.get("/post/" + postId, {
      headers: { Authorization: token },
    });
  }

  deletePost(postId) {
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
    return axiosInstance.delete("/post/" + postId, {
      headers: {
        Authorization: token,
      },
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
    return axiosInstance.get("/post/profile/" + userId, {
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
    return axiosInstance.put(
      "/post/" + postId + "/like",
      { userId: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  commentPost(postId, desc, username) {
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
      "/post/comment/" + postId,
      {
        comments: {
          username: username,
          userId: _id,
          desc: desc,
          commentedAt: new Date(),
        },
      },
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
    return axiosInstance.put(
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
    return axiosInstance.get("/post/bookmarks/" + _id, {
      headers: { Authorization: token },
    });
  }
}

export default new PostService();
