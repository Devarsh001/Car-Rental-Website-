import React, { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartCount = () => {
            setCartCount(getCart().length);
        };

        updateCartCount();
        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);


    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
            <h1 onClick={()=>navigate('/')} className="cursor-pointer text-2xl font-bold">Car Rentals</h1>
            <div onClick={()=>navigate('/checkout')}>Cart({cartCount})</div>
        </header>
    );
};

export default Header;
