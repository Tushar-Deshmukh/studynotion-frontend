import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ApiConfig from "../config/ApiConfig";
import axios from "../axios";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { userLoggedIn } = useContext(AuthContext);

  async function addToCart(courseId) {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.addToCart,
        data: {
          courseId: courseId,
        },
      });
      if (res?.data?.success) {
        setLoading(false);
        toast.success(res?.data?.message);
        myCart();
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        toast.error(error.response?.data?.message);
      }
    }
  }

  async function removeFromCart(courseId) {
    try {
      const res = await axios.delete(ApiConfig.removeFromCart, {
        data: {
          courseId: courseId,
        },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        myCart();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
  }

  async function myCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(ApiConfig.myCart);
      if (res?.data?.success) {
        setLoading(false);
        setCartData(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      setCartData([]);
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  async function buyCourse(courseId, amount) {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.createCheckoutSession,
        data: {
          courseId: courseId,
          amount: amount,
        },
      });

      if (res?.data?.success) {
        const url = res?.data?.url;
        window.open(url, "_blank");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    if (userLoggedIn) {
      myCart();
    }
  }, [userLoggedIn]);

  const data = {
    addToCart,
    loading,
    cartData,
    removeFromCart,
    buyCourse,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
