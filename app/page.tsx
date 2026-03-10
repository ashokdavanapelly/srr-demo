"use client";

import { useState } from 'react';
import productsData from '../data/products.json';

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState("Jubilee Hills");
  const [activeTab, setActiveTab] = useState("ALL SWEETS");

  const filteredProducts = productsData.filter(product => 
    product.branches.includes(selectedBranch)
  );

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. Top Logo & Icons Bar */}
      <header className="p-4 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50">
        <button className="text-2xl text-gray-700">☰</button>
        <div className="flex justify-center items-center">
            {/* Make sure logo.png is directly in public/ */}
            <img src="/logo.png" alt="SRR Logo" className="h-10 w-auto object-contain" />
        </div>
        <div className="flex gap-4 text-xl text-gray-600">
          <span>🔍</span>
          <span>👤</span>
          <div className="relative">
            <span>🛒</span>
            <span className="absolute -top-2 -right-2 bg-[#D97706] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </div>
        </div>
      </header>

      {/* 2. Brown Branch Bar */}
      <div className="bg-[#92622A] text-white p-2 px-4 text-xs flex justify-between items-center sticky top-[69px] z-40">
        <span>Welcome to {selectedBranch} Store 📍</span>
        <select 
          className="bg-transparent border-none outline-none font-bold underline cursor-pointer"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="Jubilee Hills" className="text-black">Change Branch</option>
          <option value="Madhapur" className="text-black">Madhapur</option>
        </select>
      </div>

      {/* 3. Hero Section with Loop Video BACKGROUND */}
      <div className="relative h-60 bg-[#1A1A1A] flex items-center px-6 overflow-hidden">
        
        {/* The background loop video (box opening) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline // Essential for mobile autoplay
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/videos/box-opening.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay - Made foreground and centered/styled */}
        <div className="z-10 relative max-w-[200px] text-left">
          <h2 className="text-white text-xl font-light leading-snug drop-shadow-md">
            Celebrate Tradition. <br />
            <span className="font-bold">Order Fresh Sweets Online.</span>
          </h2>
          <button className="mt-5 bg-white text-black text-[11px] font-bold px-5 py-2.5 rounded-sm uppercase tracking-wider shadow-md">
            Shop Now
          </button>
        </div>
      </div>

      {/* 4. Best Sellers & Tabs */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Best Sellers <span className="text-sm font-normal text-gray-500">({selectedBranch})</span></h3>
        
        {/* Category Tabs */}
        <div className="flex gap-4 text-[11px] font-bold overflow-x-auto whitespace-nowrap mb-6 border-b border-gray-100 pb-2 scrollbar-hide">
          {["ALL SWEETS", "GHEE SWEETS", "DRY FRUIT", "SNACKS"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? 'text-[#D97706] border-b-2 border-[#D97706]' : 'text-gray-400'} pb-1.5`}
            >
              [{tab}]
            </button>
          ))}
        </div>

        {/* Product Grid - Corrected aspect ratio and added real images */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative group">
              <div className="relative aspect-[1/1.15] rounded-lg overflow-hidden bg-gray-50 border border-gray-100 mb-2">
                 {/* Product Badge */}
                 {product.bestseller && (
                  <span className="absolute top-2 left-2 z-10 bg-[#D97706]/90 text-white text-[9px] px-2.5 py-1 rounded-sm font-bold">Best Seller</span>
                 )}
                 <span className="absolute top-2 right-2 z-10 text-white text-lg drop-shadow-md">♡</span>
                 
                 {/* Images - Using the public/images folder */}
                 <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300?text=Sweets" }}
                 />
              </div>
              
              <h4 className="font-bold text-sm text-gray-900 leading-tight">{product.name}</h4>
              {/* Product description area */}
              <p className="text-[10px] text-gray-400 mb-1.5 leading-snug">Rich, ghee-laden traditional sweet made with fresh milk and premium ingredients.</p>
              
              <p className="font-bold text-[#D97706] text-sm mb-2.5 flex items-baseline gap-1">
                ₹{product.price}
                <span className="text-[10px] font-normal text-gray-400">/{product.weight}</span>
              </p>
              
              <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white text-[10px] font-bold py-2.5 rounded-md uppercase tracking-wider shadow-sm transition-colors duration-200">
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}