import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, ProductItem } from "../types";
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, 
  MapPin, CreditCard, ShoppingCart, Truck 
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"review" | "shipping" | "payment" | "success">("review");
  const [shippingMethod, setShippingMethod] = useState<"pickup" | "delivery">("pickup");
  
  // Checkout Input fields
  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientZip, setClientZip] = useState("");
  const [clientCard, setClientCard] = useState("");
  const [clientExpiry, setClientExpiry] = useState("");
  const [clientCvv, setClientCvv] = useState("");

  const [loading, setLoading] = useState(false);

  // Totals calculations
  const subTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subTotal * 0.08875; // NYC State tax rate
  const deliveryFee = shippingMethod === "delivery" ? 8.50 : 0.00;
  const grandTotal = subTotal > 0 ? subTotal + tax + deliveryFee : 0;

  const handleNextStep = () => {
    if (checkoutStep === "review") {
      setCheckoutStep("shipping");
    } else if (checkoutStep === "shipping") {
      if (shippingMethod === "delivery" && (!clientStreet || !clientCity || !clientZip)) {
        alert("Please complete the shipment destination details.");
        return;
      }
      setCheckoutStep("payment");
    }
  };

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCard || !clientExpiry || !clientCvv) {
      alert("Please enter payment credit card details.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutStep("success");
    }, 2000);
  };

  const handleFinishSuccess = () => {
    onClearCart();
    setCheckoutStep("review");
    setShippingMethod("pickup");
    setClientStreet("");
    setClientCity("");
    setClientZip("");
    setClientCard("");
    setClientExpiry("");
    setClientCvv("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            id="cart-back-overlay"
          />

          {/* Drawer Slide area */}
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="w-screen max-w-md border-l border-zinc-850 bg-zinc-950 p-6 flex flex-col justify-between shadow-2xl h-full"
              id="cart-drawer-box"
            >
              {/* HEADER block */}
              <div>
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#14b8a6]" />
                    <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider">
                      YOUR BAG
                    </h3>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 font-mono text-[10px] text-[#14b8a6] border border-[#14b8a6]/25 font-bold">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Progress Indicators in Checkout */}
                {cartItems.length > 0 && checkoutStep !== "success" && (
                  <div className="my-4 grid grid-cols-3 gap-2 font-mono text-[9px] text-center border-b border-zinc-900 pb-3 text-zinc-500 select-none">
                    <span className={checkoutStep === "review" ? "text-[#14b8a6] font-extrabold" : "text-zinc-400"}>
                      1. REVIEW LIST
                    </span>
                    <span className={checkoutStep === "shipping" ? "text-[#14b8a6] font-extrabold" : "text-zinc-400"}>
                      2. DESPATCH
                    </span>
                    <span className={checkoutStep === "payment" ? "text-[#14b8a6] font-extrabold" : "text-zinc-400"}>
                      3. PURCHASE
                    </span>
                  </div>
                )}
              </div>

              {/* MAIN CONTENT WORKSPACE */}
              <div className="flex-1 overflow-y-auto pr-1 my-3 scrollbar-thin">
                {cartItems.length === 0 ? (
                  /* --- EMPTY STATE LAYOUT --- */
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <ShoppingCart className="h-12 w-12 text-zinc-750 stroke-1 mb-3" />
                    <h4 className="font-display text-zinc-450 text-sm font-semibold uppercase">Your Bag is Empty</h4>
                    <p className="text-xs text-zinc-550 mt-1.5 max-w-xs leading-normal">
                      Explore our premium pomades, shaving waxes and biological hair styling creams.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 rounded-lg bg-zinc-900 hover:bg-[#14b8a6] hover:text-black border border-zinc-800 px-5 py-2.5 text-xs text-white uppercase tracking-wider font-bold transition-all cursor-pointer"
                    >
                      Browse Estore
                    </button>
                  </div>
                ) : checkoutStep === "success" ? (
                  /* --- SUCCESS SUMMARY --- */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                      <ShieldCheck className="h-8 w-8 animate-bounce" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      Payment Certified
                    </span>
                    <h4 className="font-display text-2xl font-bold text-white mt-1 uppercase">
                      ORDER ASSEMBLED!
                    </h4>
                    <p className="text-xs text-zinc-405 mt-2 max-w-xs leading-normal">
                      Your premium grooming tools have been processed. Receipts and pickup barcodes dispatched to register email.
                    </p>

                    <div className="mt-6 w-full rounded-xl bg-zinc-900 border border-zinc-c border-zinc-850 p-4 text-left space-y-2 font-mono text-[10px] text-zinc-500">
                      <div>INVOICE: <span className="text-white">#OAF-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                      <div>DISPATCH: <span className="text-white uppercase">{shippingMethod === "pickup" ? "FLAGSHIP STORE PICKUP" : "PRIORITY HOME DELIVERY"}</span></div>
                      <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-xs">
                        <span className="text-zinc-405">GRAND VALUE</span>
                        <span className="text-[#14b8a6]">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleFinishSuccess}
                      className="mt-8 w-full rounded-lg bg-[#14b8a6] py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#2dd4bf] cursor-pointer"
                    >
                      Conclude Order
                    </button>
                  </motion.div>
                ) : checkoutStep === "review" ? (
                  /* --- STEP 1: REVIEW THE LIST --- */
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div 
                        key={item.product.id} 
                        className="flex items-start gap-3 bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-xl"
                        id={`cart-item-row-${item.product.id}`}
                      >
                        <img 
                          src={item.product.image} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="h-14 w-14 rounded-lg object-cover bg-zinc-950 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">{item.product.brand}</span>
                          <h5 className="font-serif text-xs font-semibold text-white truncate uppercase">
                            {item.product.name}
                          </h5>
                          <div className="mt-1 font-display font-bold text-xs text-[#14b8a6]">
                            ${item.product.price.toFixed(2)}
                          </div>

                          {/* Controls row */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center border border-zinc-800 rounded bg-zinc-950">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                                id={`qty-minus-${item.product.id}`}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 font-mono text-xs text-white">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                                id={`qty-plus-${item.product.id}`}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-zinc-650 hover:text-rose-450 transition-colors p-1 cursor-pointer"
                              id={`remove-item-${item.product.id}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : checkoutStep === "shipping" ? (
                  /* --- STEP 2: SHIPPING PREFERENCES --- */
                  <div className="space-y-5">
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 select-none">
                        CHOOSE COLLECTION OUTLET
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          onClick={() => setShippingMethod("pickup")}
                          className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                            shippingMethod === "pickup"
                              ? "border-[#14b8a6] bg-[#14b8a6]/5"
                              : "border-zinc-850 bg-zinc-900/10 hover:border-zinc-700"
                          }`}
                        >
                          <MapPin className="h-5 w-5 mx-auto text-[#14b8a6] mb-1.5" />
                          <h6 className="text-xs font-semibold text-white">LIC Pickup</h6>
                          <p className="mt-0.5 text-[10px] text-zinc-500 font-mono">Free • Ready 2 hrs</p>
                        </div>
                        <div
                          onClick={() => setShippingMethod("delivery")}
                          className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                            shippingMethod === "delivery"
                              ? "border-[#14b8a6] bg-[#14b8a6]/5"
                              : "border-zinc-850 bg-zinc-900/10 hover:border-zinc-700"
                          }`}
                        >
                          <Truck className="h-5 w-5 mx-auto text-[#14b8a6] mb-1.5" />
                          <h6 className="text-xs font-semibold text-white">NYC Despatch</h6>
                          <p className="mt-0.5 text-[10px] text-zinc-500 font-mono">$8.50 • Next Day</p>
                        </div>
                      </div>
                    </div>

                    {shippingMethod === "delivery" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3.5 pt-2"
                      >
                        <div>
                          <label className="block text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                            Street Address
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 102 Greenpoint Ave"
                            value={clientStreet}
                            onChange={(e) => setClientStreet(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white focus:border-[#14b8a6] outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                              City / Region
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Brooklyn"
                              value={clientCity}
                              onChange={(e) => setClientCity(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white focus:border-[#14b8a6] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                              ZIP / Postal Code
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 11222"
                              value={clientZip}
                              onChange={(e) => setClientZip(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white focus:border-[#14b8a6] outline-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {shippingMethod === "pickup" && (
                      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-2 font-mono text-[9px] text-zinc-500">
                        <strong className="text-[#14b8a6] block font-semibold">📍 FLAGSHIP OUTPOST COLLECTION</strong>
                        Our crew prepares products at Otis & Finn Court Square block. Ready for collection on validation barcode.
                      </div>
                    )}
                  </div>
                ) : (
                  /* --- STEP 3: CREDIT CARD PAYMENT --- */
                  <form onSubmit={handleProcessCheckout} className="space-y-3.5 select-none">
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2">
                        SECURE PAYMENTS PLATFORM
                      </span>
                      <div className="rounded-lg border border-zinc-850 bg-zinc-900/40 p-3.5 flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-zinc-300">Authorized Merchant Gateway</span>
                        <CreditCard className="h-4 w-4 text-[#14b8a6]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-wider text-zinc-550 uppercase">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={clientCard}
                        onChange={(e) => setClientCard(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white focus:border-[#14b8a6] outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-zinc-555 uppercase">
                          Expiration Code
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={clientExpiry}
                          onChange={(e) => setClientExpiry(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white focus:border-[#14b8a6] outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-zinc-555 uppercase">
                          CVV Security
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={clientCvv}
                          onChange={(e) => setClientCvv(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white focus:border-[#14b8a6] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <button type="submit" className="hidden" id="submit-pay-hidden-trigger" />
                  </form>
                )}
              </div>

              {/* STICKY BOTTOM BILLING OUTLINES */}
              {cartItems.length > 0 && checkoutStep !== "success" && (
                <div className="border-t border-zinc-900 pt-4 bg-zinc-950">
                  {/* Aggregator columns */}
                  <div className="space-y-2 font-mono text-xs text-zinc-500">
                    <div className="flex justify-between">
                      <span>BAG SUB-TOTAL</span>
                      <span className="text-zinc-300 font-bold">${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESTIMATED TAX (NYC)</span>
                      <span className="text-zinc-300">${tax.toFixed(2)}</span>
                    </div>
                    {shippingMethod === "delivery" && (
                      <div className="flex justify-between">
                        <span>NYC COURIER DELIVERY</span>
                        <span className="text-zinc-300">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-zinc-900">
                      <span className="font-bold text-white uppercase">BILL TOTAL</span>
                      <span className="text-[#14b8a6] font-bold text-base">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="mt-5 select-none">
                    {checkoutStep === "payment" ? (
                      <button
                        onClick={() => {
                          const trigger = document.getElementById("submit-pay-hidden-trigger");
                          if (trigger) trigger.click();
                        }}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14b8a6] py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#2dd4bf] disabled:opacity-50 cursor-pointer shadow-lg shadow-[#14b8a6]/10"
                        id="cart-payment-complete-btn"
                      >
                        {loading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        ) : (
                          <>
                            Purchase Grooming Pack (${grandTotal.toFixed(2)})
                            <ShieldCheck className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextStep}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#14b8a6] py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#2dd4bf] cursor-pointer"
                        id="cart-workflow-next-btn"
                      >
                        Proceed to Checkout
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    )}
                    
                    <button
                      onClick={onClose}
                      className="mt-3.5 block w-full text-center text-[9px] tracking-widest text-zinc-500 hover:text-white uppercase transition-colors cursor-pointer font-semibold"
                    >
                      Keep Browsing Store
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
