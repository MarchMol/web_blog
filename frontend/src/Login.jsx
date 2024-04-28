import { useState } from 'react'
import './Login.css'

function Login () {

    return (
    <>
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
        </form>
        <button type="submit">Login</button>
    </div>
    </>
)}

export default Login