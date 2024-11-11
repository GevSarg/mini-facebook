import axios from "axios";
import { useState } from "react";

const AddPost = () => {
  const [post, setPost] = useState({ title: "", text: "", tags: "" });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file");
      return;
    }
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("tags", post.tags);
    formData.append("postImage", file);

    axios.post("http://localhost:3300/posts/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Post added successfully!");
    console.log(formData);

    setPost({
      title: "",
      text: "",
      tags: [],
    });
    setFile(null);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create a New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Text
            </label>
            <textarea
              name="text"
              value={post.text}
              onChange={handleInputChange}
              placeholder="Write your post content here"
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (Separate with commas)
            </label>
            <input
              type="text"
              name="tags"
              value={post.tags}
              onChange={handleInputChange}
              placeholder="e.g. tech, life, programming"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-purple-700">Image</label>
            <input
              type="file"
              name="postImage"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border border-purple-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;
