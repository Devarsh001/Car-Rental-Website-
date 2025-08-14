export const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (car) => {
    const cart = getCart();
    const existingCar = cart.find(item => item.id === car.id);

    if (existingCar) {
        existingCar.quantity += 1;
    } else {
        cart.push({ ...car, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify components
    window.dispatchEvent(new Event("cartUpdated"));
};

export const updateQuantity = (id, quantity) => {
    let cart = getCart();
    cart = cart.map(item => {
        if (item.id === id) {
            return { ...item, quantity };
        }
        return item;
    }).filter(item => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify components
    window.dispatchEvent(new Event("cartUpdated"));
};

export const removeFromCart = (id) => {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify components
    window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = () => {
    localStorage.removeItem("cart");

    // Notify components
    window.dispatchEvent(new Event("cartUpdated"));
};
