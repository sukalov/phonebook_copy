const LoginForm = ({ handleLogin, username, password, setUsername, setPassword, user }) => {
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
            logged in as <b>{user.username}</b>
        </p> :
        <form onSubmit={handleLogin} style={style}>
            <div className="input-grid">
                username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    required
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