import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Flame, Gift, ShoppingBag } from 'lucide-react';

interface ExitIntentModalProps {
  cartLength: number;
  onApplyCode: (code: string) => void;
  claimedVouchers: string[];
}

export default function ExitIntentModal({ cartLength, onApplyCode, claimedVouchers }: ExitIntentModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [triggeredOnce, setTriggeredOnce] = React.useState(false);

  React.useEffect(() => {
    // Only trigger if cart has items and haven't shown yet and coupon not already applied
    if (cartLength === 0 || triggeredOnce || claimedVouchers.includes('CROWNSAVE')) return;

    // 1. Mouse exit detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 15 && !triggeredOnce) {
        setShowModal(true);
        setTriggeredOnce(true);
      }
    };

    // 2. Idle timeout fallback (15 seconds) to catch mobile users or non-leaving users!
    const idleTimer = setTimeout(() => {
      if (!triggeredOnce) {
        setShowModal(true);
        setTriggeredOnce(true);
      }
    }, 20000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(idleTimer);
    };
  }, [cartLength, triggeredOnce, claimedVouchers]);

  const handleClaimOffer = () => {
    onApplyCode('CROWNSAVE');
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-65 flex items-center justify-center p-4 font-sans">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />

          {/* Prompt card layout */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-sm bg-zinc-90 w-full bg-zinc-900 border-2 border-orange-500/30 rounded-3xl p-6.5 text-center shadow-2xl z-10 overflow-hidden"
            id="exit-intent-modal"
          >
            {/* Visual glow backdrop inside */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,35,0,0.15),transparent_60%)] -z-10" />

            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4.5 right-4.5 text-zinc-500 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
              id="exit-modal-close"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="w-12 h-12 bg-orange-950/45 rounded-2xl flex items-center justify-center mx-auto border border-[#FF4500]/20 mb-4 animate-bounce">
              <Gift className="w-6 h-6 text-[#FF4500] fill-orange-500/10" />
            </div>

            <span className="text-[9px] text-[#FF4500] font-black uppercase tracking-widest block mb-1">WAIT! CROWN FAVOR DETECTED</span>
            <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">Don’t Leave Your Perfect Flame Recipe Behind!</h3>
            <p className="text-zinc-500 text-[10px] leading-relaxed max-w-xs mx-auto mt-2">
              We noticed items lingering on your plate. Complete your purchase right now and claim an immediate <strong>$1.50 off</strong> flat discount.
            </p>

            <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-850 my-6">
              <div className="flex justify-between items-center text-xs">
                <div className="text-left font-mono">
                  <span className="text-[8px] text-zinc-500 block uppercase leading-none font-sans font-bold">Voucher Code</span>
                  <span className="text-amber-500 font-extrabold font-mono tracking-widest">CROWNSAVE</span>
                </div>
                <span className="text-[10px] font-black text-green-400 bg-green-950/40 px-2 py-1 rounded">SAVE $1.50 NOW</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleClaimOffer}
                className="w-full bg-[#FF4500] hover:bg-orange-500 text-white font-extrabold text-xxs uppercase tracking-wider py-3.5 rounded-full shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                id="btn-claim-exit-intent"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Apply Discount and Keep Ordering</span>
              </button>

              <button 
                onClick={() => setShowModal(false)}
                className="text-zinc-500 hover:text-zinc-350 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
              >
                No thank you, I’ll forfeit my $1.50
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
