const express = require("express");
const router = express.Router();

// Import controller
const { dummyLink, unlikePost } = require("../controllers/likeController");
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPost } = require("../controllers/postController");
const { likePost } = require("../controllers/likeController");
 
// Mapping Create
router.get("/dummyroute", dummyLink);
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

//Export
module.exports = router;    