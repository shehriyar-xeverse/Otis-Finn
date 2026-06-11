import React, { useState, useEffect } from "react";
import { LOCATIONS } from "../data";
import { BusinessLocation } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Phone, Clock, MapPin, Calendar, ExternalLink } from "lucide-react";

interface LocationDetailsProps {
  filterLocationId?: string;
  onBookLocation: (locationId: string) => void;
}

export default function LocationDetails({ filterLocationId = "", onBookLocation }: LocationDetailsProps) {
  const [selectedLocId, setSelectedLocId] = useState(filterLocationId || "all");

  // Sync state if filter parameter updates from navbar clicks
  useEffect(() => {
    if (filterLocationId) {
      setSelectedLocId(filterLocationId);
    }
  }, [filterLocationId]);

  const filteredLocations = LOCATIONS.filter(
    (loc) => selectedLocId === "all" || loc.id === selectedLocId
  );

  return (
    <div className="space-y-8" id="locations-page-wrap">
      {/* Filters selectors */}
      <div className="flex flex-wrap justify-center gap-2 select-none" id="location-selectors">
        <button
          onClick={() => setSelectedLocId("all")}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap border cursor-pointer ${
            selectedLocId === "all"
              ? "bg-[#14b8a6] text-black border-[#14b8a6] shadow-md shadow-[#14b8a6]/15"
              : "bg-zinc-900/60 text-zinc-400 border-zinc-c border-zinc-800 hover:text-white"
          }`}
          id="btn-filter-all-loc"
        >
          All Outposts
        </button>
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedLocId(loc.id)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap border cursor-pointer ${
              selectedLocId === loc.id
                ? "bg-[#14b8a6] text-black border-[#14b8a6] shadow-md shadow-[#14b8a6]/15"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-c border-zinc-850 hover:text-white"
            }`}
            id={`btn-filter-loc-${loc.id}`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Grid containing Interactive SVG Map on the left / List on the right */}
      <div className="grid gap-8 lg:grid-cols-12" id="locations-map-split">
        {/* LEFT COLUMN: Highly Styled Interactive Map SVG */}
        <div className="lg:col-span-12 xl:col-span-5 h-[380px] xl:h-full min-h-[360px] overflow-hidden rounded-2xl border border-zinc-805 bg-zinc-950 p-6 flex flex-col justify-between shadow-2xl relative">
          <div>
            <span className="font-mono text-[9px] text-[#14b8a6] tracking-widest uppercase bg-[#14b8a6]/10 px-2.5 py-0.5 rounded-full border border-[#14b8a6]/25">
              🗺️ OTIS & FINN METROPOLITAN STATE
            </span>
            <h4 className="font-display text-sm font-bold text-white mt-2.5 uppercase tracking-wide">
              LIC & Brooklyn Waterfront Maps
            </h4>
          </div>

          {/* SVG Map of NYC East River */}
          <div className="flex-1 w-full flex items-center justify-center my-4 relative select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full max-h-[220px] max-w-[220px] text-zinc-700">
              {/* East River Path line */}
              <path
                d="M 10 0 C 12 15, 18 30, 28 45 C 38 60, 48 75, 42 100"
                fill="none"
                stroke="#134e4a"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-40"
              />
              <path
                d="M 10 0 C 12 15, 18 30, 28 45 C 38 60, 48 75, 42 100"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-30"
              />

              {/* Borough Labels */}
              <text x="5" y="25" fill="#52525b" fontSize="6.5" fontWeight="bold" fontFamily="monospace">QUEENS (LIC)</text>
              <text x="48" y="85" fill="#52525b" fontSize="6.5" fontWeight="bold" fontFamily="monospace">BROOKLYN</text>

              {/* Dynamic Coordinate points */}
              {[
                { id: "44th-ave", x: 26, y: 22, name: "44th Ave" },
                { id: "court-square", x: 38, y: 32, name: "Court Square" },
                { id: "greenpoint", x: 32, y: 55, name: "Greenpoint" },
                { id: "williamsburg", x: 39, y: 72, name: "Williamsburg" }
              ].map((pt) => {
                const isActive = selectedLocId === "all" || selectedLocId === pt.id;
                return (
                  <g 
                    key={pt.id} 
                    className="cursor-pointer"
                    onClick={() => setSelectedLocId(pt.id)}
                  >
                    {/* Ring background pulsing */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive ? "7.5" : "5"}
                      fill={isActive ? "#14b8a6" : "#27272a"}
                      fillOpacity={isActive ? "0.22" : "0.5"}
                      className="transition-all duration-1000"
                    />
                    {/* Marker Center */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="2"
                      fill={isActive ? "#2dd4bf" : "#71717a"}
                      className="transition-colors"
                    />
                    {/* Interactive Text */}
                    <text
                      x={pt.x + 4.5}
                      y={pt.y + 1.5}
                      fill={isActive ? "#2dd4bf" : "#a1a1aa"}
                      fontSize={isActive ? "5.5" : "5"}
                      fontWeight={isActive ? "bold" : "normal"}
                      fontFamily="sans-serif"
                    >
                      {pt.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="font-mono text-[9px] text-zinc-500 leading-tight">
            *Tap coordinate indices on waterfront river mapping above to filter individual locations.
          </p>
        </div>

        {/* RIGHT COLUMN: Location Details Card List */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6" id="locations-details-list">
          <AnimatePresence mode="popLayout">
            {filteredLocations.map((loc) => {
              return (
                <motion.div
                  key={loc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-zinc-805 bg-zinc-950 p-6 flex flex-col justify-between shadow-2xl space-y-4"
                  id={`details-card-${loc.id}`}
                >
                  <div className="flex justify-between items-start border-b border-zinc-900 pb-3">
                    <div>
                      <span className="block font-mono text-[9px] text-[#14b8a6] uppercase tracking-widest font-semibold">
                        OTIS & FINN BARBERSHOP
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5 uppercase">
                        {loc.name} OUTPOST
                      </h4>
                    </div>
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[8px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                      Chairs Online
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-350 leading-relaxed">
                    {loc.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 font-mono text-[10.5px] text-zinc-400">
                    <div className="space-y-1 bg-zinc-905/60 p-3 rounded-lg border border-zinc-900">
                      <span className="block text-[8.5px] font-sans font-extrabold text-[#14b8a6] uppercase tracking-wider">
                        Address Landmark
                      </span>
                      <div className="flex items-center gap-2 text-white pt-1">
                        <MapPin className="h-4 w-4 text-[#14b8a6] shrink-0" />
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1.5">
                        <Phone className="h-4 w-4 text-zinc-500 shrink-0" />
                        <span>{loc.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-1 bg-zinc-905/60 p-3 rounded-lg border border-zinc-900">
                      <span className="block text-[8.5px] font-sans font-extrabold text-[#14b8a6] uppercase tracking-wider">
                        Chair Hours
                      </span>
                      <div className="flex items-start gap-2 text-white pt-1">
                        <Clock className="h-4 w-4 text-[#14b8a6] shrink-0 mt-0.5" />
                        <div className="space-y-0.5 text-[10px]">
                          <div>Mon - Fri: {loc.hours.weekdays}</div>
                          <div>Sat: {loc.hours.saturday}</div>
                          <div>Sun: {loc.hours.sunday}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="border-t border-zinc-900 pt-4 flex gap-3 select-none">
                    <button
                      onClick={() => onBookLocation(loc.id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#14b8a6] hover:bg-[#2dd4bf] text-black py-3 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-[#14b8a6]/10 transition-all"
                      id={`book-loc-btn-${loc.id}`}
                    >
                      <Calendar className="h-4 w-4" />
                      Book {loc.name} outpost
                    </button>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-zinc-90 w-fit bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-3 rounded-lg text-xs font-semibold text-white cursor-pointer"
                      title="Google Maps directions"
                    >
                      Directions
                      <ExternalLink className="h-3 w-3 text-[#14b8a6]" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
