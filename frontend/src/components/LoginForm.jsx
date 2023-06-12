import { useState } from "react"
import dbServices from "../services/dbService"
import login from "../services/login"

const LoginForm = ({ user, setMessage, setUser }) => {
    
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await login({
            username, password,
          })
          setUser(user)
          window.localStorage.setItem('token', user.token)
          window.localStorage.setItem('username', user.username)
          dbServices.setToken(user.token)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setMessage({ message: 'wrong credentials', status: 'bad' })
          setTimeout(() => {
            setMessage({ mesage: null })
          }, 5000)
        }
      }

    const logout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        dbServices.setToken(null)
        setUser(null)
        setUsername('')
        setPassword('')
    }


    const style = {
        backgroundColor: '#ebebfb',
        margin: '15px auto',
        padding: '20px 10px',
        maxWidth: '300px',
        width: '90%'
    }
    return (
        <> {
        user ? 
        <p style={style}>
            logged in as <b>{user.username}</b><br />
            <button onClick={logout}style={{width: '37%', height: 25, marginTop: 10 }}>log out</button>
        </p> :
        <form onSubmit={handleLogin} style={style}>
            <div className="input-grid">
                username
                    <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="input-grid">
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    style={{height: 15}}
                    required
                />
            </div>
            <button type="submit" style={{width: '100%', height: 25, marginTop: 10 }}>login</button>
        </form>
        }</>
    )
}

export default LoginForm