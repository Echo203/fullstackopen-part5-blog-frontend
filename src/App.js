import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("userLoggedIntoBlogapp");
    const user = JSON.parse(userJSON);
    setUser(user);
    blogService.setToken(user.token)
  }, []);

  const handleLogout = (e) => {
    window.localStorage.removeItem("userLoggedIntoBlogapp");
    setUser(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        "userLoggedIntoBlogapp",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("err");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Login:
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );

  const handleNewBlog = async (e) => {
    try {e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    await blogService.postBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  } catch (exception) {
    console.log('err')
  }
  };

  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        Title: 
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: 
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: 
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Add blog</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Login in before browsing</h2>
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <button onClick={() => handleLogout()}>Log out</button>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
