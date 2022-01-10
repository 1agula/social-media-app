const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
var mongoose = require("mongoose");

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

//comment a post
router.put("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({
      $push: {
        comments: { ...req.body.comments, _id: mongoose.Types.ObjectId() },
      },
    });
    res.status(200).json("The post has been updated.");
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json("The post has been deleted.");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked.");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//add to bookmarks
router.put("/:id/bookmark", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user.bookmarks.includes(req.params.id)) {
      await user.updateOne({ $push: { bookmarks: req.params.id } });
      res.status(200).json("successfully added to bookmarks.");
    } else {
      await user.updateOne({ $pull: { bookmarks: req.params.id } });
      res.status(200).json("The bookmark has been deleted.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all timeline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((firiendId) => {
        return Post.find({ userId: firiendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get Bookmarks
router.get("/bookmarks/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const bookmarks = await Promise.all(
      currentUser.bookmarks.map((postId) => {
        return Post.findById(postId);
      })
    );
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all post
router.get("/profile/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
