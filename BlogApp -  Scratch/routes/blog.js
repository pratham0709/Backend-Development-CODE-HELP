const express = require("express");
const router = express.Router();

// Import controller
const { dummyLink, likePost, unlikePost } = require("../controllers/likeController");
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPost } = require("../controllers/postController");


// export controller
router.get("/dummyroute", dummyLink);
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);


module.exports = router;