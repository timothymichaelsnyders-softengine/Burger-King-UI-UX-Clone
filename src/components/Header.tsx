import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MapPin, Award, Flame, Menu, X, ChevronDown, Check } from 'lucide-react';
import { Store, CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  vouchersClaimed: number;
  points: number;
  activeStore: Store;
  onOpenCart: () => void;
  onOpenStoreLocator: () => void;
  onOpenLoyaltyHub: () => void;
  onOpenBurgerBuilder: () => void;
  onSelectStore: (store: Store) => void;
  stores: Store[];
}

export default function Header({
  cart,
  vouchersClaimed,
  points,
  activeStore,
  onOpenCart,
  onOpenStoreLocator,
  onOpenLoyaltyHub,
  onOpenBurgerBuilder,
  onSelectStore,
  stores
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = React.useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.customizedPrice * item.quantity), 0);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dynamic Order alert strip */}
      <div className="bg-gradient-to-r from-red-700 via-[#FF4500] to-amber-600 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 overflow-hidden">
        <motion.span 
          animate={{ scale: [1, 1.08, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-white text-red-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-sm"
        >
          <Flame className="w-3 h-3 fill-amber-500 stroke-red-600" /> Crown Offer
        </motion.span>
        <span>Spend $15+ and score zero-fee delivery! Use code <span className="underline font-bold font-mono">FREESHIP</span></span>
      </div>

      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Branding Logo */}
            <div className="flex items-center gap-8">
              <span 
                onClick={() => scrollTo('hero')} 
                className="cursor-pointer flex items-center gap-2.5 group"
                id="header-brand-logo"
              >
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#FF4500] to-[#E5C394] rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Flame className="w-7 h-7 text-[#502314] fill-red-600 stroke-amber-500 stroke-2" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-yellow-400 rounded-full blur-[2px] opacity-80" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-xl tracking-tight leading-none text-white">
                    BURGER <span className="text-[#FF4500]">KING</span>
                  </span>
                  <span className="text-[10px] text-amber-500 font-mono font-bold tracking-wider leading-none uppercase">
                    Flame-Grilled Royalty
                  </span>
                </div>
              </span>

              {/* Desktop Nav links */}
              <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-zinc-300">
                <span onClick={() => scrollTo('menu')} className="cursor-pointer hover:text-white transition-colors duration-200">Offers Menu</span>
                <span onClick={onOpenBurgerBuilder} className="cursor-pointer text-amber-400 hover:text-amber-300 transition-colors duration-200 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" /> Custom Builder
                </span>
                <span onClick={() => scrollTo('promotions')} className="cursor-pointer hover:text-white transition-colors duration-200">Royal Vouchers</span>
                <span onClick={() => scrollTo('loyalty')} className="cursor-pointer hover:text-white transition-colors duration-200">Rewards Status</span>
                <span onClick={() => scrollTo('story')} className="cursor-pointer hover:text-white transition-colors duration-200">Our Heritage</span>
              </nav>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              {/* Active Crown Store Selector with custom dropdown */}
              <div className="relative hidden lg:block">
                <button 
                  onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-medium cursor-pointer transition-all duration-200 group text-zinc-300 hover:text-white"
                  title="Your Active Crown Store Location"
                  id="btn-store-dropdown"
                >
                  <MapPin className="w-4 h-4 text-[#FF4500] animate-bounce" />
                  <div className="text-left max-w-[150px] truncate">
                    <div className="text-[10px] text-zinc-500 uppercase leading-none font-bold">Your Kitchen</div>
                    <div className="font-semibold text-zinc-200 leading-normal truncate">{activeStore.name}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-500" />
                </button>

                <AnimatePresence>
                  {storeDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setStoreDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2.5 w-72 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl p-2 z-20 text-left"
                      >
                        <div className="px-3 py-2 border-b border-zinc-800">
                          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Switch Pickup Store</p>
                          <p className="text-xs text-zinc-400">Order gets routed directly to this local grill.</p>
                        </div>
                        <div className="py-1 max-h-60 overflow-y-auto">
                          {stores.map((st) => (
                            <button
                              key={st.id}
                              onClick={() => {
                                onSelectStore(st);
                                setStoreDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors ${activeStore.id === st.id ? 'bg-orange-950/40 text-amber-400 font-semibold border-l-2 border-[#FF4500]' : 'text-zinc-300 hover:bg-zinc-800'}`}
                            >
                              <div>
                                <p className="font-semibold">{st.name}</p>
                                <p className="text-[10px] text-zinc-500 truncate max-w-[200px]">{st.address}</p>
                              </div>
                              {activeStore.id === st.id && <Check className="w-4 h-4 text-[#FF4500]" />}
                            </button>
                          ))}
                        </div>
                        <div className="p-2 border-t border-zinc-800">
                          <button 
                            onClick={() => {
                              setStoreDropdownOpen(false);
                              onOpenStoreLocator();
                            }}
                            className="w-full text-center bg-zinc-800 hover:bg-orange-600 hover:text-white text-zinc-300 font-bold rounded-lg py-2 text-xs transition-colors"
                          >
                            Browse All Stores
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Loyalty Reward point counters */}
              <button 
                onClick={onOpenLoyaltyHub}
                className="bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-2 flex items-center gap-2 cursor-pointer hover:border-amber-500/50 transition-all text-xs"
                title="Your Royal Rewards Points Balance"
                id="header-btn-loyalty"
              >
                <Award className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" />
                <div className="hidden sm:block text-left">
                  <div className="text-[9px] text-zinc-500 uppercase leading-none font-bold">Crown Score</div>
                  <div className="font-extrabold text-amber-500 leading-normal">{points} pts</div>
                </div>
              </button>

              {/* Floating micro-glow Cart Trigger */}
              <button 
                onClick={onOpenCart} 
                className="bg-gradient-to-r from-red-600 to-[#FF4500] hover:from-red-500 hover:to-orange-500 text-white rounded-full p-2.5 sm:px-4 sm:py-2 flex items-center gap-2.5 font-bold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/10 active:scale-95 group relative"
                id="header-btn-cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider">My Plate</span>
                
                {/* Badge count animation */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div 
                      key={cartCount}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[10px] font-black w-5.5 h-5.5 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu trigger */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-zinc-400 hover:text-white"
                aria-label="Toggle menu"
                id="header-btn-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-zinc-900 border-t border-zinc-800 text-left overflow-hidden shadow-2xl"
            >
              <div className="px-5 py-4 space-y-3 font-semibold text-zinc-300 text-sm">
                <span 
                  onClick={() => scrollTo('menu')} 
                  className="block py-2 border-b border-zinc-800 hover:text-white cursor-pointer"
                >
                  Explore Flame-Grilled Menu
                </span>
                <span 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBurgerBuilder();
                  }} 
                  className="block py-2 border-b border-zinc-800 text-amber-400 hover:text-amber-350 cursor-pointer flex items-center gap-2"
                >
                  <Flame className="w-4.5 h-4.5 text-orange-500 fill-orange-500" /> Custom Burger Builder
                </span>
                <span 
                  onClick={() => scrollTo('promotions')} 
                  className="block py-2 border-b border-zinc-800 hover:text-white cursor-pointer"
                >
                  Limited Vouchers Deals
                </span>
                <span 
                  onClick={() => scrollTo('loyalty')} 
                  className="block py-2 border-b border-zinc-800 hover:text-white cursor-pointer"
                >
                  Crown Rewards Status
                </span>
                <span 
                  onClick={() => scrollTo('story')} 
                  className="block py-2 border-b border-zinc-800 hover:text-white cursor-pointer"
                >
                  Whopper Heritage Story
                </span>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStoreLocator();
                  }}
                  className="w-full text-center bg-zinc-800 text-white rounded-lg py-2 text-xs flex items-center justify-center gap-2 mt-4"
                >
                  <MapPin className="w-4 h-4 text-[#FF4500]" />
                  <span>Your Store: {activeStore.name}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sticky desktop order bar */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-30 bg-zinc-950/95 border border-zinc-800 rounded-full px-5 py-3 shadow-2xl items-center gap-4 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div className="text-left text-xs">
            <p className="text-zinc-500 font-bold uppercase leading-none text-[8px]">Active Kitchen</p>
            <p className="text-zinc-200 font-semibold">{activeStore.name}</p>
          </div>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
        <div className="text-left text-xs">
          <p className="text-zinc-500 font-bold uppercase leading-none text-[8px]">Plate Size</p>
          <p className="text-amber-500 font-bold">{cartCount} items</p>
        </div>
        <button 
          onClick={onOpenCart} 
          className="bg-zinc-100 hover:bg-orange-500 text-black hover:text-white font-extrabold uppercase text-[10px] tracking-widest px-4 py-2 rounded-full cursor-pointer transition-colors"
          id="sticky-bar-checkout"
        >
          Check out ({cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : 'Empty'})
        </button>
      </div>

      {/* Mobile Sticky Order Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-30 shadow-2xl">
        <button 
          onClick={onOpenCart} 
          className="bg-red-600 hover:bg-red-500 text-white font-extrabold uppercase rounded-full px-4 py-3 flex items-center gap-2 text-xs cursor-pointer shadow-lg active:scale-95 border border-red-500/50"
          id="sticky-mobile-order-btn"
        >
          <ShoppingBag className="w-4.5 h-4.5" />
          <span>Plate: ${cartTotal.toFixed(2)}</span>
          <span className="bg-white text-red-600 rounded-full px-1.5 py-0.5 font-sans font-black text-[9px]">{cartCount}</span>
        </button>
      </div>
    </>
  );
}
