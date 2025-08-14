import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addToCart } from "../utils/cart";

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const car = cars.find((c) => c.id === parseInt(id));

    if (!car) {
        return <p>Car not found!</p>;
    }

    const handleAddToCart = () => {
        addToCart(car);
        alert("Car added to cart!");
        navigate("/checkout");
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 my-6 max-w-lg bg-white shadow p-6 rounded min-h-[80vh]">
                <button onClick={() => navigate("/")} className="bg-slate-700 rounded-md px-4 py-1 text-white">Back</button>
                <div className="">
                    <img src={car.image} alt={car.name} height={100} width="100%" />
                </div>
                <h1 className="text-2xl font-bold my-4">{car.name}</h1>
                <p><strong>Price per day:</strong> ${car.price}</p>
                <p><strong>Description:</strong> {car.description}</p>

                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Add to Cart
                </button>
            </div>
            <Footer />
        </>
    );
};

export default CarDetails;
