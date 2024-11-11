const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();

const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const models = require("./models");

const AuthService = require("./services/Auth");
const PostService = require("./services/Post");
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Connction failed" + err.message));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.locals.models = {
  users: models.users,
  posts: models.posts,
};

app.locals.services = {
  users: new AuthService(app.locals.models),
  posts: new PostService(app.locals.models),
};
app.listen(process.env.PORT, () => console.log("Server is running"));
