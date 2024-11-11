class Post {
  constructor(models) {
    this.models = models;
  }
  async addPost(body, id) {
    const doc = await this.models.posts({ ...body, user: id });
    const post = await doc.save();
    // console.log(post);
    return post;
  }
  async addView(id) {
    const post = await this.models.posts.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return post;
  }
  async getPosts() {
    const posts = await this.models.posts.find();
    return posts;
  }
  async getPostById(id) {
    const post = await this.models.posts.findById(id);
    return post;
  }
  async updatePost(id, body) {
    const post = await this.models.posts.findByIdAndUpdate(id, body);
    return post;
  }
  async deletePost(id) {
    await this.models.posts.findByIdAndDelete(id);
    return "Delete";
  }
}

module.exports = Post;
