import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {

  return (
  <div class="container">
        <h1>Login</h1>
        <form action="/login" method="POST">
            <div class="field">
                <label>Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div class="field">
                <label>Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  )
}

export default App
