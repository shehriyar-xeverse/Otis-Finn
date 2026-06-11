import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LOCATIONS, BARBERS, SERVICES } from "../data";
import { 
  Compass, Scissors, User, Calendar, Clock, ChevronRight, 
  ChevronLeft, Award, CheckCircle, RefreshCw, CalendarDays, HelpCircle, ShieldCheck
} from "lucide-react";

interface AppointmentWizardProps {
  initialBarberId?: string;
  initialLocationId?: string;
  onBookingCompleted: () => void;
}

export default function AppointmentsWizard({ 
  initialBarberId = "", 
  initialLocationId = "", 
  onBookingCompleted 
}: AppointmentWizardProps) {
  // Wizard states
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(initialLocationId);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState(initialBarberId);
  
  // Date/Time States
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // Customer details
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial parameters if they change
  useEffect(() => {
    if (initialLocationId) {
      setSelectedLocation(initialLocationId);
      // Automatically advance to core services if location pre-selected
      if (step === 1 && initialLocationId) {
         setStep(2);
      }
    }
    if (initialBarberId) setSelectedBarber(initialBarberId);
  }, [initialBarberId, initialLocationId]);

  // Generate date slots for next 7 days
  const getDates = () => {
    const dates = [];
    const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        isoString: d.toISOString().split("T")[0],
        formatted: d.toLocaleDateString("en-US", options),
        dayNum: d.getDate(),
        dayName: d.toLocaleDateString("en-US", { weekday: "short" })
      });
    }
    return dates;
  };
  const datesRoster = getDates();

  // Set default date if unselected
  useEffect(() => {
    if (!selectedDate && datesRoster.length > 0) {
      setSelectedDate(datesRoster[0].isoString);
    }
  }, [datesRoster, selectedDate]);

  // Pre-configured time slots
  const timeSlots = {
    morning: ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM"],
    afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:15 PM", "04:00 PM", "04:45 PM"],
    evening: ["05:30 PM", "06:15 PM", "07:00 PM", "07:45 PM"]
  };

  // Filter lists based on selections
  const availableBarbers = BARBERS.filter(
    (b) => !selectedLocation || b.locationId === selectedLocation
  );

  const activeLocObj = LOCATIONS.find((l) => l.id === selectedLocation);
  const activeSvcObj = SERVICES.find((s) => s.id === selectedService);
  const activeBarberObj = BARBERS.find((b) => b.id === selectedBarber);

  // Manage Navigations with validation check
  const handleNext = () => {
    setValidationError("");
    if (step === 1 && !selectedLocation) {
      setValidationError("Please select your preferred Otis & Finn barbering outpost location to proceed.");
      return;
    }
    if (step === 2 && !selectedService) {
      setValidationError("Please select a dapper grooming service from our catalog.");
      return;
    }
    if (step === 3 && !selectedBarber) {
      setValidationError("Please select your highly skilled barbering specialist.");
      return;
    }
    if (step === 4 && (!selectedDate || !selectedTime)) {
      setValidationError("Please select both your reservation calendar date and open arrival hour.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setValidationError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!customerName || !customerEmail || !customerPhone) {
      setValidationError("Please complete your full layout contact details to register.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const resetScheduler = () => {
    setStep(1);
    setSelectedLocation("");
    setSelectedService("");
    setSelectedBarber("");
    setSelectedDate(datesRoster[0]?.isoString || "");
    setSelectedTime("");
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setSpecialNotes("");
    setIsSuccess(false);
    if (onBookingCompleted) onBookingCompleted();
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 backdrop-blur-xl md:p-8 relative shadow-2xl overflow-hidden" id="appt-wizard-container">
      {/* Dynamic Animated background ambient light */}
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-[#14b8a6]/5 blur-3xl pointer-events-none" />

      {/* Wizard Progress Stepper */}
      {!isSuccess && (
        <div className="mb-8 flex items-center justify-between" id="steps-indicator-bar">
          {[
            { id: 1, label: "Location", icon: Compass },
            { id: 2, label: "Services", icon: Scissors },
            { id: 3, label: "Barber", icon: User },
            { id: 4, label: "Time", icon: Clock },
            { id: 5, label: "Confirm", icon: CheckCircle }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = step >= item.id;
            const isCurrent = step === item.id;

            return (
              <div key={item.id} className="flex flex-1 flex-col items-center relative">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: isCurrent ? 1.15 : 1,
                      backgroundColor: isCurrent ? "#14b8a6" : isActive ? "#0d9488" : "#18181b",
                      borderColor: isCurrent ? "#2dd4bf" : isActive ? "#14b8a6" : "rgba(39, 39, 42, 0.8)"
                    }}
                    onClick={() => {
                      if (item.id < step) {
                        setStep(item.id);
                        setValidationError("");
                      }
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                      isCurrent 
                        ? "text-black shadow-lg shadow-[#14b8a6]/30" 
                        : isActive 
                        ? "text-white" 
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                </div>
                <span className={`mt-2 hidden text-[10px] tracking-wider uppercase md:block transition-all ${
                  isCurrent ? "font-bold text-[#14b8a6]" : isActive ? "text-zinc-350" : "text-zinc-650"
                }`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* --- ELIMINATE CONFUSION: DYNAMIC STEP SELECTIONS recap HUD --- */}
      {!isSuccess && step > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap items-center gap-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-3 text-xs"
        >
          <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0">Your Selections:</span>
          
          {selectedLocation && (
            <div className="flex items-center gap-1 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-2.5 py-1 text-[11px] text-[#14b8a6]">
              <span>📍 {activeLocObj?.name.replace("BARBERSHOP ", "")}</span>
              <button onClick={() => setStep(1)} className="ml-1 text-[9px] hover:text-white">✕</button>
            </div>
          )}

          {selectedService && step > 2 && (
            <div className="flex items-center gap-1 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-2.5 py-1 text-[11px] text-[#14b8a6]">
              <span>✂️ {activeSvcObj?.name}</span>
              <button onClick={() => setStep(2)} className="ml-1 text-[9px] hover:text-white">✕</button>
            </div>
          )}

          {selectedBarber && step > 3 && (
            <div className="flex items-center gap-1 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-2.5 py-1 text-[11px] text-[#14b8a6]">
              <span>👤 {activeBarberObj?.name}</span>
              <button onClick={() => setStep(3)} className="ml-1 text-[9px] hover:text-white">✕</button>
            </div>
          )}

          {selectedDate && selectedTime && step > 4 && (
            <div className="flex items-center gap-1 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-2.5 py-1 text-[11px] text-[#14b8a6]">
              <span>📅 {selectedTime} on {datesRoster.find(d => d.isoString === selectedDate)?.formatted}</span>
              <button onClick={() => setStep(4)} className="ml-1 text-[9px] hover:text-white">✕</button>
            </div>
          )}
        </motion.div>
      )}

      {/* Error Output alert */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs text-rose-400"
            id="appt-error-alert"
          >
            ⚠️ {validationError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP ANIMATIONS WRAPPER */}
      <div className="min-h-[380px]" id="step-elements-carousel">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* --- SUCCESS CONFIRMATION SCREEN --- */
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 animate-pulse">
                <CheckCircle className="h-10 w-10 animate-bounce" />
              </div>

              <span className="text-xs font-bold tracking-widest text-[#14b8a6] uppercase bg-[#14b8a6]/15 px-3 py-1 rounded-full border border-[#14b8a6]/20">
                Grooming Registered!
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white uppercase">
                YOU ARE BOOKED IN!
              </h3>
              <p className="mt-2.5 max-w-sm text-xs leading-relaxed text-zinc-400">
                A confirmation code voucher has been logged. Your digital entry slot and setup details were dispatched to 
                <strong className="text-white"> {customerEmail}</strong>.
              </p>

              {/* Receipt Summary Grid */}
              <div className="mt-8 w-full max-w-md overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 text-left font-mono text-xs text-zinc-400 space-y-3 shadow-xl">
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">OUTPOST CHAIR</span>
                  <strong className="text-white uppercase">{activeLocObj?.name}</strong>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">SELECTED SERVICE</span>
                  <strong className="text-[#14b8a6] uppercase">{activeSvcObj?.name}</strong>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">EXPERIENCED BARBER</span>
                  <strong className="text-white uppercase">{activeBarberObj?.name}</strong>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">CALENDAR SLOT</span>
                  <strong className="text-white uppercase">
                    {datesRoster.find((d) => d.isoString === selectedDate)?.formatted || selectedDate}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">ARRIVAL HOUR</span>
                  <strong className="text-white">{selectedTime}</strong>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="font-semibold text-white">AMOUNT PAYABLE AT SITE</span>
                  <strong className="text-[#14b8a6] font-bold text-lg">${activeSvcObj?.price}</strong>
                </div>
              </div>

              {/* Reset trigger */}
              <button
                onClick={resetScheduler}
                className="mt-8 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-zinc-800 cursor-pointer hover:border-[#14b8a6]/30 shadow-md"
              >
                <RefreshCw className="h-4 w-4" />
                Book Another Appointment
              </button>
            </motion.div>
          ) : step === 1 ? (
            /* --- STEP 1: LOCATIONS SELECTION --- */
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -25 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-850 pb-3">
                <h4 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                  1. CHOOSE BARBERSHOP OUTPOST
                </h4>
                <p className="text-xs text-zinc-400">
                  Select our legendary flagship chairs across Brooklyn and Queens.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {LOCATIONS.map((loc) => {
                  const isChecked = selectedLocation === loc.id;
                  return (
                    <motion.div
                      key={loc.id}
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`relative cursor-pointer rounded-xl border p-5 transition-all ${
                        isChecked
                          ? "border-[#14b8a6] bg-[#14b8a6]/5 shadow-lg shadow-[#14b8a6]/5"
                          : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/10 hover:bg-zinc-900/30"
                      }`}
                      id={`wizard-loc-card-${loc.id}`}
                    >
                      <div className="flex justify-between">
                        <h5 className="font-sans font-semibold tracking-wide text-white uppercase text-sm">
                          {loc.name}
                        </h5>
                        {isChecked && (
                          <span className="rounded bg-[#14b8a6] px-2 py-0.5 text-[8px] font-bold text-black uppercase tracking-wider">
                            Active Choice
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {loc.description}
                      </p>
                      <div className="mt-4 font-mono text-[10px] text-zinc-500 space-y-1.5 border-t border-zinc-900 pt-3">
                        <div className="text-zinc-450">📍 {loc.address}</div>
                        <div>📞 {loc.phone}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : step === 2 ? (
            /* --- STEP 2: SERVICES CATALOGUE --- */
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -25 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-850 pb-3">
                <h4 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                  2. SELECT GROOMING SERVICE
                </h4>
                <p className="text-xs text-zinc-400">
                  Pick your package. All classic haircuts and treatments include custom hot lather outlines.
                </p>
              </div>

              <div className="grid gap-3 max-h-[380px] overflow-y-auto pr-1">
                {SERVICES.map((svc) => {
                  const isChecked = selectedService === svc.id;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedService(svc.id)}
                      className={`flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all ${
                        isChecked
                          ? "border-[#14b8a6] bg-[#14b8a6]/5"
                          : "border-zinc-800 hover:border-zinc-705 bg-zinc-900/10 hover:bg-zinc-900/30"
                      }`}
                      id={`wizard-svc-card-${svc.id}`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-white uppercase tracking-wide">
                            {svc.name}
                          </h5>
                          <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 font-mono text-[9px] text-zinc-400">
                            ⏱️ {svc.duration} min
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-zinc-400 leading-normal">
                          {svc.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block font-display text-base font-bold text-[#14b8a6]">
                          ${svc.price}
                        </span>
                        {isChecked && (
                          <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : step === 3 ? (
            /* --- STEP 3: BARBER SELECTION --- */
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -25 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-850 pb-3">
                <h4 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                  3. CHOOSE YOUR CHAIR / BARBER
                </h4>
                <p className="text-xs text-zinc-400">
                  Showing experienced specialists assigned to Otis & Finn {activeLocObj?.name || "your selected outpost"}.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 max-h-[380px] overflow-y-auto pr-1">
                {availableBarbers.map((barber) => {
                  const isChecked = selectedBarber === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber.id)}
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3.5 transition-all ${
                        isChecked
                          ? "border-[#14b8a6] bg-[#14b8a6]/5"
                          : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/10 hover:bg-zinc-900/30"
                      }`}
                      id={`wizard-barber-card-${barber.id}`}
                    >
                      <img
                        src={barber.image}
                        alt={barber.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-lg object-cover grayscale brightness-90 contrast-110 hover:grayscale-0 transition-all border border-zinc-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-white text-xs truncate uppercase tracking-wider">
                          {barber.name}
                        </h5>
                        <p className="text-[10px] text-[#14b8a6] font-mono tracking-widest uppercase mt-0.5">
                          {barber.role}
                        </p>
                        <div className="mt-1 flex gap-1 flex-wrap">
                          {barber.specialties?.slice(0, 2).map((x) => (
                            <span key={x} className="bg-zinc-905 border border-zinc-800 rounded px-1.5 py-0.5 text-[8px] text-zinc-400 scale-95 origin-left">
                              {x}
                            </span>
                          ))}
                        </div>
                      </div>
                      {isChecked && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#14b8a6] shrink-0 mr-1 shadow-md shadow-[#14b8a6]/45" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : step === 4 ? (
            /* --- STEP 4: DATE AND TIME GRID --- */
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -25 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-850 pb-3">
                <h4 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                  4. CHOOSE RESERVATION TIME
                </h4>
                <p className="text-xs text-zinc-400">
                  Select your appointment date with {activeBarberObj?.name} and verify open arrival hours.
                </p>
              </div>

              {/* Responsive date strip */}
              <div>
                <span className="block text-[9px] font-bold tracking-wider text-zinc-500 uppercase mb-2">
                  1. Choose Calendar Date
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                  {datesRoster.map((item) => {
                    const isChecked = selectedDate === item.isoString;
                    return (
                      <div
                        key={item.isoString}
                        onClick={() => setSelectedDate(item.isoString)}
                        className={`mini-date-card snap-center flex flex-col items-center justify-center min-w-[70px] py-2.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? "border-[#14b8a6] bg-[#14b8a6] text-black font-bold scale-105"
                            : "border-zinc-800 hover:border-zinc-700 text-zinc-400 bg-zinc-900/10"
                        }`}
                        id={`wizard-date-${item.isoString}`}
                      >
                        <span className="text-[9px] uppercase tracking-wider font-semibold">{item.dayName}</span>
                        <span className="text-base font-display mt-0.5">{item.dayNum}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time slots scheduler */}
              <div className="space-y-4 pt-2">
                <div>
                  <span className="block text-[9px] font-bold tracking-wider text-zinc-500 uppercase mb-2">
                    2. Select Open Arrival Hour
                  </span>
                  
                  <div className="space-y-3">
                    {/* Morning */}
                    <div>
                      <span className="text-[9px] font-mono text-[#14b8a6] bg-[#14b8a6]/5 px-2 py-0.5 rounded border border-[#14b8a6]/25 font-semibold">AM - Morning Shift</span>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {timeSlots.morning.map((slot) => {
                          const isSel = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 text-[10px] rounded transition-all font-mono border ${
                                isSel 
                                  ? "bg-[#14b8a6]/20 border-[#14b8a6] text-white font-bold" 
                                  : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 text-[#cbd5e1]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div className="pt-1">
                      <span className="text-[9px] font-mono text-[#14b8a6] bg-[#14b8a6]/5 px-2 py-0.5 rounded border border-[#14b8a6]/25 font-semibold">PM - Afternoon Shift</span>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {timeSlots.afternoon.map((slot) => {
                          const isSel = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 text-[10px] rounded transition-all font-mono border ${
                                isSel 
                                  ? "bg-[#14b8a6]/20 border-[#14b8a6] text-white font-bold" 
                                  : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 text-[#cbd5e1]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Evening */}
                    <div className="pt-1">
                      <span className="text-[9px] font-mono text-[#14b8a6] bg-[#14b8a6]/5 px-2 py-0.5 rounded border border-[#14b8a6]/25 font-semibold">PM - Evening Shift</span>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {timeSlots.evening.map((slot) => {
                          const isSel = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 text-[10px] rounded transition-all font-mono border ${
                                isSel 
                                  ? "bg-[#14b8a6]/20 border-[#14b8a6] text-white font-bold" 
                                  : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 text-[#cbd5e1]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- STEP 5: PERSONAL DETAILS & BOOKING CONFIRMATION --- */
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -25 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-850 pb-2">
                <h4 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                  5. RESERVATION CONFIRMATION
                </h4>
                <p className="text-xs text-zinc-400">
                  Verify contact info details below and register your dapper session.
                </p>
              </div>

              {/* Side by side overview split grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Form Inputs */}
                <form id="booking-confirmation-form" onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johnathan Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/30 p-2.5 text-xs text-white focus:border-[#14b8a6]/60 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@domain.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/30 p-2.5 text-xs text-white focus:border-[#14b8a6]/60 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                      Mobile Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/30 p-2.5 text-xs text-white focus:border-[#14b8a6]/60 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                      Styling Notes / Beard Details (Optional)
                    </label>
                    <textarea
                      placeholder="Write specifications regarding beard properties, preferred blade lines, or trim lengths..."
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/30 p-2.5 text-xs text-white focus:border-[#14b8a6]/60 outline-none resize-none"
                    />
                  </div>

                  <button type="submit" className="hidden" id="submit-booking-hidden-trigger" />
                </form>

                {/* Dynamic Summary Bill Ticket */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-5 space-y-4">
                  <h5 className="font-mono text-[9px] font-bold tracking-widest text-[#14b8a6] uppercase border-b border-zinc-850 pb-2">
                    RESERVATIONS SUMMARY
                  </h5>
                  
                  <div className="font-sans text-xs space-y-4">
                    <div>
                      <span className="block text-[9px] font-semibold text-zinc-500 tracking-wider uppercase">OUTPOST</span>
                      <span className="text-white text-xs font-bold uppercase">{activeLocObj?.name}</span>
                      <span className="block text-[10px] text-zinc-400 truncate mt-0.5">{activeLocObj?.address}</span>
                    </div>

                    <div>
                      <span className="block text-[9px] font-semibold text-zinc-500 tracking-wider uppercase">GROOMING OPTION</span>
                      <span className="text-[#14b8a6] text-xs font-bold uppercase">{activeSvcObj?.name}</span>
                      <span className="block text-[10px] text-zinc-400 mt-0.5">{activeSvcObj?.duration} Minute Session</span>
                    </div>

                    <div className="flex items-center gap-3 bg-zinc-900/30 border border-zinc-800/80 p-2.5 rounded-lg">
                      <img src={activeBarberObj?.image} alt="" className="h-9 w-9 rounded object-cover border border-zinc-800" />
                      <div>
                        <span className="block text-[8px] font-semibold text-zinc-500 tracking-wider uppercase">RESERVED CHAIR</span>
                        <span className="text-white text-xs font-bold uppercase">{activeBarberObj?.name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="block text-[8px] font-semibold text-zinc-500 tracking-wider uppercase">DATE</span>
                        <span className="text-white text-xs font-mono">
                          {datesRoster.find((d) => d.isoString === selectedDate)?.formatted || selectedDate}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-semibold text-zinc-500 tracking-wider uppercase">HOURS</span>
                        <span className="text-white text-xs font-mono">{selectedTime}</span>
                      </div>
                    </div>

                    <div className="border-t border-zinc-850 pt-3 flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-white uppercase">BILL TOTAL</span>
                      <strong className="text-[#14b8a6] font-display text-xl font-bold">${activeSvcObj?.price}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER WIZARD CONTROLS */}
      {!isSuccess && (
        <div className="mt-8 flex justify-between border-t border-zinc-850 pt-5" id="wizard-navigation-buttons">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-1 hover:gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 transition-all hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            id="wizard-back-btn"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {step === 5 ? (
            <button
              onClick={() => {
                const btn = document.getElementById("submit-booking-hidden-trigger");
                if (btn) btn.click();
              }}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#14b8a6] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#2dd4bf] cursor-pointer shadow-lg shadow-[#14b8a6]/10"
              id="wizard-complete-booking-btn"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <>
                  Confirm Booking (${activeSvcObj?.price})
                  <CheckCircle className="h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 hover:gap-2.5 rounded-lg bg-[#14b8a6] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#2dd4bf] cursor-pointer"
              id="wizard-next-btn"
            >
              Continue Step
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
