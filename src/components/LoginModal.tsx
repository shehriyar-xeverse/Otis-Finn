import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, LogIn, Chrome, Facebook, User, ShieldCheck } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all requested credentials.");
      return;
    }
    if (activeTab === "signup" && !fullName) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);
    // Simulate API authorization
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(email);
        setSuccess(false);
        onClose();
        // Reset states
        setEmail("");
        setPassword("");
        setFullName("");
      }, 1500);
    }, 1500);
  };

  const handleSocialLogin = (platform: "Google" | "Facebook") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(`${platform.toLowerCase()}user@otisfinn.com`);
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
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
            id="login-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-c border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8"
            id="login-modal-box"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 transition-colors hover:text-white cursor-pointer"
              id="close-login-btn"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#14b8a6] uppercase bg-[#14b8a6]/10 px-3 py-1 rounded-full border border-[#14b8a6]/25">
                MEMBER AREA
              </span>
              <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white uppercase">
                {activeTab === "signin" ? "MEMBER SIGN IN" : "CREATE ACCOUNT"}
              </h2>
              <p className="mt-2 text-xs text-zinc-400 leading-normal">
                Unlock custom bookings, order tracking, and dynamic hair formulations.
              </p>
            </div>

            {/* Success Animation Splash */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-955"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  >
                    <ShieldCheck className="h-10 w-10 animate-pulse" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white uppercase">
                    Authorization Granted!
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">Syncing reservation metrics and wallet...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sign in / Sign up selectors */}
            <div className="mt-6 flex border-b border-zinc-850 select-none">
              <button
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                }}
                className={`flex-1 pb-3 text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === "signin"
                    ? "border-b-2 border-[#14b8a6] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                id="login-tab-signin"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`flex-1 pb-3 text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === "signup"
                    ? "border-b-2 border-[#14b8a6] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                id="login-tab-signup"
              >
                Register
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 rounded-lg bg-rose-500/10 p-3 text-xs text-rose-400"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {activeTab === "signup" && (
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                    Full Name
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-650">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Liam Parker"
                      disabled={loading}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pr-4 pl-10 text-xs text-white placeholder-zinc-700 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900"
                      id="signup-fullname-input"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-650">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    disabled={loading}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pr-4 pl-10 text-xs text-white placeholder-zinc-700 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900"
                    id="login-email-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-zinc-450 uppercase">
                  Password
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-650">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pr-4 pl-10 text-xs text-white placeholder-zinc-700 outline-none transition-all focus:border-[#14b8a6]/70 focus:bg-zinc-900"
                    id="login-password-input"
                  />
                </div>
              </div>

              {activeTab === "signin" && (
                <div className="text-right">
                  <a href="#" className="text-[10px] text-[#14b8a6] hover:underline uppercase tracking-wide">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative flex w-full items-center justify-center rounded-lg bg-[#14b8a6] py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#2dd4bf] disabled:opacity-50 cursor-pointer shadow-lg shadow-[#14b8a6]/10"
                id="login-submit-btn"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-3.5 w-3.5" />
                    {activeTab === "signin" ? "Access Member Portal" : "Assemble Account"}
                  </span>
                )}
              </button>
            </form>

            {/* Splitter */}
            <div className="relative my-5 text-center select-none">
              <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-zinc-850" />
              <span className="bg-zinc-950 px-3 text-[9px] tracking-wider text-zinc-500 uppercase">
                Or authorize with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 pb-1">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 py-2 px-2.5 text-xs font-bold text-white transition-all hover:bg-zinc-850 cursor-pointer hover:border-zinc-700"
                id="login-google-btn"
              >
                <Chrome className="h-3.5 w-3.5 text-emerald-400" />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 py-2 px-2.5 text-xs font-bold text-white transition-all hover:bg-zinc-850 cursor-pointer hover:border-zinc-700"
                id="login-facebook-btn"
              >
                <Facebook className="h-3.5 w-3.5 text-blue-500" />
                Facebook
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
