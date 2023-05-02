import { useState } from "react";
import { userSignup } from "../hooks/userSignupHook.jsx";
import "../../styles/forms.css";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signup, loading, error } = userSignup();

    // using sign in hook to sign user in when they presses sign in button 
    const handleSignup = async (event) => {
        event.preventDefault();

        await signup(username, email, password);
    }

    // function to show and hide password on click of eye icon
    const togglePasswordView = async () => {
        showPassword ? setShowPassword(false) : setShowPassword(true);

        document.getElementById("password").focus();
    }

    return (
        <form id="signup" onSubmit={handleSignup}>
            <h1>Sign up</h1>

            {/* username field */}
            <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left">
                    <input
                        className="input is-success" type="text" placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            {/* email field */}
            <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left">
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
                {(error && error.toLowerCase().includes("email")) ? <p className="help is-danger">{error}</p> : <p></p>}
            </div>

            {/* password field */}
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
                    <button disabled={loading} className="login-button button is-primary">
                        Sign up
                    </button>
                </p>
            </div>
        </form>
    );
}