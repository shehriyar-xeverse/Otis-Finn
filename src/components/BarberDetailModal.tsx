import { motion, AnimatePresence } from "motion/react";
import { Barber } from "../types";
import { X, Calendar, Star, Scissors, Award, Compass } from "lucide-react";

interface BarberDetailModalProps {
  barber: Barber | null;
  onClose: () => void;
  onBookBarber: (barberId: string, locationId: string) => void;
}

export default function BarberDetailModal({ barber, onClose, onBookBarber }: BarberDetailModalProps) {
  if (!barber) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          id="barber-back-overlay"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative grid w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-805 bg-zinc-950 shadow-2xl md:grid-cols-12"
          id="barber-detail-box"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black border border-zinc-800"
            id="close-barber-details"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Picture / Left col */}
          <div className="relative h-64 md:col-span-5 md:h-full">
            <img
              src={barber.image}
              alt={barber.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top filter contrast-[1.05]"
            />
            {/* Visual gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950" />
            
            {/* Overlay indicators */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 md:hidden">
              <span className="rounded bg-[#14b8a6]/10 px-2 py-0.5 text-[10px] tracking-wide text-[#14b8a6] uppercase backdrop-blur-sm border border-[#14b8a6]/20">
                {barber.role}
              </span>
            </div>
          </div>

          {/* Details / Right col */}
          <div className="flex flex-col p-6 md:col-span-12 md:p-8" style={{ gridColumn: 'span 7' }}>
            <span className="hidden text-xs font-bold tracking-widest text-[#14b8a6] uppercase md:block bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-2.5 py-0.5 w-fit rounded">
              {barber.role}
            </span>

            <h2 className="mt-2.5 font-serif text-2xl md:text-3.5xl font-bold tracking-normal text-white uppercase">
              {barber.name}
            </h2>

            {/* Rating / Specialties */}
            <div className="mt-3.5 flex items-center gap-4 border-b border-zinc-900 pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-1 text-[#14b8a6] font-bold">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{barber.rating || 4.9} rating</span>
              </div>
              <div className="h-3 w-px bg-zinc-850" />
              <div className="flex items-center gap-1.5 text-zinc-350">
                <Compass className="h-3.5 w-3.5 text-[#14b8a6]" />
                <span className="uppercase">
                  {barber.locationId === "44th-ave"
                    ? "44th Ave (LIC)"
                    : barber.locationId === "court-square"
                    ? "Court Square (LIC)"
                    : barber.locationId === "williamsburg"
                    ? "Williamsburg (Brooklyn)"
                    : "Greenpoint (Brooklyn)"}
                </span>
              </div>
            </div>

            {/* Bio Introduction */}
            <div className="mt-4 flex-1">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                Biography & Experience
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                {barber.introduction}
              </p>

              {/* Specialties */}
              {barber.specialties && (
                <div className="mt-5">
                  <h4 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Signature Specialties
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {barber.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="flex items-center gap-1 rounded bg-zinc-901 px-2.5 py-1 text-xs text-zinc-350 border border-zinc-850 font-mono"
                      >
                        <Scissors className="h-3 w-3 text-[#14b8a6]" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA action panel */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => onBookBarber(barber.id, barber.locationId)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14b8a6] py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#2dd4bf] cursor-pointer shadow-lg shadow-[#14b8a6]/10"
                id={`book-with-${barber.id}`}
              >
                <Calendar className="h-4 w-4" />
                Book Appointment Session
              </button>
              <p className="text-center font-mono text-[9px] text-zinc-500">
                Cancellation or reschedule up to 2 hours prior to reservation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
