import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCart, removeFromCart, clearCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadedCart = getCart().map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCart(loadedCart);
    }, []);

    const handleRemove = (id) => {
        removeFromCart(id);
        setCart(getCart());
    };

    const handleQuantityChange = (id, delta) => {
        const item = cart.find(item => item.id === id);
        if (!item) return;

        const newQuantity = item.quantity + delta;

        if (newQuantity <= 0) {
            // Show confirm box ONCE
            const confirmRemove = window.confirm("Do you want to remove this item from the cart?");
            if (confirmRemove) {
                removeFromCart(id);
                window.dispatchEvent(new Event("cartUpdated"));
                setCart(getCart()); // refresh state after removal
            }
        } else {
            // Update quantity in localStorage
            const updatedCart = cart.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            window.dispatchEvent(new Event("cartUpdated"));
            setCart(updatedCart);
        }
    };

    const handleConfirmBooking = () => {
        alert("Booking confirmed for " + cart.length + " car(s)!");
        clearCart();
        setCart([]);
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 mt-6 min-h-[80vh] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-500">Your Cart is empty!</p>
                        <p className="text-gray-500 mt-2">Add some cars to your cart to proceed.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Go to Home 
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-4 my-6 bg-white shadow rounded min-h-[80vh]">
                <h1 className="text-2xl font-bold mb-4">Items in Your Cart</h1>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">Car Name</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="py-2">{item.name}</td>
                                <td className="py-2 text-center">
                                    <button
                                        className="px-2 bg-gray-200"
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-3">{item.quantity}</span>
                                    <button
                                        className="px-2 bg-gray-200"
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td className="py-2 text-center">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td className="py-2 text-center">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2" className="text-right font-bold py-2">
                                Total:
                            </td>
                            <td className="text-center font-bold">₹{totalPrice.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={()=>{navigate("/")}}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Continue Shoping
                    </button>
                    <button
                        onClick={handleConfirmBooking}
                        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
