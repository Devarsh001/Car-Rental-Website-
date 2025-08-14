import React, { useState } from "react";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        // Validation before signup
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error("Please fill all the fields!", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
        };

        users.push(newUser);

        toast.success("Signup successful! Please login.", {
            position: "top-center",
            autoClose: 2000,
            onClose: () => navigate("/login"),
        });
    };

    return (
        <>
            <Header />
            <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md border border-gray-200">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="border border-gray-300 w-full p-3 rounded-lg outline-none transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border border-gray-300 w-full p-3 rounded-lg outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 w-full p-3 rounded-lg outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-green-600 text-white py-3 rounded-lg w-full font-semibold text-lg shadow hover:bg-green-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Signup;
