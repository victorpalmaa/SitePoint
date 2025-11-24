import React from "react";
import { X, ShoppingCart, Trash2, MinusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useCart } from "../context/CartContext";
import { composeWhatsAppMessage } from "../lib/checkout";

const CartSidebar = () => {
  const { isOpen, closeCart, items, subtotal, removeItem, decrementItem } = useCart();

  const whatsappMessage = () => composeWhatsAppMessage(items, subtotal);

  const handleCheckout = () => {
    const url = `https://wa.me/5511916022085?text=${encodeURIComponent(whatsappMessage())}`;
    window.location.href = url;
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Carrinho</span>
          </div>
          <Button variant="ghost" onClick={closeCart} aria-label="Close">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex h-[calc(100%-64px)] flex-col">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-slate-600">Seu carrinho está vazio.</p>
            ) : (
              items.map((i, idx) => (
                <Card key={`${i.id}-${i.size}-${idx}`} className="border">
                <CardContent className="p-4 flex gap-4 items-center">
                  <img src={i.image} alt={i.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{i.name}</p>
                    <p className="text-sm text-slate-600">{i.size ? `Tamanho: ${i.size}` : "Tamanho: Indicar na hora da compra"}</p>
                    <p className="text-sm text-slate-600">Qtd: {i.quantity}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right font-semibold">R$ {(i.price * i.quantity).toFixed(2)}</div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="p-1 h-8" onClick={() => decrementItem(i.id, i.size)} aria-label="Diminuir">
                        <MinusCircle className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-8" onClick={() => removeItem(i.id, i.size)} aria-label="Remover">
                        <Trash2 className="w-4 h-4 text-slate-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </div>
          <div className="p-4 border-t space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Subtotal</span>
              <span className="text-slate-900 font-semibold">R$ {subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full h-12 text-lg" onClick={handleCheckout}>Finalizar Compra</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;