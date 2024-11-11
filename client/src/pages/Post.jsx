import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3300/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log("Failed to fetch post: " + err.message);
      }
    };

    const incrementViewCount = async () => {
      try {
        await axios.put(`http://localhost:3300/posts/${id}`);
      } catch (err) {
        console.log("Failed to add view: " + err.message);
      }
    };

    fetchPost();
    incrementViewCount();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-600">
          <span className="text-sm">By User {post.user}</span>
          <span className="text-sm">Views: {post.views}</span>
        </div>
      </header>

      {/* Post Content */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-700 mb-6">{post.text}</p>

        <div className="flex flex-wrap mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        {post.postImage && (
          <img
            src={post.postImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Post;
