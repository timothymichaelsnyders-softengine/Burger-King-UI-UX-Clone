import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Award, ChevronDown, Check, Compass } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onQuickOrderWhopper: () => void;
  onOpenBurgerBuilder: () => void;
}

export default function Hero({ onQuickOrderWhopper, onOpenBurgerBuilder }: HeroProps) {
  // Smooth scroll
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] bg-zinc-950 flex items-center justify-center pt-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(214,35,0,0.12),transparent_60%)]" />

      {/* Floating Sparkles & Ash Particle animation using pure tailwind and CSS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-orange-500 rounded-full blur-[1px] animate-pulse opacity-70" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-500 rounded-full blur-[2px] animate-bounce opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-orange-600 rounded-full blur-[4px] opacity-40 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="col-span-1 lg:col-span-7 text-left space-y-6">
            
            {/* LTO Ribbon Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-orange-950/60 border border-orange-500/30 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold shadow-md pr-5"
            >
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>THE FLAME-GRILLED REVOLUTION HAS LANDED</span>
            </motion.div>

            {/* Main Punchy Typography Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-extrabold text-5xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-none"
            >
              CRAVING <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#FF4500] to-yellow-500">
                FLAME-GRILLED
              </span> <br />
              MAJESTY?
            </motion.h1>

            {/* Exquisite descriptor */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl"
            >
              For over 60 years, we’ve stoked real flames to sear premium, 100% savory beef patties. No cheats, no heavy fryers. Experience the authentic, juicy flavor profile that turned simple diners into loyal subjects.
            </motion.p>

            {/* Micro proof badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 max-w-lg pt-2 text-xs"
            >
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl flex flex-col items-start gap-1">
                <span className="text-amber-500 font-bold font-mono">100% Beef</span>
                <span className="text-[10px] text-zinc-500">Zero fillers or soy</span>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl flex flex-col items-start gap-1">
                <span className="text-orange-500 font-bold font-mono">Real Smoke</span>
                <span className="text-[10px] text-zinc-500">Continuous flame grill</span>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl flex flex-col items-start gap-1">
                <span className="text-red-500 font-bold font-mono">Crown Rewards</span>
                <span className="text-[10px] text-zinc-500">10pts back per $1</span>
              </div>
            </motion.div>

            {/* Clear high-converting CTA Group */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
              id="hero-cta-group"
            >
              <button 
                onClick={onQuickOrderWhopper}
                className="bg-gradient-to-r from-red-600 to-[#FF4500] hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-full shadow-2xl hover:shadow-orange-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-btn-order-now"
              >
                <span>Order Now (Save $2)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>

              <button 
                onClick={onOpenBurgerBuilder}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-amber-500 hover:text-amber-400 font-extrabold text-xs uppercase tracking-widest px-7 py-4.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                id="hero-btn-build-burger"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Flame className="w-4.5 h-4.5 text-orange-500 fill-orange-500 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Build custom burger</span>
                </span>
                <span className="absolute inset-0 bg-amber-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-350" />
              </button>
            </motion.div>

            {/* Quick Delivery/Carryout Status indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-zinc-500"
            >
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-500" />
                <span>10-Min Fast Carryout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-500" />
                <span>Zero Contact Delivery Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-500" />
                <span>Drive-Thru Lane Fast-Check</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Media Panel: Immersive food setup with premium floating ingredients! */}
          <div className="col-span-1 lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient backing circle glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-600/20 to-[#FF4500]/10 blur-[80px] -z-10" />

            <div className="relative w-full max-w-[400px]">
              
              {/* Animated Floating Ingredients overlay (Bun, lettuce, cheese, beef, pickle) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Floating Sesame seed bun */}
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute -top-6 left-1/4 bg-amber-100/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-xl flex items-center gap-1.5"
                >
                  <span>🥯 Sesam Bun</span> <span className="text-amber-400">Toasted</span>
                </motion.div>

                {/* Floating Fresh crisp lettuce */}
                <motion.div 
                  animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="absolute top-[40%] -left-8 bg-green-950/80 border border-green-500/20 px-2 py-1 rounded-lg text-[10px] font-bold text-green-400 shadow-xl flex items-center gap-1.5"
                >
                  <span>🥬 Lettuce</span> <span className="text-[8px] uppercase bg-green-500 text-black px-1 rounded">Crisp</span>
                </motion.div>

                {/* Floating cheddar */}
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-16 -right-6 bg-amber-950/80 border border-amber-500/25 px-2 py-1 rounded-lg text-[10px] font-bold text-amber-400 shadow-xl flex items-center gap-1.5"
                >
                  <span>🧀 Cheddar</span> <span className="text-[8px] bg-red-600 text-white px-1 rounded">Melted</span>
                </motion.div>
              </div>

              {/* Central Premium Whopper Burger Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 60, delay: 0.3 }}
                className="relative cursor-pointer group"
                onClick={onQuickOrderWhopper}
              >
                {/* Crown crown sticker on top of burger */}
                <div className="absolute -top-4 -right-2 z-20 bg-yellow-400 text-[#502314] font-black text-xs px-3 py-1.5 rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-200 border-2 border-zinc-950">
                  👑 FREE COKE
                </div>

                <div className="relative rounded-full p-4 overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl">
                  
                  {/* Subtle inner flame gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  <img 
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600" 
                    alt="Flame-Grilled Burger" 
                    referrerPolicy="no-referrer"
                    className="w-full object-cover aspect-square rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Fast Checkout banner overlay */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 bg-zinc-900/95 border border-zinc-800 text-center py-2 px-3 rounded-full shadow-xl text-xs flex items-center justify-between pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-zinc-400">Flame-Grilled Whopper®</span>
                  <span className="font-extrabold text-amber-500">$6.99</span>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Floating Crown Anchor scroll selector */}
        <div className="pt-8 flex justify-center">
          <button 
            onClick={() => scrollTo('menu')} 
            className="text-zinc-500 hover:text-white flex flex-col items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <span>DISCOVER THE CROWN MENU</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-5 h-5 text-[#FF4500]" />
            </motion.div>
          </button>
        </div>

      </div>
    </section>
  );
}
