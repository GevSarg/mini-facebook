import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }

    const fetchPosts = () => {
      axios("http://localhost:3300/posts")
        .then((res) => setPosts(res.data))
        .catch((err) => console.log("Failed to fetch posts: " + err.message));
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");

    axios
      .post("http://localhost:3300/auth/logout", {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setUserId(null);
        navigate("/");
      })
      .catch((err) => console.log("Error logging out:", err));
  };

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:3300/posts/${postId}`)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      })
      .catch((err) => console.log("Error deleting post:", err));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-3xl flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
        {isLoggedIn ? (
          <Link
            to="/posts/add"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-200"
          >
            Add New Post
          </Link>
        ) : null}
        <h1 className="text-2xl font-bold text-gray-800">
          Discover Inspiring Stories
        </h1>

        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </header>

      {/* Posts Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Latest Posts
        </h2>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {post.text.length > 120
                    ? `${post.text.slice(0, 120)}...`
                    : post.text}
                </p>

                {/* Tags Section */}
                <div className="flex flex-wrap mt-2 space-x-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-blue-500 mb-4">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`posts/${post._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Read More
                </Link>

                {userId === post.user && (
                  <>
                    <Link
                      to={`posts/edit/${post._id}`}
                      className="text-yellow-500 hover:underline ml-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
