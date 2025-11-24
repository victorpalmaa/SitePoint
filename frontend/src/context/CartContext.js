import React, { createContext, useContext, useMemo, useRef, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const cartIconRef = useRef(null);

  const addItem = (product, size, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity,
          image: product.image,
        },
      ];
    });
  };

  const removeItem = (id, size) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const decrementItem = (id, size) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id && i.size === size);
      if (idx < 0) return prev;
      const next = [...prev];
      const current = next[idx];
      if (current.quantity > 1) {
        next[idx] = { ...current, quantity: current.quantity - 1 };
        return next;
      }
      return prev.filter(i => !(i.id === id && i.size === size));
    });
  };

  const uniqueCount = useMemo(() => {
    const keys = new Set(items.map(i => `${i.id}:${i.size ?? ""}`));
    return keys.size;
  }, [items]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const toggleCart = () => setIsOpen(v => !v);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const value = {
    items,
    addItem,
    removeItem,
    decrementItem,
    uniqueCount,
    subtotal,
    isOpen,
    toggleCart,
    openCart,
    closeCart,
    cartIconRef,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);