import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class ConversationService {
  //conversation

  getConversation(userId) {
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
    return axiosInstance.get("/conversation/" + userId, {
      headers: { Authorization: token },
    });
  }

  addConversation(receiverId) {
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
    return axiosInstance.post(
      "/conversation",
      { senderId: _id, receiverId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //message

  addMessage(conversationId, text) {
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
    return axiosInstance.post(
      "/message",
      { conversationId, text, sender: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getMessage(conversationId) {
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
    return axiosInstance.get("/Message/" + conversationId, {
      headers: { Authorization: token },
    });
  }
}

export default new ConversationService();
