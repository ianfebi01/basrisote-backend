const express = require("express");
<<<<<<< HEAD
const { createPost, getAllPosts, deletePost } = require("../controllers/post");
=======
const {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} = require("../controllers/post");
>>>>>>> main
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);
<<<<<<< HEAD
router.get("/deletePost", authUser, deletePost);
=======
router.patch("/updatePost/:id", authUser, updatePost);
router.delete("/deletePost/:id", authUser, deletePost);
>>>>>>> main

module.exports = router;
