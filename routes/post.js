const express = require("express");

const {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} = require("../controllers/post");

const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);
router.patch("/updatePost/:id", authUser, updatePost);
router.delete("/deletePost/:id", authUser, deletePost);

module.exports = router;
