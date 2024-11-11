const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const PostController = require("../controllers/Posts");
const { checkAuth } = require("../middlewares/checkAuth");
const controller = new PostController();

router.get("/", controller.getPosts);

router.get("/:id", controller.getPostById);

router.post("/add", checkAuth, upload.single("postImage"), controller.addPost);

router.put("/edit/:id", checkAuth, controller.updatePost);

router.put("/:id", controller.addView);

router.delete("/:id", checkAuth, controller.deletePost);

module.exports = router;
