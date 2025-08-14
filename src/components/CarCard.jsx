import { addToCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import toast

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    const handleAdd = () => {
        try {
            addToCart(car);

            // ✅ Success Toast (Green)
            toast.success(`${car.name} added to cart!`, {
                style: { backgroundColor: "#4CAF50", color: "white" },
            });
        } catch (error) {
            // ❌ Error Toast (Red)
            toast.error("Failed to add car to cart!", {
                style: { backgroundColor: "#ff4d4f", color: "white" },
            });
            console.log("Error adding car to cart:", error);
        }
    };

    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
            <div
                className="flex items-center"
                style={{ height: '200px', overflow: 'hidden' }}
            >
                <img
                    src={car.image}
                    alt={car.name}
                    height={100}
                    width="100%"
                    onClick={() => navigate(`/car/${car.id}`)}
                />
            </div>
            <h2 className="text-lg font-bold mt-3">
                {car.name} ({car.shape})
            </h2>
            <p>₹{car.price} / day</p>
            <p>{car.description}</p>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => navigate(`/car/${car.id}`)}
                    className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2 rounded hover:bg-gray-600"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CarCard;
