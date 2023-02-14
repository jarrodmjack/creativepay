import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)

    }

    return (
        <form className="login form bg-base-300" onSubmit={handleSubmit}>
            <h3 className="text-center mb-10 text-2xl text-white">Login</h3>
            <label>Email</label>
            <input
                className="bg-base-100"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password</label>
            <input
                className="bg-base-100"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="w-full" disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default Login