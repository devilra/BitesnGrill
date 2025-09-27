import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new blog
  const addBlog = async (blogData) => {
    setLoading(true);
    try {
      const res = await API.post("/blogs/add", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs((prev) => [res.data.blog, ...prev]); // prepend new blog
      return res.data;
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit blog

  const editBlog = async (id, blogData) => {
    setLoading(true);
    try {
      const res = await API.put(`/blogs/edit/${id}`, blogData);
      setBlogs((prev) => prev.map((b) => (b.id === id ? res.data.blog : b)));
      return res.data;
    } catch (error) {
      setError(err?.response?.data?.message || "Failed to edit blog");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete blog
  const deleteBlog = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/blogs/delete/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        fetchBlogs,
        addBlog,
        editBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext);
