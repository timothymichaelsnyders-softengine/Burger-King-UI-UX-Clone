import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Award, Clock, Check, Copy } from 'lucide-react';
import { Promotion } from '../types';

interface PromoSectionProps {
  promotions: Promotion[];
  onClaimVoucher: (discountCode: string) => void;
  claimedVouchers: string[];
}

export default function PromoSection({ promotions, onClaimVoucher, claimedVouchers }: PromoSectionProps) {
  // Timer state
  const [timeLeft, setTimeLeft] = React.useState(3600); // 1 hour countdown
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (promo: Promotion) => {
    onClaimVoucher(promo.code);
    setCopiedId(promo.id);
    navigator.clipboard.writeText(promo.code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="promotions" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-red-950/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header panel with dynamic flash timer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FF4500] font-black tracking-widest uppercase mb-1">
              <Award className="w-4 h-4 text-orange-500" />
              <span>CROWN MOUNT OFFERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Royal Vouchers & <span className="text-[#FF4500]">Limited Drops</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-lg">
              Unlock maximum value! Active coupon codes built strictly to satisfy serious flame cravings. Click to claim and copy directly.
            </p>
          </div>

          {/* Flash Deal countdown indicator */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-950/40 p-2.5 rounded-xl border border-red-500/20 text-[#FF4500]">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[9px] text-zinc-500 uppercase font-bold block leading-none">Flash Drop Timer</span>
                <span className="text-xs text-white font-extrabold block mt-0.5">Expires soon!</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xl sm:text-2xl font-black text-[#FF4500] tracking-widest">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Voucher Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="vouchers-grid">
          {promotions.map((promo, idx) => {
            const isClaimed = claimedVouchers.includes(promo.code);
            const isCopyingNow = copiedId === promo.id;

            return (
              <motion.div
                key={promo.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-zinc-900 border rounded-2xl overflow-hidden p-6 relative flex flex-col justify-between ${
                  isClaimed 
                    ? 'border-green-500/20 bg-zinc-900/40' 
                    : 'border-zinc-800 hover:border-orange-500/20'
                }`}
                id={`voucher-card-${promo.id}`}
              >
                {/* Visual side band background accent */}
                <div className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl ${promo.bgGradient} opacity-10 blur-xl rounded-full`} />

                <div>
                  {/* Top indicators */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-zinc-950 text-amber-500 text-[9px] font-black uppercase px-2.5 py-1 rounded border border-zinc-800 tracking-wider">
                      {promo.badge}
                    </span>
                    
                    <span className="text-xs font-black text-[#FF4500] font-mono">
                      {promo.discountValue}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-extrabold text-white leading-tight mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                    {promo.description}
                  </p>
                </div>

                {/* Claim action panel */}
                <div className="space-y-4">
                  {/* Urgent indicator scarcity */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span>Used 184 times today</span>
                    </span>
                    <span className="text-[#FF4500] font-bold">Only {15 - idx * 3} left!</span>
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() => handleCopy(promo)}
                    className={`w-full py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                      isClaimed
                        ? 'bg-gradient-to-r from-emerald-950/60 to-emerald-900/60 text-green-400 border border-green-500/20'
                        : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-855'
                    }`}
                    id={`btn-claim-voucher-${promo.id}`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4 text-green-400 stroke-[3]" />
                        <span>Code Applied in Checkout ({promo.code})</span>
                      </>
                    ) : isCopyingNow ? (
                      <>
                        <Check className="w-4 h-4 text-[#FF4500]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-500" />
                        <span>Claim & Copy: {promo.code}</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic promotional prompt */}
        <div className="mt-10 bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl bg-zinc-950 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800">
              🎁
            </span>
            <div>
              <p className="text-white font-extrabold text-xs">Mystery Crown drop coming soon!</p>
              <p className="text-zinc-500 text-[10px] sm:text-xs">Register your phone to retrieve SMS-exclusive discount menus.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('loyalty');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-zinc-800 hover:bg-zinc-750 text-white rounded-full px-5 py-2.5 text-xs font-bold whitespace-nowrap"
          >
            Join Royal Loyalty
          </button>
        </div>

      </div>
    </section>
  );
}
