import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "https://back-end-rjht.onrender.com";

    // Load cart from localStorage for guests
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) setCartItems(JSON.parse(savedCart));
    }, []);

    // Save cart in localStorage for guests
    useEffect(() => {
        if (!token) localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems, token]);

    // Fetch foods
    const fetchFoodList = async () => {
        const res = await axios.get(url + "/api/food/list");
        setFoodList(res.data.data);
    };

    useEffect(() => {
        async function load() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) setToken(storedToken);
        }
        load();
    }, []);

    // Fetch cart from DB for logged-in user
    useEffect(() => {
        const fetchCartFromDB = async () => {
            if (!token) return;
            try {
                const res = await axios.get(`${url}/api/user/cart`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.success) setCartItems(res.data.cartData || {});
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCartFromDB();
    }, [token]);

    const getCartCount = () => Object.values(cartItems).reduce((a, q) => a + q, 0);

    const getTotalCartAmount = () => {
        let t = 0;
        for (const i in cartItems) {
            if (cartItems[i] > 0) {
                const info = food_list.find((p) => String(p._id) === String(i));
                if (info) t += info.price * cartItems[i];
            }
        }
        return t;
    };

    const syncCartToDB = async (newCart) => {
        if (!token) return;
        try {
            await axios.post(
                `${url}/api/user/cart`,
                { cartData: newCart },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error syncing cart:", error);
        }
    };

    const addToCart = (id) => {
        const newCart = { ...cartItems, [id]: (cartItems[id] || 0) + 1 };
        setCartItems(newCart);
        syncCartToDB(newCart);
    };

    const removeFromCart = (id) => {
        const newCart = { ...cartItems };
        if (!newCart[id]) return;
        newCart[id]--;
        if (newCart[id] <= 0) delete newCart[id];
        setCartItems(newCart);
        syncCartToDB(newCart);
    };

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getCartCount,
        url,
        token,
        setToken,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
