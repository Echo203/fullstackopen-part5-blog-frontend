import React, { useState } from 'react'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitNewBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    props.handleNewBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmitNewBlog}>
      <div>
        Title:
        <input
          id='title'
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="submitBlogButton">Create</button>
    </form>
  )
}

export default BlogForm
