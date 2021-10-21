import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ passedBlog, updateBlog, deleteBlog, id }) => {
  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(passedBlog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const visibility = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const handlePostLike = () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    }
    setBlog(updatedBlog)
    const idOfBlog = blog.id
    updateBlog(updatedBlog, idOfBlog)
  }

  const handleBlogDelete = () => {
    if (window.confirm('Are you sure you want to delete blog?')) {
      deleteBlog(blog.id)
    }
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
        <button onClick={handlePostLike}>Like</button>
        <br />
        Author: {blog.author} <br />
        {blog.user.id === id ? (
          <button onClick={handleBlogDelete}>Delete</button>
        ) : null }
      </div>
    </div>
  )
}

Blog.propTypes = {
  passedBlog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default Blog
