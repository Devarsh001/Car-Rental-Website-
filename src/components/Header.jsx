import React, { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import toast

const Header = () => {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartCount = () => {
            setCartCount(getCart().length);
        };

        const updateUser = () => {
            try {
                const savedUser = localStorage.getItem("user");
                setUser(savedUser ? JSON.parse(savedUser) : null);
            } catch (error) {
                console.error("Error parsing user data:", error);
                setUser(null);
                localStorage.removeItem("user");
            }
        };

        updateCartCount();
        updateUser();

        window.addEventListener("cartUpdated", updateCartCount);
        window.addEventListener("userUpdated", updateUser);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
            window.removeEventListener("userUpdated", updateUser);
        };
    }, []);

    const handleLogout = () => {
        // ✅ Confirmation popup
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("user");
            setUser(null);
            window.dispatchEvent(new Event("userUpdated"));
            navigate("/login");

            // ✅ Toastify (red theme)
            toast.error("You have been logged out!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
            <h1
                onClick={() => navigate("/")}
                className="cursor-pointer text-2xl font-bold"
            >
                Car Rentals
            </h1>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <span className="text-lg">Welcome, {user.name}!</span>
                        <div
                            onClick={() => navigate("/checkout")}
                            className="cursor-pointer bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
                        >
                            Cart({cartCount})
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition"
                        >
                            Signup
                        </button>
                        <div
                            onClick={() => navigate("/checkout")}
                            className="cursor-pointer bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
                        >
                            Cart({cartCount})
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
