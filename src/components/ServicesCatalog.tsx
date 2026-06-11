import React, { useState } from "react";
import { SERVICES } from "../data";
import { ServiceItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Scissors, Sparkles, Clipboard, Compass, Clock, Check } from "lucide-react";

interface ServicesCatalogProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesCatalog({ onSelectService }: ServicesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "hair" | "beard" | "combo" | "treatment">("all");
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Offerings", icon: Sparkles },
    { id: "hair", label: "Haircuts", icon: Scissors },
    { id: "beard", label: "Shaves & Beard", icon: Clipboard },
    { id: "combo", label: "Combos", icon: Compass },
    { id: "treatment", label: "Scalp & Facial", icon: Sparkles }
  ];

  const filteredServices = SERVICES.filter(
    (svc) => selectedCategory === "all" || svc.category === selectedCategory
  );

  return (
    <div className="space-y-8" id="services-catalog-container">
      {/* Category selector strip with beautiful badges styling */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3" id="services-categories">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-[#14b8a6] text-black shadow-lg shadow-[#14b8a6]/20 border border-[#2dd4bf]"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
              id={`service-cat-${cat.id}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of services with premium detailing */}
      <div className="grid gap-6 sm:grid-cols-2" id="service-items-grid">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((svc) => {
            return (
              <motion.div
                key={svc.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onMouseEnter={() => setHoveredService(svc.id)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ y: -4, borderColor: "rgba(20, 184, 166, 0.45)" }}
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-c border-zinc-800 bg-zinc-950/40 p-6 transition-all shadow-xl hover:bg-zinc-950/70"
                id={`service-card-${svc.id}`}
              >
                <div>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-serif text-base md:text-lg font-bold text-white tracking-wide group-hover:text-[#14b8a6] transition-colors uppercase">
                      {svc.name}
                    </span>
                    <span className="font-display text-xl font-bold text-[#14b8a6] shrink-0">
                      ${svc.price}
                    </span>
                  </div>

                  {/* Metadata line */}
                  <div className="mt-2.5 flex items-center gap-3 font-mono text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {svc.duration} mins
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                    <span className="uppercase text-[#14b8a6] font-semibold tracking-wider">
                      {svc.category} service
                    </span>
                  </div>

                  {/* Description text */}
                  <p className="mt-3.5 text-xs leading-relaxed text-zinc-400">
                    {svc.description}
                  </p>
                </div>

                {/* Booking Button footer */}
                <div className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-4">
                  <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">
                    Includes consultation and lather wrap
                  </span>
                  
                  <button
                    onClick={() => onSelectService(svc.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-zinc-900 hover:bg-[#14b8a6] hover:text-black hover:font-bold border border-zinc-800 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
                    id={`book-specific-svc-${svc.id}`}
                  >
                    SELECT
                    <Check className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Roster empty feedback */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-zinc-900/10 rounded-xl border border-zinc-800 text-zinc-500 font-mono text-xs">
          No services matching specified parameters discovered in database.
        </div>
      )}
    </div>
  );
}
