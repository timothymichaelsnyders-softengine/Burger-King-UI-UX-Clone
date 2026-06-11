import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-500 text-xs text-left pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-5 space-y-4">
            <span onClick={() => handleScrollTo('hero')} className="cursor-pointer flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF4500] to-[#E5C394] rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#502314] fill-red-650" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-white tracking-widest uppercase">BURGER <span className="text-[#FF4500]">KING</span></span>
                <span className="text-[8px] text-amber-500 font-bold tracking-wider leading-none">FLAME-GRILLED ROYALTY</span>
              </div>
            </span>
            <p className="text-zinc-600 text-xxs leading-relaxed max-w-sm">
              Authentic flame-grilling melts away excessive fat while locking in premium smoke flavors. Satisfy your fast-food burger cravings with zero compromises. 
            </p>
          </div>

          {/* Quick links */}
          <div className="col-span-1 sm:col-span-3 md:col-span-2 space-y-3">
            <h4 className="font-extrabold text-xs text-zinc-200 uppercase tracking-widest font-mono">Eat With Us</h4>
            <div className="space-y-1.5 flex flex-col text-xxs">
              <span onClick={() => handleScrollTo('menu')} className="cursor-pointer hover:text-white transition-colors">Explore Menu</span>
              <span onClick={() => handleScrollTo('burger-builder-section')} className="cursor-pointer hover:text-white transition-colors">Artisan Lab Customizer</span>
              <span onClick={() => handleScrollTo('promotions')} className="cursor-pointer hover:text-white transition-colors">Vouchers Deals</span>
              <span onClick={() => handleScrollTo('loyalty')} className="cursor-pointer hover:text-white transition-colors">Loyalty Rewards</span>
            </div>
          </div>

          {/* Corp / Careers */}
          <div className="col-span-1 sm:col-span-3 md:col-span-2 space-y-3">
            <h4 className="font-extrabold text-xs text-zinc-200 uppercase tracking-widest font-mono">Our Crown</h4>
            <div className="space-y-1.5 flex flex-col text-xxs">
              <span className="hover:text-white cursor-pointer transition-colors">Franchise Program</span>
              <span className="hover:text-white cursor-pointer transition-colors">Sustainabilty Policies</span>
              <span className="hover:text-white cursor-pointer transition-colors">Careers and Internships</span>
              <span className="hover:text-white cursor-pointer transition-colors">BK Cares Foundation</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-xs text-zinc-200 uppercase tracking-widest font-mono">Crown Newsletter</h4>
            <p className="text-[10px] text-zinc-650 leading-relaxed">
              Register your workspace email parameters to secure priority limited-edition voucher codes directly.
            </p>
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden p-1 max-w-xs">
              <input 
                type="email" 
                placeholder="Name.Snyders@gmail.com" 
                className="w-full bg-transparent px-2.5 py-1 text-zinc-300 focus:outline-none text-xxs pr-1"
                id="footer-email-input"
              />
              <button 
                onClick={() => alert('Welcome to the Crown court! Your email parameters are registered.')}
                className="bg-[#FF4500] hover:bg-orange-500 text-white p-1 rounded transition-colors cursor-pointer flex items-center justify-center font-bold"
                id="footer-email-submit"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xxs text-zinc-650">
          <p>© 2026 Burger King Corporation. All Rights Reserved. Crafted for Crown Court Nobles.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy and Cookies Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Accessibility standard 508</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
