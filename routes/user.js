const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});
//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});
//get
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const { username } = req.query;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, isAdmin, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get followings
router.get("/followings/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const followings = await Promise.all(
      currentUser.followings.map((id) => {
        return User.findById(id);
      })
    );
    let followingsList = [];
    followings.map((following) => {
      const { _id, username, profilePicture } = following;
      followingsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(followingsList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get followers
router.get("/followers/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const followers = await Promise.all(
      currentUser.followers.map((id) => {
        return User.findById(id);
      })
    );
    let followersList = [];
    followers.map((d) => {
      const { _id, username, profilePicture } = d;
      followersList.push({ _id, username, profilePicture });
    });
    res.status(200).json(followersList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed.");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't follow yourself.");
  }
});
//unfolow
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed.");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't unfollow yourself.");
  }
});

module.exports = router;
