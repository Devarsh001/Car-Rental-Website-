import React, { useState, useEffect } from "react";
import { cars } from "../data/cars"; // mock data
import CarCard from "../components/CarCard"; // reusable card component
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const [carList, setCarList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedShape, setSelectedShape] = useState("All");
    // inside your Home component
    const [sortOption, setSortOption] = useState("relevance");


    const carsPerPage = 9;

    // Load car data on component mount
    useEffect(() => {
        setCarList(cars);
    }, []);

    // Pagination calculations
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const filteredCars =
        selectedShape === "All"
            ? carList
            : carList.filter((car) => car.shape === selectedShape);

    // Sorting logic
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortOption === "low-to-high") return a.price - b.price;
        if (sortOption === "high-to-low") return b.price - a.price;
        return a.id - b.id; // relevance (original order)
    });

    // Pagination
    const currentCars = sortedCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    // Change page
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Header />

            {/* Hero / Banner Section */}
            <section className="bg-gray-800 text-white py-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Find Your Perfect Ride</h1>
                <p className="max-w-xl mx-auto text-lg">
                    Browse our extensive collection of cars for rent. Whether you want luxury, comfort, or adventure — we’ve got you covered.
                </p>
            </section>

            {/* Featured Section */}
            <section className="container mx-auto px-4 mt-10">
                <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                        <p>Over 50 cars to choose from — SUVs, Sedans, Convertibles, and more.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
                        <p>Get the best value for your money with transparent pricing.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                        <p>Book online in minutes and hit the road without hassle.</p>
                    </div>
                </div>
            </section>

            {/* Cars Section */}
            <div className="container mx-auto px-4 mt-12">
                <div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Available Cars</h2>

                    <div className="flex flex-col gap-2 md:flex-row space-x-4 items-center">
                        {/* Shape Filter */}
                        <div className="flex items-center space-x-2">
                            <label className="font-semibold">Shape:</label>
                            <select
                                value={selectedShape}
                                onChange={(e) => {
                                    setSelectedShape(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border rounded px-3 py-2"
                            >
                                <option value="All">All</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Convertible">Convertible</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div className="flex items-center space-x-2">
                            <label className="font-semibold">Sort by:</label>
                            <select
                                value={sortOption}
                                onChange={(e) => {
                                    setSortOption(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border rounded px-3 py-2"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="low-to-high">Price: Low to High</option>
                                <option value="high-to-low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {currentCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`px-4 py-2 rounded-md border ${currentPage === index + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Call-to-Action Section */}
            <section className="bg-blue-600 text-white py-12 text-center mt-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
                <p className="mb-6">Reserve your car today and enjoy your journey with comfort and style.</p>
                <a
                    href="/booking"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                >
                    Book Now
                </a>
            </section>

            <Footer />
        </>
    );
};

export default Home;
