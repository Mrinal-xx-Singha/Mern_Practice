const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user._id,
  });
  res.status(201).json(blog);
};

exports.getBlogs = async (req, res) => {
  const { page = 1, limit = 5, title } = req.query;
  const filter = title ? { title: new RegExp(title, "i") } : {};

  const blogs = await Blog.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("author", "username");

  res.json(blogs);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || blog.author.toString() !== req.user._id.toString())
    return res.sendStatus(403);

  Object.assign(blog, req.body);
  await blog.save();
  res.json(blog);
};


exports.deleteBlog = async(req,res) =>{
    const blog = await Blog.findById(req.params.id)
    if(!blog || blog.author.toString() !== req.user._id.toString()) return res.sendStatus(403);



    await blog.remove()
    res.sendStatus(204)
}