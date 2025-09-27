import React, { useEffect } from "react";
import { useBlogs } from "../../context/BlogContext";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { RiDeleteBin3Line } from "react-icons/ri";

const Blog = () => {
  const { blogs, loading, error, fetchBlogs, deleteBlog } = useBlogs();

  //console.log(blogs);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
  }, []);

  const handleDelete = async (blogId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      await deleteBlog(blogId);
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  // if (error) {
  //   return <p className="text-red-500 text-center">{error}</p>;
  // }

  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-500 text-center">No blogs available</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={blog.id || index}
            className="relative bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden"
          >
            <RiDeleteBin3Line
              size={33}
              className="absolute top-2 p-2 rounded-full bg-white right-2 text-red-600 cursor-pointer z-10 hover:bg-red-800/35"
              onClick={() => handleDelete(blog.id)}
              title="Delete Blog"
            />

            <Link to={`/dashboard/blog/${blog.id}`} className="">
              {/* Temporary Static Image */}
              <img
                // src={
                //   blog.image
                //     ? `http://localhost:4000/uploads/${blog.image}`
                //     : ` https://picsum.photos/400/250`
                // }
                src={blog.image ? `${API_URL}${blog.image}` : "/blogs/b2.jpg"}
                alt={blog.title || "Blog thumbnail"}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>

                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.contentHtml || "No description available...",
                  }}
                />

                <div className="flex flex-wrap gap-2 my-5 mb-3">
                  <span className="px-4 py-1 text-[12px] bg-blue-50 text-blue-500 rounded-full">
                    {blog.createdAt
                      ? format(new Date(blog.createdAt), "dd MMM yyyy")
                      : "Unknown Date"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-[12px]">createdBy:</h1>
                    <span className="px-4 py-1 text-[12px] bg-purple-100 text-purple-700 rounded-full">
                      {blog.User.userName.toUpperCase() || "Unknown Author"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
