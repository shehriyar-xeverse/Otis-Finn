import React, { useState, useMemo } from "react";
import { PRODUCTS } from "../data";
import { ProductItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, SlidersHorizontal, ShoppingBag, Star, RefreshCw, 
  Info, Eye, Plus, ShoppingCart, Tag, Check, Award
} from "lucide-react";

interface EStoreProps {
  onAddToCart: (product: ProductItem) => void;
  cartCount: number;
}

export default function EStore({ onAddToCart, cartCount }: EStoreProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [selectedProductDetails, setSelectedProductDetails] = useState<ProductItem | null>(null);
  
  // Quick Feedback state when clicking add-to-cart
  const [animatingProductId, setAnimatingProductId] = useState<string | null>(null);

  // Extract all brands for filter
  const brandsList = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach((p) => brands.add(p.brand));
    return ["All Brands", ...Array.from(brands)];
  }, []);

  // Main Categories
  const categoriesList = [
    "All Products",
    "Shaving",
    "Hair Styling",
    "Beard Care",
    "Hair Care",
    "Facial Care"
  ];

  // Filtering & Sorting calculations
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== "All Brands") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sort operations
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  const handleAddToCartWithAnimation = (product: ProductItem) => {
    setAnimatingProductId(product.id);
    onAddToCart(product);
    setTimeout(() => {
      setAnimatingProductId(null);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="estore-root">
      {/* Top filter toolbar */}
      <div className="grid gap-4 md:grid-cols-12 bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-xl backdrop-blur-md" id="store-utilities-bar">
        {/* Search Input block */}
        <div className="relative md:col-span-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search pomades, shaving creams, beard oils..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950/70 py-2.5 pr-4 pl-10 text-xs text-white placeholder-zinc-500 outline-none transition-all focus:border-[#14b8a6] focus:shadow-md focus:shadow-[#14b8a6]/5"
            id="product-search-bar"
          />
        </div>

        {/* Brand selection dropdown */}
        <div className="relative md:col-span-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full h-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-zinc-350 outline-none cursor-pointer focus:border-[#14b8a6]"
            id="brand-filter-select"
          >
            {brandsList.map((brand) => (
              <option key={brand} value={brand} className="bg-zinc-950">
                {brand === "All Brands" ? "🏛️ Filter Brand (All)" : `🏷️ ${brand}`}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting options dropdown */}
        <div className="relative md:col-span-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full h-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-zinc-350 outline-none cursor-pointer focus:border-[#14b8a6]"
            id="sort-filter-select"
          >
            <option value="popular" className="bg-zinc-950">🔥 Sort by Popularity</option>
            <option value="price-low" className="bg-zinc-950">📉 Price: Low to High</option>
            <option value="price-high" className="bg-zinc-950">📈 Price: High to Low</option>
            <option value="rating" className="bg-zinc-950">⭐️ Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Categories Horizontal Banner */}
      <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none" id="store-categories-list">
        {categoriesList.map((cat) => {
          const isSel = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
                isSel
                  ? "bg-[#14b8a6] text-black border-[#14b8a6] shadow-md shadow-[#14b8a6]/20"
                  : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* --- RESPONSIVE RESOLUTION: STICKY grid-cols-1 FOR MOBILE ! --- */}
      {/* On mobile devices under 'sm', grid-cols-1 is fully enforced for beautiful, single Column layout cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" id="store-products-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p) => {
            const isAnimating = animatingProductId === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, boxShadow: "0 10px 30px -15px rgba(20, 184, 166, 0.15)" }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-955 p-3.5 h-full transition-all hover:border-[#14b8a6]/40 shadow-xl"
                id={`product-card-${p.id}`}
              >
                {/* Visual Image Block */}
                <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900 leading-none">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Popular highlight tag badge */}
                  {p.isPopular && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-[#14b8a6] px-2 py-0.5 text-[8.5px] font-bold text-black uppercase tracking-wider">
                      <Award className="h-3 w-3 fill-current" />
                      Elite Blend
                    </span>
                  )}

                  {/* Rating layout in image block */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-0.5 rounded bg-black/80 px-2 py-0.5 font-mono text-[9px] text-[#2dd4bf] backdrop-blur-sm">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    <span>{p.rating.toFixed(1)}</span>
                  </div>

                  {/* Actions Quick Hover overlay */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center gap-2.5 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedProductDetails(p)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-850 text-white hover:bg-[#14b8a6] hover:text-black transition-all cursor-pointer shadow-md"
                      title="Inspect Details"
                      id={`inspect-${p.id}`}
                    >
                      <Eye className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={() => handleAddToCartWithAnimation(p)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14b8a6] text-black hover:bg-white transition-all cursor-pointer shadow-md"
                      title="Add to Shopping Cart"
                      id={`add-fast-${p.id}`}
                    >
                      <Plus className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

                {/* Text and attributes description block */}
                <div className="mt-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                      {p.brand} • {p.subCategory}
                    </span>
                    <h4 className="mt-1 font-serif text-sm font-semibold leading-snug text-white line-clamp-2 min-h-[36px] group-hover:text-[#134e4a] dark:group-hover:text-[#14b8a6] transition-colors uppercase">
                      {p.name}
                    </h4>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3">
                    <span className="font-display font-black text-sm text-[#14b8a6]">
                      ${p.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCartWithAnimation(p)}
                      className={`relative flex items-center justify-center rounded-lg px-3.5 py-2 font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isAnimating 
                          ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" 
                          : "bg-zinc-90 w-full bg-zinc-900 text-white hover:bg-[#14b8a6] hover:text-black"
                      }`}
                      id={`buy-${p.id}`}
                    >
                      {isAnimating ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Added!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ShoppingCart className="h-3 w-3" />
                          Add to Bag
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Roster zero entries layout */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-zinc-900/10 rounded-xl border border-zinc-800 flex flex-col items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-zinc-650 mb-3" />
          <h5 className="font-display font-semibold text-zinc-400">No Premium Items Discovered</h5>
          <p className="mt-1.5 text-xs text-zinc-500 max-w-xs leading-relaxed">
            Try adjusting your search query, selecting another category, or resetting filter specifications.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Products");
              setSelectedBrand("All Brands");
            }}
            className="mt-5 rounded-full bg-zinc-900 border border-zinc-800 px-5 py-2.5 text-[10px] text-white font-bold uppercase tracking-widest transition-all hover:bg-zinc-800 hover:border-zinc-700"
          >
            Reset Catalog
          </button>
        </div>
      )}

      {/* --- PRODUCT QUICK VIEW DETAIL OVERLAY MODAL --- */}
      <AnimatePresence>
        {selectedProductDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductDetails(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              id="product-back-overlay"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative grid w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-c border-zinc-800 bg-zinc-950 shadow-2xl md:grid-cols-2"
              id="product-detail-modal-box"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white outline-none hover:bg-black transition-all border border-zinc-800/40"
              >
                ✕
              </button>

              {/* Photo Area */}
              <div className="bg-zinc-900 flex items-center justify-center h-48 md:h-full">
                <img
                  src={selectedProductDetails.image}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Information text block */}
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <span className="font-mono text-[9px] tracking-wider text-[#14b8a6] uppercase bg-[#14b8a6]/10 px-2 py-0.5 rounded-full border border-[#14b8a6]/25">
                    🥇 Premium {selectedProductDetails.brand} Formula
                  </span>
                  
                  <h3 className="mt-2.5 font-serif text-xl font-bold text-white uppercase tracking-tight">
                    {selectedProductDetails.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-3 font-mono text-[10px] text-zinc-500 pb-3 border-b border-zinc-850">
                    <span className="flex items-center gap-0.5 text-[#14b8a6] font-bold">
                      ★ {selectedProductDetails.rating.toFixed(1)} Rating
                    </span>
                    <span>•</span>
                    <span className="uppercase text-zinc-400">{selectedProductDetails.subCategory}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-zinc-450">
                    {selectedProductDetails.description}
                  </p>

                  <div className="mt-5 rounded-lg bg-zinc-900/60 p-3 text-[10px] space-y-1 text-zinc-500 font-mono">
                    <div>🏷️ Brand: <strong className="text-white uppercase">{selectedProductDetails.brand}</strong></div>
                    <div>📦 Status: <strong className="text-[#14b8a6]">In Stock (At Brooklyn & Queens Outposts)</strong></div>
                    <div>⚡ Usage: Applied liberally during premium cut finishes.</div>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-zinc-900 pt-4">
                  <div>
                    <span className="block text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Consumable Value</span>
                    <strong className="font-display text-2xl text-[#14b8a6] font-bold">
                      ${selectedProductDetails.price.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCartWithAnimation(selectedProductDetails);
                      setSelectedProductDetails(null);
                    }}
                    className="flex items-center gap-2 rounded-lg bg-[#14b8a6] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#2dd4bf] transition-all cursor-pointer shadow-lg shadow-[#14b8a6]/15"
                    id={`modal-buy-btn-${selectedProductDetails.id}`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Place In Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
