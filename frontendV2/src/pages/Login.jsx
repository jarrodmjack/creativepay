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
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
            <div className="card-body">
                <form className="login form" onSubmit={handleSubmit}>
                    <h3 className="text-center mb-10 text-2xl">Login</h3>
                    <div className="form-control">
                        <label>Email</label>
                        <input
                            className="input input-bordered"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input
                            className="input input-bordered"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="btn btn-accent w-full mt-4" disabled={isLoading}>Login</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )

}

export default Login