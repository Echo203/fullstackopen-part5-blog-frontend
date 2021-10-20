import React, { useState } from "react";

const Blog = ({ passedBlog, updateBlog, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false);
  const [blog, setBlog] = useState(passedBlog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const visibility = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  const handlePostLike = (e) => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    };
    setBlog(updatedBlog);
    const idOfBlog = blog.id;
    updateBlog(updatedBlog, idOfBlog);
  };

  const handleBlogDelete = () => {
    if (window.confirm("Are you sure you want to delete blog?")) {
      deleteBlog(blog.id);
    }
  };

  const deleteButton = () => {
    if (blog.user && blog.user.username === username) {
      return <button onClick={handleBlogDelete}>Delete</button>;
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>Show more</button>
      </div>
      <div style={visibility}>
        Link: {blog.url} <br />
        Likes: {blog.likes}
        <button onClick={handlePostLike}>Like</button>
        <br />
        Author: {blog.author} <br />
        {deleteButton()}
      </div>
    </div>
  );
};

export default Blog;
