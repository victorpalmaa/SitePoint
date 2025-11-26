import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { mockData } from "../data/mock";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { uniqueCount, toggleCart, cartIconRef } = useCart();
  const logoRef = useRef(null);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
          <button className="flex items-center" onClick={() => navigate("/")}> 
            <img 
              src={mockData.logoUrl}
              alt="POINT" 
              className="h-8 object-contain"
            />
          </button>
          
          <button ref={cartIconRef} onClick={toggleCart} className="flex items-center gap-2 text-slate-600">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">{uniqueCount} Itens</span>
          </button>
        </div>
      </header>

              <main className="container mx-auto px-6 py-2">
        <div className="text-center mb-1">
          <div className="flex justify-center mb-2">
            <img 
              src="/assets/LOGOS/LOGO POINTLISM.png"
              alt="POINTLISM"
              className="w-full h-auto object-contain px-4 max-w-[35vw] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]"
            />
          </div>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockData.products.map((product, index) => (
            <Card 
              key={product.id} 
              className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm product-appear product-appear-${index + 1}`}
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none" style={{ willChange: 'opacity' }}>
                    <Button className="bg-white text-slate-900 hover:bg-slate-100 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-slate-900">
                      R${product.price}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;