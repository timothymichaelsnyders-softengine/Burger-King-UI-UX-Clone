import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Gift, Award, Check } from 'lucide-react';

export default function MobileApp() {
  return (
    <section id="mobile-app" className="py-20 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: App promotional details */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#FF4500] font-black tracking-widest uppercase mb-1">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span>MOBILE COMMAND</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Put the Flame Grill <br />
                <span className="text-[#FF4500]">Directly in Your Pocket</span>
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-xl">
                Bypass all waiting cues with the official Royal app. Unlock exclusive daily crown drops, instant delivery mappings, and double loyalty point multipliers on selected weekdays.
              </p>
            </div>

            {/* List of App Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 text-left">
                <span className="text-emerald-500 text-lg bg-green-950/40 w-8 h-8 rounded-lg flex items-center justify-center border border-green-500/10">✓</span>
                <div>
                  <h4 className="font-bold text-xs text-zinc-200">Express Ordering</h4>
                  <p className="text-zinc-550 text-[10px] mt-0.5 leading-snug">Order on the commute, collect seamlessly in-store.</p>
                </div>
              </div>

              <div className="flex gap-3 text-left">
                <span className="text-emerald-500 text-lg bg-green-950/40 w-8 h-8 rounded-lg flex items-center justify-center border border-green-500/10">✓</span>
                <div>
                  <h4 className="font-bold text-xs text-zinc-200">Instant Double points</h4>
                  <p className="text-zinc-550 text-[10px] mt-0.5 leading-snug">Earn rewards 2x faster when downloading via phone.</p>
                </div>
              </div>

              <div className="flex gap-3 text-left">
                <span className="text-emerald-500 text-lg bg-green-950/40 w-8 h-8 rounded-lg flex items-center justify-center border border-green-500/10">✓</span>
                <div>
                  <h4 className="font-bold text-xs text-zinc-200">Mobile Drive-Thru check</h4>
                  <p className="text-zinc-550 text-[10px] mt-0.5 leading-snug">Automatic Bluetooth prompt scans your crown on lane arrival.</p>
                </div>
              </div>

              <div className="flex gap-3 text-left">
                <span className="text-emerald-500 text-lg bg-green-950/40 w-8 h-8 rounded-lg flex items-center justify-center border border-green-500/10">✓</span>
                <div>
                  <h4 className="font-bold text-xs text-zinc-200">Zero Fee Drops</h4>
                  <p className="text-zinc-550 text-[10px] mt-0.5 leading-snug">Exclusive delivery drop codes triggered weekly.</p>
                </div>
              </div>
            </div>

            {/* Application Badges (Mock vectors for maximum conversion compliance) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-left transition-colors cursor-pointer max-w-[170px]" id="appstore-download-btn">
                <Smartphone className="w-6 h-6 text-zinc-400" />
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold leading-none">Download on the</p>
                  <p className="text-xs font-extrabold leading-normal mt-0.5">App Store</p>
                </div>
              </button>

              <button className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-left transition-colors cursor-pointer max-w-[170px]" id="googleplay-download-btn">
                <Smartphone className="w-6 h-6 text-[#FF4500]" />
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold leading-none">Get it on</p>
                  <p className="text-xs font-extrabold leading-normal mt-0.5">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Immersive graphic / Mock mockup viewport */}
          <div className="col-span-1 lg:col-span-5 relative flex justify-center">
            <div className="relative w-64 h-[450px] bg-zinc-950 border-[6px] border-zinc-900 rounded-[35px] shadow-2xl p-1.5 overflow-hidden">
              {/* Camera Notch island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-zinc-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>

              {/* Mock App layout inside */}
              <div className="bg-zinc-950 h-full w-full rounded-[28px] overflow-hidden p-4 relative text-left">
                <div className="flex justify-between items-center mt-3 border-b border-zinc-900 pb-3">
                  <div>
                    <span className="text-[8px] text-zinc-500 uppercase block font-bold leading-none">Welcome Duke</span>
                    <span className="text-xs font-extrabold text-white mt-1 block">Alexander M.</span>
                  </div>
                  <span className="bg-amber-500 text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded font-mono">👑 450 pts</span>
                </div>

                {/* Simulated product drop */}
                <div className="mt-4 bg-zinc-900/60 rounded-xl p-3 border border-zinc-850 relative">
                  <div className="absolute top-2 right-2 bg-red-650 text-white text-[7px] px-1 rounded-sm uppercase tracking-wider font-extrabold">Active Coupon</div>
                  <p className="text-[9px] text-[#FF4500] uppercase font-bold tracking-wider leading-none">CROWN DEAL</p>
                  <h4 className="text-xxs font-extrabold text-white mt-1">BOGO Whoppers Today only</h4>
                  <p className="text-[8px] text-zinc-500 leading-snug mt-1">Order 1 Flame-grilled Whopper, receive the secondary Whopper absolutely free.</p>
                  
                  <button className="w-full bg-[#FF4500] hover:bg-orange-500 text-white rounded-lg py-1.5 mt-3 text-[8px] font-black uppercase tracking-wider">
                    Copy Coupon Code
                  </button>
                </div>

                {/* Static progress panel */}
                <div className="mt-4 py-3 border-t border-zinc-900 space-y-2">
                  <p className="text-[8px] text-zinc-550 uppercase font-black leading-none tracking-wider">Milestone Progress</p>
                  <div className="flex justify-between text-[7px] text-zinc-400">
                    <span>Nuggets (250 pts)</span>
                    <span>100% Secure</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[80%]" />
                  </div>
                </div>

                {/* Visual Bottom bar shortcuts */}
                <div className="absolute bottom-2 left-2 right-2 bg-zinc-900/90 border border-zinc-850 rounded-full py-2 px-3 text-center flex justify-between items-center text-[7px] text-zinc-500 font-bold">
                  <span className="text-amber-500">Menu</span>
                  <span>Cart</span>
                  <span>Rewards</span>
                  <span>Stores</span>
                </div>
              </div>
            </div>

            {/* Glowing sticker badges around phone placeholder */}
            <div className="absolute -bottom-4 right-10 bg-gradient-to-r from-red-600 to-amber-600 border border-red-500/25 max-w-[130px] p-3 rounded-xl shadow-xl rotate-6 text-left">
              <p className="text-[8px] text-white/80 font-bold uppercase leading-none">APP BONUSES</p>
              <h4 className="text-[10px] font-black text-white mt-1 leading-snug">Score a Free Double Burger upon first app setup!</h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
