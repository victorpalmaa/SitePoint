import React, { createContext, useContext, useMemo, useRef, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const cartIconRef = useRef(null);

  const addItem = (product, size, quantity = 1) => {
    if ((product?.id === 1 || product?.id === 2 || product?.id === 3) && size === "P") {
      return;
    }
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

  const updateItemSize = (id, prevSize, nextSizeRaw) => {
    const normalize = (v) => {
      if (v === undefined) return null;
      if (v === null) return null;
      const s = String(v).trim();
      return s === "" ? null : s;
    };
    const nextSize = normalize(nextSizeRaw);
    const prev = normalize(prevSize);
    setItems(prevItems => {
      const idx = prevItems.findIndex(i => i.id === id && i.size === prev);
      if (idx < 0) return prevItems;
      const dupIdx = prevItems.findIndex(i => i.id === id && i.size === nextSize);
      if (dupIdx >= 0 && dupIdx !== idx) {
        const merged = [...prevItems];
        merged[dupIdx] = { ...merged[dupIdx], quantity: merged[dupIdx].quantity + merged[idx].quantity };
        merged.splice(idx, 1);
        return merged;
      }
      const next = [...prevItems];
      next[idx] = { ...next[idx], size: nextSize };
      return next;
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
    updateItemSize,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);