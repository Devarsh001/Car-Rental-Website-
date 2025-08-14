import React, { useState } from "react";
import { users } from "../data/users";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
        };
        users.push(newUser);
        alert("Signup successful! Please login.");
        navigate("/login");
    };

    return (
        <>
            <Header />
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 w-full p-3 rounded-lg outline-none transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 w-full p-3 rounded-lg outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 w-full p-3 rounded-lg outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="bg-green-600 text-white py-3 rounded-lg w-full font-semibold text-lg shadow hover:bg-green-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Extra link for existing users */}
                    <p className="text-center text-gray-600 mt-5 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Signup;
