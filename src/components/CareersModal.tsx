import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Phone, Briefcase, FileText, Send, CheckCircle, ShieldCheck, MapPin } from "lucide-react";

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CareersModal({ isOpen, onClose }: CareersModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [outpost, setOutpost] = useState("44th-ave");
  const [position, setPosition] = useState("barber");
  const [portfolio, setPortfolio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !phone || !portfolio) {
      setError("Please fill in all requested fields to apply.");
      return;
    }

    setLoading(true);

    // Simulate career application submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Reset states
        setFullName("");
        setEmail("");
        setPhone("");
        setOutpost("44th-ave");
        setPosition("barber");
        setPortfolio("");
        onClose();
      }, 3500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            id="careers-backdrop"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8"
            id="careers-modal-box"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 transition-colors hover:text-white"
              id="close-careers-btn"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#14b8a6] uppercase bg-[#14b8a6]/10 px-3 py-1 rounded-full">
                💈 JOIN THE CREW CHAIRS
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white uppercase">
                JOIN THE OTIS & FINN TEAM
              </h2>
              <p className="mt-1.5 text-xs text-zinc-450 leading-relaxed max-w-sm mx-auto">
                We are always seeking passionate traditional barbers, energetic junior crew, and apprentices for our Queens and Brooklyn outposts.
              </p>
            </div>

            {/* Success Animation Splash */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950 p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/35"
                  >
                    <CheckCircle className="h-10 w-10" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white uppercase">
                    Application Logged!
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 max-w-xs leading-normal">
                    Co-Founder Kirk Riley and the local managers will examine your portfolio and reach out to schedule an in-chair trial.
                  </p>
                  <span className="block text-[10px] font-mono text-[#14b8a6] mt-4 uppercase animate-pulse">
                    Thank you for applying
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-lg bg-rose-500/10 p-3 text-xs text-rose-400"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inputs Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[480px] overflow-y-auto pr-1 select-none">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Liam Parker"
                    disabled={loading}
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white placeholder-zinc-650 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-zinc-455 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="liam@domain.com"
                    disabled={loading}
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white placeholder-zinc-650 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    disabled={loading}
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white placeholder-zinc-650 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-zinc-455 uppercase">
                    Preferred Outpost
                  </label>
                  <select
                    value={outpost}
                    onChange={(e) => setOutpost(e.target.value)}
                    disabled={loading}
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-900/45 p-2.5 text-xs text-zinc-300 outline-none transition-all focus:border-[#14b8a6]/75"
                  >
                    <option value="44th-ave">📍 44th Ave Flags (LIC)</option>
                    <option value="court-square">📍 Court Square (LIC)</option>
                    <option value="greenpoint">📍 Greenpoint (Brooklyn)</option>
                    <option value="williamsburg">📍 Williamsburg (Brooklyn)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                  Position Desired
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {[
                    { id: "barber", label: "Master Barber" },
                    { id: "junior", label: "Junior Stylist" },
                    { id: "apprentice", label: "Lather Apprentice" },
                    { id: "coordinator", label: "Shop Coordinator" }
                  ].map((pos) => {
                    const isSelected = position === pos.id;
                    return (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setPosition(pos.id)}
                        disabled={loading}
                        className={`py-2 px-3 text-left text-xs rounded-lg border transition-all ${
                          isSelected
                            ? "border-[#14b8a6] bg-[#14b8a6]/5 text-white font-semibold"
                            : "border-zinc-800 hover:border-zinc-700 text-zinc-450 bg-zinc-900/10"
                        }`}
                      >
                        {pos.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                  Brief Bio & Shop Experience
                </label>
                <textarea
                  required
                  rows={3}
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="Tell us about your barber licensing history, style philosophy, and past chairs..."
                  disabled={loading}
                  className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-white placeholder-zinc-650 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={loading}
                className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#14b8a6] py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#2dd4bf] disabled:opacity-50 cursor-pointer shadow-lg shadow-[#14b8a6]/10"
                id="careers-submit-btn"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Submit Application Detail
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
