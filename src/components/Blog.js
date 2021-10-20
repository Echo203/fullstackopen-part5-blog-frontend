import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const visibility = { display: visible ? '' : 'none'}

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>Show more</button>
      </div>
      <div style={visibility}>
        Link: {blog.url} <br />
        Likes: {blog.likes} <br />
        Author: {blog.author} <br />
      </div>
    </div>
  );
};

export default Blog;
