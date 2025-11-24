import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockData } from "../data/mock";

const LandingPage = () => {
  const navigate = useNavigate();
  const [inside, setInside] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const circleRef = useRef(null);

  const handleClick = () => {
    setIsNavigating(true);
    navigate("/products");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full screen cover image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat cursor-pointer"
        style={{
          backgroundImage: `url('${mockData.coverImage}')`
        }}
        onMouseMove={(e) => {
          const el = circleRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const r = rect.width / 2;
          const dist = Math.sqrt(x * x + y * y);
          setInside(dist < r);
        }}
        onMouseLeave={() => setInside(false)}
        onClick={handleClick}
      >
        {/* Center clickable area with hover effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div ref={circleRef} className={`w-80 h-80 rounded-full overflow-hidden cursor-pointer ${isNavigating ? '' : 'transition-transform duration-300 ease-out'} flex items-center justify-center`}
                 style={{ transform: isNavigating ? 'none' : (inside ? 'scale(1.03) translateY(-2px)' : 'scale(1)'), boxShadow: isNavigating ? 'none' : (inside ? '0 8px 24px rgba(255,255,255,0.08)' : 'none') }}>
              <img
                src="/assets/home/home .png"
                alt="POINT"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 rounded-full ${isNavigating ? '' : 'transition-opacity duration-300'}`} style={{ background: 'rgba(255,255,255,0.08)', opacity: inside ? 1 : 0 }}></div>
            </div>
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <p className="text-lg font-light tracking-wide">Entrar</p>
              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    </div>
  );
};

export default LandingPage;