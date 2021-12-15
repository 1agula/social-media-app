const router = require("express").Router();
const { findOneAndUpdate, findById } = require("../models/Post");
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated.");
    } else {
      res.status(403).json("You can update only yours post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted.");
    } else {
      res.status(403).json("You can delete only yours post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like a post
//get a post
//get all timeline post

module.exports = router;
