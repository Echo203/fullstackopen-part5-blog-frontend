import React, { useState } from "react";

const Blog = ({ passedBlog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(passedBlog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const visibility = { display: visible ? '' : 'none'}

  const toggleVisibility = () => setVisible(!visible)

  const handlePostLike = (e) => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    setBlog(updatedBlog)
    const idOfBlog = blog.id
    updateBlog(updatedBlog, idOfBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>Show more</button>
      </div>
      <div style={visibility}>
        Link: {blog.url} <br />
        Likes: {blog.likes} 
        <button onClick={handlePostLike}>Like</button><br />
        Author: {blog.author} <br />
      </div>
    </div>
  );
};

export default Blog;
