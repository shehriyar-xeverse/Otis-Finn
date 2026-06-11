import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Scissors, User, Clock, ShoppingBag, Menu, X, 
  ExternalLink, ChevronRight, Calendar, ChevronDown, LogOut, 
  Heart, Info, MapPin, Sparkles, Star, Award, MessageSquare, 
  Bell, Check, RefreshCw, Send, ShieldCheck, Clipboard
} from "lucide-react";

// Components Imports
import ServicesCatalog from "./components/ServicesCatalog";
import LocationDetails from "./components/LocationDetails";
import SocialFeed from "./components/SocialFeed";
import LoginModal from "./components/LoginModal";
import CareersModal from "./components/CareersModal"; // New recruit form!
import BarberDetailModal from "./components/BarberDetailModal";
import AppointmentsWizard from "./components/AppointmentsWizard";
import EStore from "./components/EStore";
import CartDrawer from "./components/CartDrawer";

// Data Imports
import { LOCATIONS, BARBERS, SERVICES } from "./data";
import { Barber, BusinessLocation, CartItem, ProductItem } from "./types";
import { initializeFaviconAndTitle } from "./utils/favicon";

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<"home" | "shop" | "book">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom Filters for the Wizard
  const [preSelectedLocationId, setPreSelectedLocationId] = useState("");
  const [preSelectedBarberId, setPreSelectedBarberId] = useState("");

  // Search/Filters in the Barbers section team display
  const [teamLocationFilter, setTeamLocationFilter] = useState("all");

  // Authentication State
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  // Selected barber for detailed biography popup
  const [selectedBarberDetails, setSelectedBarberDetails] = useState<Barber | null>(null);

  // Shopping Cart States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Newsletter Gazette State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Mouse position cursor trajectory (Companion System)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Update Page Title and Favicon based on View
  useEffect(() => {
    if (currentView === "home") {
      initializeFaviconAndTitle("Traditional Craft");
    } else if (currentView === "shop") {
      initializeFaviconAndTitle("Premium Estore");
    } else if (currentView === "book") {
      initializeFaviconAndTitle("Secure Scheduler");
    }
  }, [currentView]);

  // Track cursor tracking actions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window);
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, select, option, input, [role='button'], .mini-date-card, [onClick]");
      setCursorHovered(!!isInteractive);
    };

    if (!isMobileDevice) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobileDevice]);

  // Cart Management Actions
  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle book actions from catalog, location map, or barber details
  const triggerBookingWithParams = (locationId: string, barberId: string) => {
    setPreSelectedLocationId(locationId);
    setPreSelectedBarberId(barberId);
    setCurrentView("book");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Switch to scroll section
  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== "home") {
      setCurrentView("home");
      // Wait for view render, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSuccess(false);
    }, 4500);
  };

  // Filter barbers inside the team grid
  const filteredBarberRoster = BARBERS.filter(
    (b) => teamLocationFilter === "all" || b.locationId === teamLocationFilter
  );

  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#f3f4f6]" id="main-application-frame">
      {/* Dynamic Companion Custom Cursor (Desktop Only) */}
      {!isMobileDevice && (
        <>
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14b8a6] mix-blend-screen"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: cursorHovered ? 1.6 : 1,
            }}
            transition={{ type: "spring", stiffness: 950, damping: 25, mass: 0.15 }}
          />
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#14b8a6]/40 mix-blend-screen"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: cursorHovered ? 2.0 : 1,
              borderColor: cursorHovered ? "rgba(45, 212, 191, 0.85)" : "rgba(20, 184, 166, 0.35)",
              backgroundColor: cursorHovered ? "rgba(20, 184, 166, 0.08)" : "rgba(0,0,0,0)",
            }}
            transition={{ type: "spring", stiffness: 550, damping: 30, mass: 0.45 }}
          />
        </>
      )}

      {/* NO TOP MARQUEE LINE - DIRECT START WITH POLISHED HEADER */}
      <header className="sticky top-0 z-35 w-full bg-[#0f0f10]/95 border-b border-zinc-900/60 backdrop-blur-md" id="app-navigation-header">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* BRAND LOGO */}
            <div 
              onClick={() => {
                setCurrentView("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer group flex items-baseline gap-1"
              id="brand-logo-wrap"
            >
              <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white group-hover:text-[#14b8a6] transition-all">
                OTIS & FINN
              </h1>
             
            </div>

            {/* HIGH-END DESKTOP NAV ITEMS */}
            {/* Exactly: Locations, Appointments, Services, Social, Shop, Careers, Login, Carts */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              <button
                onClick={() => handleScrollToSection("locations")}
                className="hover:text-[#14b8a6] transition-all cursor-pointer"
                id="nav-link-locations"
              >
                Locations
              </button>
              <button
                onClick={() => {
                  setPreSelectedLocationId("");
                  setPreSelectedBarberId("");
                  setCurrentView("book");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`hover:text-[#14b8a6] transition-all cursor-pointer ${currentView === "book" ? "text-[#14b8a6] font-extrabold" : ""}`}
                id="nav-link-book"
              >
                Appointments
              </button>
              <button
                onClick={() => handleScrollToSection("services")}
                className="hover:text-[#14b8a6] transition-all cursor-pointer"
                id="nav-link-services"
              >
                Services
              </button>
              <button
                onClick={() => handleScrollToSection("social-instagram-mount")}
                className="hover:text-[#14b8a6] transition-all cursor-pointer"
                id="nav-link-social"
              >
                Social
              </button>
              <button
                onClick={() => {
                  setCurrentView("shop");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`transition-all hover:text-[#14b8a6] cursor-pointer ${currentView === "shop" ? "text-[#14b8a6] font-extrabold" : ""}`}
                id="nav-link-shop"
              >
                Shop
              </button>
              <button
                onClick={() => setIsCareersModalOpen(true)}
                className="hover:text-[#14b8a6] text-zinc-350 transition-all cursor-pointer"
                id="nav-link-careers"
              >
                Careers
              </button>
              
              {/* Login State */}
              {userEmail ? (
                <div className="relative" id="logged-user-dashboard-widget">
                  <button
                    onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                    className="flex items-center gap-1.5 rounded-full border border-[#14b8a6]/40 bg-zinc-900/60 px-3.5 py-1.5 text-[10px] font-extrabold text-white"
                    id="member-panel-trigger"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Member Logged</span>
                    <ChevronDown className="h-3 w-3 text-zinc-500" />
                  </button>

                  <AnimatePresence>
                    {showMemberDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl z-50 text-left font-sans"
                        id="member-dropdown-box"
                      >
                        <span className="block text-[8px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                          Authorized Partner
                        </span>
                        <div className="mt-1 pb-2 border-b border-zinc-900 text-xs truncate font-semibold text-white">
                          {userEmail}
                        </div>
                        <div className="my-3 space-y-1 rounded bg-zinc-905 p-2 text-[9px] text-zinc-400">
                          <div className="text-zinc-500 block font-mono text-[8px] uppercase">MEMBERSHIP STATUS</div>
                          <div className="text-[#14b8a6] font-bold tracking-wider">★ THE OTIS APOTHECARY</div>
                        </div>
                        <button
                          onClick={() => {
                            setUserEmail(null);
                            setShowMemberDropdown(false);
                          }}
                          className="w-full flex items-center justify-between text-[10px] font-bold text-rose-450 hover:text-rose-400 transition-colors pt-1 cursor-pointer"
                        >
                          Sign Out Portal
                          <LogOut className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hover:text-[#14b8a6] transition-all cursor-pointer"
                  id="nav-link-login"
                >
                  Login
                </button>
              )}

              {/* Shopping Bag Icon Carts Link */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 flex items-center gap-1 text-zinc-350 hover:text-[#14b8a6] transition-all cursor-pointer font-bold lowercase"
                id="nav-link-carts"
              >
                <div className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4 text-[#14b8a6]" />
                  <span className="uppercase text-[11px] tracking-wider">Carts</span>
                </div>
                {totalCartCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#14b8a6] text-[9px] font-bold text-black font-sans">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </nav>

            {/* ACTION TRIGGERS OUTLET ON MOBILE OR EXTRA CHANGER */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-lg border border-zinc-850 bg-zinc-900/60 text-zinc-300 hover:text-white"
                id="mobile-bag-trigger"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#14b8a6] text-[8.5px] font-black text-black">
                    {totalCartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg border border-zinc-850 bg-zinc-900/60 text-zinc-300 hover:text-white"
                id="btn-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* RE-ARCHITECTED AND COMPACTLY RESPONSIVE MOBILE & TABLET SLIDEDOWN MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#111112] border-b border-zinc-900 overflow-hidden"
              id="mobile-navigation-dropdown"
            >
              <div className="space-y-1.5 px-4 py-5 font-mono text-xs uppercase tracking-wider text-zinc-400">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollToSection("locations");
                  }}
                  className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[#14b8a6] border-b border-zinc-900/40"
                >
                  <MapPin className="h-4 w-4 text-[#14b8a6]" />
                  Locations Outposts
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPreSelectedLocationId("");
                    setPreSelectedBarberId("");
                    setCurrentView("book");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[#14b8a6] text-white border-b border-zinc-900/40"
                >
                  <Calendar className="h-4 w-4 text-[#14b8a6]" />
                  Appointments Booking
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollToSection("services");
                  }}
                  className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[#14b8a6] border-b border-zinc-900/40"
                >
                  <Scissors className="h-4 w-4 text-[#14b8a6]" />
                  Services Offerings
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollToSection("social-instagram-mount");
                  }}
                  className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[#14b8a6] border-b border-zinc-900/40"
                >
                  <MessageSquare className="h-4 w-4 text-[#14b8a6]" />
                  Social Feed
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView("shop");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[#14b8a6] border-b border-zinc-900/40 text-zinc-100"
                >
                  <ShoppingBag className="h-4 w-4 text-[#14b8a6]" />
                  Shop Premium E-Store
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCareersModalOpen(true);
                  }}
                  className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[#14b8a6] border-b border-zinc-900/40"
                >
                  <Clipboard className="h-4 w-4 text-[#14b8a6]" />
                  Careers recruitment
                </button>

                <div className="pt-4 grid grid-cols-2 gap-2">
                  {!userEmail ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 py-3 text-[10px] text-white uppercase font-bold"
                    >
                      <User className="h-3.5 w-3.5 text-[#14b8a6]" />
                      Login Access
                    </button>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg bg-zinc-905 border border-zinc-900 py-3 text-[9px] text-zinc-350 uppercase truncate px-1">
                      👤 {userEmail}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#14b8a6] py-3 text-[10px] text-black font-black uppercase"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Cart Drawer ({totalCartCount})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. MAIN WORKSPACE */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="application-main-view">
        <AnimatePresence mode="wait">
          
          {/* VIEW: E-STORE */}
          {currentView === "shop" && (
            <motion.div
              key="view-store"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Back Link */}
              <div className="flex items-center justify-between border-b border-zinc-805 pb-4">
                <div>
                  <span className="block font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase">
                    🥇 TRADITIONAL HAIR PRODUCTS
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-0.5">
                    PREMIUM BARBER OUTFITTING
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentView("home")}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
                  id="btn-back-to-home"
                >
                  ← Return to Barbershop
                </button>
              </div>

              {/* Main Mount */}
              <EStore onAddToCart={handleAddToCart} cartCount={totalCartCount} />
            </motion.div>
          )}

          {/* VIEW: BOOKING SECURE SCHEDULER */}
          {currentView === "book" && (
            <motion.div
              key="view-book-wizard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Headings */}
              <div className="flex items-center justify-between border-b border-zinc-805 pb-4">
                <div>
                  <span className="block font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase">
                    ⚔️ OTIS & FINN CHAIR INDEX
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-0.5">
                    SECURE APPOINTMENT SCHEDULING
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentView("home")}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-300 transition-all hover:bg-zinc-801 hover:text-white cursor-pointer"
                  id="btn-back-to-home-wiz"
                >
                  ← Back to Home Page
                </button>
              </div>

              {/* Wizard Mount */}
              <AppointmentsWizard 
                initialLocationId={preSelectedLocationId}
                initialBarberId={preSelectedBarberId}
                onBookingCompleted={() => {
                  setTimeout(() => {
                    setCurrentView("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 2000);
                }}
              />
            </motion.div>
          )}

          {/* VIEW: HOME PAGE LANDING */}
          {currentView === "home" && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20 pb-12"
            >
              {/* A. DESIGN DISPLAY HERO SECTION */}
              {/* Updated absolute background configuration utilizing user's specified landscape image path */}
              <section className="relative overflow-hidden rounded-3xl border border-zinc-850 bg-zinc-950 p-6 md:p-14 shadow-2xl min-h-[500px] flex items-center" id="hero-layout">
                {/* Visual Cover Layer (Requested Hero Background Image!) */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl select-none">
                  <motion.img 
                    src="https://res.cloudinary.com/dju25z9v3/image/upload/v1781179918/8c2f1d_c64fcd519f2945c38dc89ad9ffbe4474_mv2_vbqe73.avif"
                    alt="Otis and Finn barber lifestyle visual"
                    className="w-full h-full object-cover grayscale brightness-[0.22] contrast-[1.08]"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                  />
                  {/* Backdrop Gradient for readable text rendering */}
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-transparent" />
                </div>
                
                <div className="grid gap-8 md:grid-cols-12 relative z-10 w-full items-center">
                  <div className="md:col-span-8 space-y-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14b8a6]/15 border border-[#14b8a6]/30 px-3.5 py-1 text-[10px] text-[#14b8a6] font-mono tracking-wider uppercase">
                      🇺🇸 QUEENS & BROOKLYN WATERFRONT HERITAGE
                    </span>

                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6.5xl font-extrabold leading-none tracking-tight text-white uppercase text-balance">
                      TRADITIONAL CRAFT.<br />
                      <span className="text-zinc-500 font-serif font-normal italic lowercase tracking-normal">neighborhood</span> ROOTS.
                    </h2>

                    <p className="max-w-md text-xs sm:text-sm leading-relaxed text-zinc-350">
                      Our flagships offer precise traditional barbering services like classic hot lather straight-razor cuts, skin fades, and dapper beard trims while simultaneously serving as a safe community home for neighbors to gather, converse, and link together.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3.5 pt-2">
                      <button
                        onClick={() => triggerBookingWithParams("", "")}
                        className="flex items-center gap-2 rounded-lg bg-[#14b8a6] hover:bg-[#2dd4bf] px-6 py-3.5 text-xs font-bold tracking-wider text-black uppercase transition-all shadow-xl shadow-[#14b8a6]/10 cursor-pointer"
                        id="btn-hero-schedule"
                      >
                        Book Secure Appointment
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView("shop");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all cursor-pointer"
                        id="btn-hero-estore"
                      >
                        Browse Apothecary Store
                        <ShoppingBag className="h-4 w-4 text-[#14b8a6]" />
                      </button>
                    </div>

                    {/* Metric Badges bar */}
                    <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-6 max-w-sm font-mono text-[9px] text-zinc-500">
                      <div>
                        <strong className="block text-white text-sm font-display">2014</strong>
                        ESTABLISHED YEAR
                      </div>
                      <div>
                        <strong className="block text-white text-sm font-display">4</strong>
                        METRO OUTPOST CHAIRS
                      </div>
                      <div>
                        <strong className="block text-white text-sm font-display">16</strong>
                        CRAFT MASTER BARBERS
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* B. HISTORIC ARCHIVE ABOUT SECTION */}
              <section className="scroll-mt-24 md:scroll-mt-28" id="about">
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                  {/* Image side */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[4/5] shadow-2xl bg-zinc-950 group">
                      <img 
                        src="https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_2_p4ei5l.avif"
                        alt="Kirk Riley cofounder cutting hair"
                        className="w-full h-full object-cover object-top transition-all duration-750 group-hover:scale-[1.03] grayscale hover:grayscale-0 brightness-90 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />
                      
                      {/* Caption */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-zinc-800/80 bg-zinc-955/95 backdrop-blur-md shadow-2xl">
                        <span className="font-mono text-[8px] text-[#14b8a6] font-bold tracking-widest uppercase block">
                          MEET THE FOUNDING ASSOCIATE
                        </span>
                        <h4 className="font-display text-base font-bold text-white mt-0.5 uppercase">Kirk Riley</h4>
                        <p className="text-[10px] text-zinc-400 leading-normal mt-1">
                          Founder & Head Barber. Dedicated to fostering dapper waterfront community culture and classic grooming precision.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Copy side */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase block bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-2.5 py-1 rounded w-fit">
                      📜 THE CHRONICLES OF OTIS & FINN
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                      HISTORICAL APOTHECARY FOR THE NEIGHBORHOOD GENTLEMAN
                    </h3>
                    
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-350">
                      Co-founder Kirk Riley, an industry veteran who spent ten years in fashion, began Otis and Finn's journey in a simple brick corner in Court Square, Long Island City. Kirk wanted to create a shop experience that went beyond simple client transactions: a warm, comfortable space for waterfront neighbors to sit, speak, verify ideas, and form genuine local relationships.
                    </p>

                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-350">
                      Since 2014, we've expanded across Queens and Brooklyn to include our pristine flagship on 44th Ave Road, waterfront view chairs in Greenpoint, and the creative grids of Williamsburg. Each location holds true to Kirk's vision: high-end comfortable chairs, customized straight-razor lines, and classic styles that grow out gracefully.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 pt-2 text-xs font-mono text-zinc-400">
                      <div className="border border-zinc-800 rounded-xl bg-zinc-900/10 p-4">
                        <span className="block font-bold text-[#14b8a6] uppercase tracking-wide">PRECISION TREATMENT</span>
                        Every cut includes tailored neck shaves, scalp massages, and warm lather hot wraps.
                      </div>
                      <div className="border border-zinc-800 rounded-xl bg-zinc-900/10 p-4">
                        <span className="block font-bold text-[#14b8a6] uppercase tracking-wide">METROPOLITAN ROOT</span>
                        We support local neighborhood artists, independent coffee roasters, and local dapper events.
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* C. SERVICES MENU SECTION WITH CATALOG TRIGGER */}
              <section className="scroll-mt-24 md:scroll-mt-28 space-y-6 select-none" id="services">
                <div className="text-center">
                  <span className="font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase bg-[#14b8a6]/10 px-3 py-1 rounded-full border border-[#14b8a6]/15">
                    ✂️ CROPS, FADES & SHAVES MENU
                  </span>
                  <h3 className="mt-2.5 font-display text-2.5xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    OUR APPOINTMENT EXPERIENCE OFFERINGS
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 max-w-sm mx-auto leading-normal">
                    Select any package to pre-fill our secure scheduler instantly. Each experiences session includes consulting.
                  </p>
                </div>

                {/* Mounted interactive catalog */}
                <ServicesCatalog 
                  onSelectService={(serviceId) => {
                    // pre-select and book
                    triggerBookingWithParams("", "");
                  }}
                />
              </section>

              {/* D. MEET OUR STYLIST RESIDENTS (THE BARBERS) */}
              <section className="scroll-mt-24 md:scroll-mt-28 space-y-6" id="barbers">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900/80 pb-5">
                  <div>
                    <span className="font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase">
                      ✂️ CREW CHAIR CATALOG
                    </span>
                    <h3 className="font-display text-2.5xl sm:text-3xl font-bold text-white tracking-tight uppercase mt-0.5">
                      MEET OUR MASTER BARBERS
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-sm leading-normal">
                      Our barbers are certified masters in both traditional and modern styling. Click bios to inspect specialties.
                    </p>
                  </div>

                  {/* Filter Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Filtered Outposts:</span>
                    <select
                      value={teamLocationFilter}
                      onChange={(e) => setTeamLocationFilter(e.target.value)}
                      className="rounded-lg border border-zinc-900 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 outline-none cursor-pointer hover:border-zinc-700 transition"
                      id="barber-outlet-team-filter"
                    >
                      <option value="all">🌐 All Locations Crew</option>
                      <option value="44th-ave">📍 44th Ave (LIC)</option>
                      <option value="court-square">📍 Court Square (LIC)</option>
                      <option value="greenpoint">📍 Greenpoint (Brooklyn)</option>
                      <option value="williamsburg">📍 Williamsburg (Brooklyn)</option>
                    </select>
                  </div>
                </div>

                {/* Team grid */}
                <div className="grid gap-6 grid-cols-2 md:grid-cols-4" id="barbers-team-grid">
                  <AnimatePresence mode="popLayout">
                    {filteredBarberRoster.map((barber) => {
                      return (
                        <motion.div
                          key={barber.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -6, borderColor: "rgba(20, 184, 166, 0.4)" }}
                          className="group rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 flex flex-col justify-between h-full shadow-2xl relative transition-all"
                          id={`team-barber-card-${barber.id}`}
                        >
                          <div>
                            {/* Photo box */}
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-905">
                              <img
                                src={barber.image}
                                alt={barber.name}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 brightness-90 contrast-105 transition-all duration-700"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
                              <span className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-[8px] font-mono text-[#2dd4bf] border border-white/5 font-bold">
                                ★ {barber.rating || 4.9}
                              </span>
                            </div>

                            {/* Label specs */}
                            <div className="mt-3">
                              <span className="block font-mono text-[8.5px] text-[#14b8a6] uppercase tracking-wider font-semibold">
                                {barber.role}
                              </span>
                              <h4 className="font-serif text-sm font-semibold text-white group-hover:text-[#14b8a6] transition-colors leading-tight uppercase tracking-wide mt-0.5">
                                {barber.name}
                              </h4>
                              <p className="text-[10.5px] text-zinc-450 mt-1 leading-normal line-clamp-2">
                                {barber.introduction}
                              </p>
                            </div>
                          </div>

                          {/* CTA trigger bio popup */}
                          <div className="mt-4 border-t border-zinc-900/85 pt-3">
                            <button
                              onClick={() => setSelectedBarberDetails(barber)}
                              className="w-full text-center text-[10px] uppercase font-bold text-zinc-450 group-hover:text-black group-hover:bg-[#14b8a6] border border-zinc-800 bg-zinc-900/40 rounded-lg py-2.5 transition-all cursor-pointer"
                              id={`b-detail-trigger-${barber.id}`}
                            >
                              Inspect Bio & Crafts
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </section>

              {/* E. METROPOLITAN COORDINATES (LOCATIONS OUTPOSTS) */}
              <section className="scroll-mt-24 md:scroll-mt-28 space-y-6" id="locations">
                <div className="text-center">
                  <span className="font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase bg-[#14b8a6]/10 px-3.5 py-1 rounded-full border border-[#14b8a6]/15">
                    🗺️ INTERACTIVE METROPOLITAN COORDINATES
                  </span>
                  <h3 className="mt-2.5 font-display text-2.5xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    OUR NEIGHBORHOOD CHAIR OUTPOSTS
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 max-w-sm mx-auto leading-normal">
                    Living catalog of waterfront locations across Brooklyn and Queens. Tap outpost indicators to lock and book.
                  </p>
                </div>

                {/* Locations Component */}
                <LocationDetails 
                  onBookLocation={(locationId) => {
                    triggerBookingWithParams(locationId, "");
                  }}
                />
              </section>

              {/* F. SOCIAL INSTAGRAM FEED */}
              <section className="scroll-mt-24 md:scroll-mt-28 space-y-4 pt-4" id="social-instagram-mount">
                {/* Social Component mount */}
                <SocialFeed />
              </section>

              {/* G. NEWSLETTER GAZETTE FORM */}
              <section className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 md:p-10 relative overflow-hidden shadow-xl" id="gazette-form">
                <div className="absolute top-0 right-0 h-28 w-28 bg-[#14b8a6]/5 rounded-bl-full pointer-events-none" />
                
                <div className="max-w-xl space-y-4">
                  <span className="font-mono text-[8px] tracking-widest text-[#14b8a6] uppercase font-bold block">
                    🗞️ SHIFT TRANSCRIPTIONS NEWSLETTER
                  </span>
                  <h4 className="font-display text-2xl font-bold text-white uppercase mt-1">
                    SUBSCRIBE TO THE OTIS GAZETTE
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-lg">
                    Subscribe to receive seasonal grooming edits, beard oil formulas, and priority scheduling announcements directly from the barbering crew. No spam, ever.
                  </p>

                  <AnimatePresence mode="wait">
                    {newsletterSuccess ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg bg-emerald-500/10 p-3.5 text-xs text-emerald-400 border border-emerald-500/20 max-w-md flex items-center gap-2"
                      >
                        <ShieldCheck className="h-4.5 w-4.5" />
                        Subscription logs certified. Welcome to the Otis & Finn Gazette!
                      </motion.div>
                    ) : (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleNewsletterSubmit} 
                        className="flex flex-col sm:flex-row gap-2 max-w-md pt-1 select-none"
                        id="form-newsletter-email"
                      >
                        <input
                          type="email"
                          placeholder="Enter email address..."
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-[#14b8a6] transition-all"
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-[#14b8a6] hover:bg-[#2dd4bf] font-sans font-bold text-xs uppercase tracking-wider text-black px-5 py-3 transition-all text-center flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-[#14b8a6]/10"
                        >
                          Register Code
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. FOOTER & DETAILS CREDIT LINE */}
      <footer className="bg-[#0b0b0c] border-t border-zinc-900 py-12 text-zinc-500" id="traditional-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4 border-b border-zinc-900/80 pb-10">
            {/* Column 1: Brand */}
            <div className="space-y-3.5">
              <h4 className="font-display font-bold text-white text-base tracking-widest uppercase">OTIS & FINN</h4>
              <p className="text-[11px] leading-relaxed text-zinc-550">
                Traditional craft, neighborhood roots. Serving the dapper waterfront communities across Queens and Brooklyn since 2014.
              </p>
              <span className="block font-mono text-[9.5px] text-[#14b8a6] font-semibold uppercase">★ ★ ★ ★ ★ Rated 4.9 on Yelp indexes</span>
            </div>

            {/* Column 2: Hours */}
            <div className="space-y-3 text-[11px]">
              <h5 className="font-mono text-[9px] font-bold tracking-wider text-[#14b8a6] uppercase">FLAGSHIP HOURS</h5>
              <div className="space-y-1.5 text-zinc-400">
                <div className="flex justify-between"><span>Mon - Fri:</span><strong>9:00 AM - 8:00 PM</strong></div>
                <div className="flex justify-between"><span>Saturday:</span><strong>9:00 AM - 6:00 PM</strong></div>
                <div className="flex justify-between"><span>Sunday:</span><strong>10:00 AM - 5:00 PM</strong></div>
              </div>
            </div>

            {/* Column 3: Outposts Coordinates */}
            <div className="space-y-2 text-[11px] text-zinc-400">
              <h5 className="font-mono text-[9px] font-bold tracking-wider text-[#14b8a6] uppercase">OUTPOST COORDINATES</h5>
              <ul className="space-y-2.5">
                <li>📍 <strong>44th Ave:</strong> 44th Ave Road, Long Island City (11101)</li>
                <li>📍 <strong>Court Square:</strong> Court Square Plaza, LIC (11101)</li>
                <li>📍 <strong>Greenpoint:</strong> Greenpoint Waterfront, Brooklyn (11222)</li>
                <li>📍 <strong>Williamsburg:</strong> Williamsburg Creative, Brooklyn (11211)</li>
              </ul>
            </div>

            {/* Column 4: Links */}
            <div className="space-y-3.5 text-[11px]">
              <h5 className="font-mono text-[9px] font-bold tracking-wider text-[#14b8a6] uppercase">QUICK ACTIONS</h5>
              <div className="flex flex-col gap-2.5">
                <button onClick={() => triggerBookingWithParams("", "")} className="text-left text-zinc-405 hover:text-white cursor-pointer">Appointments</button>
                <button onClick={() => { setCurrentView("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left text-zinc-405 hover:text-white cursor-pointer">Shop E-Store</button>
                <button onClick={() => handleScrollToSection("barbers")} className="text-left text-zinc-405 hover:text-white cursor-pointer">The Master Barbers</button>
                <a href="https://www.instagram.com/otisandfinnbarbers/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-zinc-405 hover:text-white">
                  Instagram Portal
                  <ExternalLink className="h-3 w-3 text-[#14b8a6]" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono gap-4">
            <div>
              &copy; {new Date().getFullYear()} OTIS & FINN BARBERSHOP. CO-FOUNDER KIRK RILEY. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600">
              <span>DESIGNED AND ASSEMBLED IN NEW YORK</span>
              <span>•</span>
              <span className="tracking-wider uppercase">BARBERING APOTHECARY OF NY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- ALL GLOBAL INTERACTIVE OVERLAY MODALS --- */}
      
      {/* A. BARBER EXPANDED BIO SHEET MODAL */}
      <BarberDetailModal 
        barber={selectedBarberDetails} 
        onClose={() => setSelectedBarberDetails(null)} 
        onBookBarber={(barberId, locationId) => {
          triggerBookingWithParams(locationId, barberId);
        }}
      />

      {/* B. MEMBERS COMPREHENSIVE LOGIN PORTAL MODAL */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={(email) => {
          setUserEmail(email);
        }}
      />

      {/* C. SLIDING RECRUITMENT APPRENTICESHIP PORTAL MODAL */}
      <CareersModal 
        isOpen={isCareersModalOpen}
        onClose={() => setIsCareersModalOpen(false)}
      />

      {/* D. SLIDING SHOPPING CART DRAWER OVERLAY */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
