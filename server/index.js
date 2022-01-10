const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("images"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully.");
  } catch (err) {
    console.log(err);
  }
});
app.use("/api/auth", authRoute);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRoute
);
app.use(
  "/api/post",
  passport.authenticate("jwt", { session: false }),
  postRoute
);
app.use(
  "/api/conversation",
  passport.authenticate("jwt", { session: false }),
  conversationRoute
);
app.use(
  "/api/message",
  passport.authenticate("jwt", { session: false }),
  messageRoute
);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
