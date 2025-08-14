import React, { useState } from "react";
import { users } from "../data/users"; // mock users
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
    const navigate = useNavigate();

    // State for form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if user exists
        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (foundUser) {
            alert(`Welcome ${foundUser.name}`);
            navigate("/"); // redirect to Home
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 mt-10 max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 shadow-lg rounded-lg border border-gray-100"
                >
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 w-full p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 w-full p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-3 rounded w-full hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    {/* Sign up link */}
                    <p className="text-center text-gray-600 text-sm mt-4">
                        New user?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Sign up here
                        </span>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
