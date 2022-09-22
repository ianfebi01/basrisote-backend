const express = require("express");
const { createPost, getAllPosts, deletePost } = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/deletePost", authUser, deletePost);

module.exports = router;
