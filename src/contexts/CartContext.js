import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Calculamos el precio total cada vez que el carrito cambia
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};