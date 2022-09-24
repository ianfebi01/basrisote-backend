const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { type, category, header, images, body, user } = req.body;

    const postId = req.params.id;
    const posts = await Post.findOneAndReplace(
      { _id: postId },
      {
        type: type,
        category: category,
        header: header,
        images: images,
        body: body,
        user: user,
      }
    );
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const data = await Post.findByIdAndRemove(req.params.id);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
