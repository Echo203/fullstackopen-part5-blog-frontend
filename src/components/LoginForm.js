import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    props.handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        Login:
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          id="password"
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="loginButton">Log in</button>
    </form>
  )
}

export default LoginForm
