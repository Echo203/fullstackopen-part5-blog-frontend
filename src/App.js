import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    });
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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        "userLoggedIntoBlogapp",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setNotification({ message: "Succesfully loged in", type: "pos" });
      setUser(user);
      setTimeout(() => setNotification({ message: null }), 5000);
    } catch (exception) {
      setNotification({ message: "Wrong Login or Password", type: "neg" });
      setTimeout(() => setNotification({ message: null }), 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel={"Log in"}>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  );

  const handleNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.postBlog(blogObject);
      newBlog.user = user
      blogFormRef.current.toggleVisibility();
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

  const updateBlog = async (updatedBlogObject, id) => {
    try {
      const returnedBlog = await blogService.updateBlog(updatedBlogObject, id);
      const updatedBlogList = blogs
      updatedBlogList[blogs.findIndex((blog) => blog.id === id)] = returnedBlog
      setBlogs(updatedBlogList)

    } catch (exception) {
      setNotification({
        message: `Couldn't update likes, reason: ${exception.message}`,
        type: "neg",
      });
      setTimeout(() => setNotification({ message: null }), 5000);
    }
  };

  
  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const indexOfBlogToUpdate = blogs.findIndex((blog) => blog.id === id)
      const updatedBlogs = blogs
      updatedBlogs.splice(indexOfBlogToUpdate, 1)
      setBlogs(() => [...updatedBlogs])
    
    } catch (exception) {
      setNotification({
        message: `Couldn't delete blog, reason: ${exception.message}`,
        type: "neg",
      });
      setTimeout(() => setNotification({ message: null }), 5000);
    }
  };

  const blogFormRef = useRef();
  const blogForm = () => (
    <Togglable buttonLabel={"Add Blog"} ref={blogFormRef}>
      <BlogForm handleNewBlog={handleNewBlog} />
    </Togglable>
  );

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
        <Blog key={blog.id} passedBlog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} id={user.id} />
      ))}
    </div>
  );
};

export default App;
