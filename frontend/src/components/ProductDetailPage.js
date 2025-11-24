import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Share2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockData } from "../data/mock";
import { useToast } from "../hooks/use-toast";
import { useCart } from "../context/CartContext";
import SizeGuideModal from "./SizeGuideModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, openCart, cartIconRef, uniqueCount, toggleCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSwitchingImage, setIsSwitchingImage] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const mainImageRef = useRef(null);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [fadePrev, setFadePrev] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [matchedHeight, setMatchedHeight] = useState(null);

  useEffect(() => {
    if (detailsOpen) {
      const t = setTimeout(() => setDetailsVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setDetailsVisible(false);
    }
  }, [detailsOpen]);

  // moved height matching effect below product definition to avoid TDZ

  const product = mockData.products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Produto não encontrado</p>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate("/products");
  };

  const handleAddToCart = () => {
    const sizeValue = product.id === 4 ? null : selectedSize;
    addItem(product, sizeValue, quantity);
    animateFlyToCart();
    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.name} (${quantity}x) adicionado ao carrinho.`,
      duration: 2000,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removido da lista" : "Adicionado à lista",
      description: `${product.name} ${isWishlisted ? "removido da" : "adicionado à"} lista de desejos.`,
      duration: 2000,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const sizes = ["P", "M", "G", "GG"];
  const productImages = product.additionalImages || [product.image, product.image, product.image];
  const sizeGuideImage = product.sizeGuideImage || null;

  useEffect(() => {
    if (product && product.id === 3) {
      const updateHeights = () => {
        const r = rightColRef.current;
        if (r) {
          setMatchedHeight(r.offsetHeight);
        }
      };
      updateHeights();
      window.addEventListener("resize", updateHeights);
      return () => window.removeEventListener("resize", updateHeights);
    }
  }, [product, selectedImageIndex, quantity, selectedSize, detailsOpen, sizeGuideOpen]);

  const switchImage = (index) => {
    if (index === selectedImageIndex) return;
    setPrevImageIndex(selectedImageIndex);
    setSelectedImageIndex(index);
    setFadePrev(true);
    requestAnimationFrame(() => setFadePrev(false));
    setIsSwitchingImage(true);
    setImageLoaded(false);
    setTimeout(() => {
      setPrevImageIndex(null);
      setIsSwitchingImage(false);
    }, 250);
  };

  const animateFlyToCart = () => {
    const cartEl = cartIconRef.current;
    const imgEl = mainImageRef.current;
    if (!cartEl || !imgEl) return;
    const cartRect = cartEl.getBoundingClientRect();
    const imgRect = imgEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.style.position = "fixed";
    ghost.style.left = `${imgRect.left}px`;
    ghost.style.top = `${imgRect.top}px`;
    ghost.style.width = `${imgRect.width}px`;
    ghost.style.height = `${imgRect.height}px`;
    ghost.style.backgroundImage = `url('${productImages[selectedImageIndex]}')`;
    ghost.style.backgroundSize = "cover";
    ghost.style.borderRadius = "8px";
    ghost.style.zIndex = "9999";
    ghost.style.transition = "all 700ms ease-in-out";
    document.body.appendChild(ghost);
    requestAnimationFrame(() => {
      ghost.style.left = `${cartRect.left}px`;
      ghost.style.top = `${cartRect.top}px`;
      ghost.style.width = `32px`;
      ghost.style.height = `32px`;
      ghost.style.opacity = "0.2";
      ghost.style.transform = "translateY(-10px)";
    });
    setTimeout(() => {
      document.body.removeChild(ghost);
      openCart();
    }, 750);
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
          
          <button onClick={() => navigate("/")}> 
            <img 
              src={mockData.logoUrl}
              alt="POINT" 
              className="h-8 object-contain"
            />
          </button>
          
          <button ref={cartIconRef} onClick={toggleCart} className="flex items-center gap-2 text-slate-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">{uniqueCount} Itens</span>
          </button>
        </div>
      </header>

      <main className={`mx-auto max-w-5xl ${product.id === 3 ? 'px-5 py-3' : 'px-6 py-4'}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${product.id === 3 ? 'gap-6' : 'gap-8'}`}>
          {/* Product Images */}
          <div className="space-y-6 flex flex-col" ref={leftColRef} style={product.id === 3 && matchedHeight ? { height: matchedHeight } : undefined}>
            <Card className="group overflow-hidden shadow-2xl">
              <div className={`relative w-full ${product.id === 3 ? 'h-72 lg:h-[420px]' : 'h-96 lg:h-[520px]'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}>
                {prevImageIndex !== null && (
                  <img
                    src={productImages[prevImageIndex]}
                    alt={`${product.name} anterior`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${fadePrev ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
                <img
                  ref={mainImageRef}
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  key={selectedImageIndex}
                />
              </div>
            </Card>
            
          {/* Additional Images */}
          <div className="grid grid-cols-4 gap-3 mt-auto">
            {productImages.map((img, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 ${selectedImageIndex === index ? 'ring-2 ring-slate-900' : ''}`}
                onClick={() => switchImage(index)}
              >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover transition-all duration-300 ease-out hover:opacity-90 hover:scale-[1.02]"
                  />
              </Card>
            ))}
          </div>
          </div>

          <div className="space-y-8" ref={rightColRef}>
            <div>
              <h1 className={`${product.id === 3 ? 'text-3xl' : 'text-4xl'} font-bold text-slate-900 mb-4 tracking-tight`}>
                {product.name}
              </h1>
              <p className={`${product.id === 3 ? 'text-2xl' : 'text-3xl'} font-bold text-slate-900 mb-6`}>
                R${product.price}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {product.fullDescription || product.description + " Crafted with premium materials and attention to detail, this piece represents the perfect blend of style and comfort. Designed for the modern individual who values quality and sophistication."}
              </p>
              
            </div>

            {product.id !== 4 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Tamanho</h3>
                <div className="flex gap-3">
                  {sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="w-12 h-12"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quantidade</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium text-slate-900 w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full h-14 text-lg font-semibold bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao carrinho - R${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full transition-transform duration-200 hover:scale-[1.02] active:scale-98"
                onClick={() => setDetailsOpen(v => !v)}
              >
                Detalhes do produto
              </Button>
              {(product.id === 1 || product.id === 2 || product.id === 3) && (
                <Button
                  variant="outline"
                  className="w-full transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  Provador virtual
                </Button>
              )}
            </div>

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
              <DialogContent className="duration-200">
                <DialogHeader>
                  <DialogTitle>Detalhes do produto</DialogTitle>
                  <DialogDescription>Especificações e descrição</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm text-slate-700">
                  {product.id === 1 ? (
                    <>
                      <div className="flex justify-between"><span>Modelagem:</span><span>Heavy Boxy</span></div>
                      <div className="flex justify-between"><span>Material:</span><span>100% algodão</span></div>
                      <div className="flex justify-between"><span>Gramatura:</span><span>220g/m²</span></div>
                    </>
                  ) : product.id === 2 ? (
                    <>
                      <div className="flex justify-between"><span>Modelagem:</span><span>Heavy Oversized</span></div>
                      <div className="flex justify-between"><span>Material:</span><span>100% algodão</span></div>
                      <div className="flex justify-between"><span>Gramatura:</span><span>220g/m²</span></div>
                    </>
                  ) : product.id === 3 ? (
                    <>
                      <div className="flex justify-between"><span>Modelagem:</span><span>Oversized Boxy com Capuz</span></div>
                      <div className="flex justify-between"><span>Material:</span><span>50% algodão e 50% poliéster</span></div>
                      <div className="flex justify-between"><span>Gramatura:</span><span>400g/m²</span></div>
                    </>
                  ) : product.id === 4 ? (
                    <>
                      <div className="flex justify-between"><span>Material:</span><span>Prata 925</span></div>
                      <div className="flex justify-between"><span>Acabamento:</span><span>Artesanal</span></div>
                      <div className="flex justify-between"><span>Tamanho:</span><span>Indicar na hora da compra</span></div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between"><span>Material:</span><span>Premium Cotton Blend</span></div>
                      <div className="flex justify-between"><span>Care:</span><span>Machine Wash Cold</span></div>
                      <div className="flex justify-between"><span>Fit:</span><span>Regular</span></div>
                    </>
                  )}
                  <div className="pt-3 text-slate-700">
                    <p>{product.fullDescription || product.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <SizeGuideModal open={sizeGuideOpen} onOpenChange={setSizeGuideOpen} product={product} imageSrc={sizeGuideImage} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;