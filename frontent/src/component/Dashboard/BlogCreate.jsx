import React, { useRef, useState } from "react";
import Editor from "./Editor";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useBlogs } from "../../context/BlogContext";
import { RxCross2 } from "react-icons/rx";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  //const [description, setDescription] = useState("");
  const [content, setContent] = useState(null);

  const { addBlog, loading, fetchBlogs } = useBlogs();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  console.log(image);

  const quillRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const blogData = {
  //     title,
  //     //author,
  //     //description,
  //     content: JSON.stringify(quillRef.current?.getContents()), // ✅ convert to string
  //     contentHtml: quillRef.current?.root.innerHTML, // ✅ save html also
  //   };

  //   try {
  //     const res = await addBlog(blogData);
  //     console.log(res);
  //     if (res) {
  //       toast.success("✅ Blog created successfully!");
  //       fetchBlogs();
  //       setTitle("");
  //       setContent(null);
  //       quillRef.current.setContents([]); // clear editor
  //     }
  //   } catch (error) {
  //     toast.error("❌ Failed to create blog!");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const formData = new FormData()
  //   formData.append('title', title)
  //   formData.append('content', JSON.stringify(quillRef.current?.getContents()))
  //   formData.append('contentHtml', quillRef.current?.root.innerHTML)

  //   if(image){
  //     formData.append('image',image )
  //   }

  //   try {

  //   } catch (error) {

  //   }

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", JSON.stringify(quillRef.current?.getContents()));
    formData.append("contentHtml", quillRef.current?.root.innerHTML);
    if (image) formData.append("image", image); // append image

    try {
      const res = await addBlog(formData);
      if (res) {
        toast.success("✅ Blog created successfully!");
        fetchBlogs();
        setTitle("");
        setContent(null);
        setImage(null);
        setPreview(null);
        fileInputRef.current.value = null;
        quillRef.current.setContents([]);
      }
    } catch (error) {
      toast.error("❌ Failed to create blog!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Author */}
        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div> */}

        {/* Short Description */}
        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">
            Short Description
          </label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div> */}

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

        {/* Content (Quill Editor) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <div className="border rounded-lg">
            <Editor
              ref={quillRef}
              defaultValue={null}
              onTextChange={
                (delta, oldDelta, source) => setContent(JSON.stringify(delta)) // store as string
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            loading={loading}
            //className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
