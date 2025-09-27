import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import API from "../../api";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  const imageUrl = blog.image
    ? `http://localhost:4000${blog.image}`
    : "/blogs/b2.jpg";

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full max-h-96 object-cover rounded-lg mb-4"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
      />

      <div className="mt-6 flex gap-3">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/dashboard/blog/edit/${blog.id}`)}
        >
          Edit Blog
        </Button>
        <Link to="/dashboard/blog">
          <Button variant="outlined">Back to Blogs</Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
