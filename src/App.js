import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("userLoggedIntoBlogapp");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
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
      setNotification({ message: "Succesfully loged in", type: "pos" });
      setUser(user);
      setUsername("");
      setPassword("");
      setTimeout(() => setNotification({ message: null }), 5000);
    } catch (exception) {
      setNotification({ message: "Wrong Login or Password", type: "neg" });
      setTimeout(() => setNotification({ message: null }), 5000);
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

  const handleNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.postBlog(blogObject);
      setNotification({ message: "Succesfully added blog", type: "pos" });
      setBlogs(blogs.concat(newBlog));
      setTimeout(() => setNotification({ message: null }), 5000);
    } catch (exception) {
      setNotification({
        message: `Couldn't add blog, reason: ${exception.message}`,
        type: "neg",
      });
      setTimeout(() => setNotification({ message: null }), 5000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel={'Add Blog'}>
      <BlogForm handleNewBlog={handleNewBlog}/>
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Login in before browsing</h2>
        <Notification notification={notification} />
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <button onClick={() => handleLogout()}>Log out</button>
      <Notification notification={notification} />
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
