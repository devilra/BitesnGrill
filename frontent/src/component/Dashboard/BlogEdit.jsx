import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";
import Editor from "./Editor";
import API from "../../api";

import { useBlogs } from "../../context/BlogContext";
import { RxCross2 } from "react-icons/rx";

const BlogEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const quillRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null); // ✅ store content for Editor
  const [preview, setPreview] = useState(null); // ✅ for preview
  const fileInputRef = useRef();
  const [isSubmit, setIsSubmit] = useState(false);

  const { fetchBlogs } = useBlogs();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setTitle(res.data.title);

        // Quill delta load

        const delta = JSON.parse(res.data.content || "{}");
        // quillRef.current?.setContents(delta);
        setContent(delta);
        if (res.data.image) {
          setPreview(`http://localhost:4000${res.data.image}`);
        }

        console.log(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // setContents after Editor mounts
  useEffect(() => {
    if (content && quillRef.current) {
      quillRef.current.setContents(content);
    }
  }, [content]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    try {
      const updatedContent = quillRef.current.getContents();
      const updatedHtml = quillRef.current.root.innerHTML;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", JSON.stringify(updatedContent));
      formData.append("contentHtml", updatedHtml);
      if (image) formData.append("image", image);

      await API.put(`/blogs/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog updated successfully!");
      fetchBlogs();
      navigate("/dashboard/blog");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <form className="space-y-6" onSubmit={handleUpdate}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block cursor-pointer"
            ref={fileInputRef}
          />
          {preview ? (
            <div className="relative inline-block my-5">
              <img
                src={preview}
                alt="Preview"
                className="mt-2 max-h-40 rounded-lg object-cover"
              />
              <RxCross2
                size={30}
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  fileInputRef.current.value = null;
                }}
                className="absolute top-0 -right-2 bg-neutral-200 cursor-pointer p-2 rounded-full"
              />
            </div>
          ) : (
            <div className="mt-2 inline-flex my-5 items-center justify-center md:w-[200px] h-40 bg-amber-50/25 border border-amber-200 rounded-lg">
              <h1>No preview</h1>
            </div>
          )}
        </div>

        {/* Quill Editor */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <div className="border rounded-lg">
            <Editor ref={quillRef} defaultValue={content} />
          </div>
        </div>

        {/* Update Button */}
        <Button
          type="submit"
          loading={isSubmit}
          variant="contained"
          color="success"
        >
          Update Blog
        </Button>
      </form>
    </div>
  );
};

export default BlogEdit;
