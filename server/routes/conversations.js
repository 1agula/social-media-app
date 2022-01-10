const router = require("express").Router();
const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req, res) => {
  const conversation = await Conversation.findOne({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log(conversation);
  if (!conversation) {
    console.log("======");
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    console.log("======");
    res.status(200).json(conversation);
  }
});

//get conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
