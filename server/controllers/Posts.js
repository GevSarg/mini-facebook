const postsValidation = require("../validation/postValidation");

class Post {
  async addPost(req, res) {
    try {
      const id = req.userId;
      // console.log(id);

      const validPost = await postsValidation.validateAsync(req.body);
      // console.log(validPost);

      const post = await req.app.locals.services.posts.addPost(validPost, id);
      // console.log(req.body);

      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
  async getPosts(req, res) {
    try {
      const posts = await req.app.locals.services.posts.getPosts();
      res.json(posts);
    } catch (error) {
      res.json(error);
    }
  }
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await req.app.locals.services.posts.getPostById(id);
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const post = await req.app.locals.services.posts.updatePost(id, req.body);
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
  async addView(req, res) {
    try {
      const { id } = req.params;
      const post = await req.app.locals.services.posts.addView(id);
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await req.app.locals.services.posts.deletePost(id);
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = Post;
