import { useState } from "react";
import { userLogin } from "../hooks/useLoginHook";
import "../../styles/forms.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, loading, error } = userLogin();

    // uses login hook to log user in when they click login button
    const handleLogin = async (event) => {
        event.preventDefault();

        await login(email, password);
    }

    // function to show and hide password on click of eye icon
    const togglePasswordView = async () => {
        showPassword ? setShowPassword(false) : setShowPassword(true);

        document.getElementById("password").focus();
    }

    return (
        <form id="login" onSubmit={handleLogin}>
            <h1>Log in</h1>
            <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input" type="email" placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </p>
                {/* error checker and sends help message */}
                {(error && error.includes("email")) ? <p className="help is-danger">{error}</p> : <p></p>}
            </div>

            <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        id="password"
                        className="input" type={showPassword ? "text" : "password"} placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                    <span onClick={() => { togglePasswordView() }}
                        className="showPassword icon is-small is-right">
                        {showPassword ?
                            <i className="fa-sharp fa-solid fa-eye-slash"></i>
                            : <i className="fa-sharp fa-solid fa-eye"></i>}
                    </span>
                </p>
                {/* error checker and sends help message */}
                {(error && error.includes("password")) ? <p className="help is-danger">{error}</p> : <p></p>}

            </div>

            {/* error checker and sends help message */}
            {(error && error.includes("empty")) ? <p className="help is-danger">{error}</p> : <p></p>}

            <div className="field">
                <p className="control">
                    {/* disable button if request is currently being made. avoid multiple requests */}
                    <button disabled={loading} className="login-button button is-success">
                        Login
                    </button>
                </p>
            </div>
        </form>
    );
}