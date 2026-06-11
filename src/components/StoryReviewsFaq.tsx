import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Star, ShieldCheck, ChevronDown, ChevronUp, Clock, Compass, HelpCircle } from 'lucide-react';
import { Review, FAQItem } from '../types';

interface StoryReviewsFaqProps {
  reviews: Review[];
  faqs: FAQItem[];
}

export default function StoryReviewsFaq({ reviews, faqs }: StoryReviewsFaqProps) {
  const [activeFaqIdx, setActiveFaqIdx] = React.useState<number | null>(null);
  const [reviewsIndex, setReviewsIndex] = React.useState(0);

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-zinc-950 font-sans">
      
      {/* 1. BRAND STORY SECTION */}
      <section id="story" className="py-20 border-t border-zinc-900 relative">
        <div className="absolute top-1/2 left-0 w-84 h-84 rounded-full bg-orange-950/5 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual story collage */}
            <div className="col-span-1 lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=400" 
                  alt="Smoky barbecue beef" 
                  referrerPolicy="no-referrer"
                  className="rounded-2xl object-cover w-full aspect-[3/4] shadow-md hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-2xl text-left">
                  <p className="text-[#FF4500] text-xl font-mono font-black border-b border-zinc-800 pb-1.5 mb-1.5 leading-none">Est. 1954</p>
                  <p className="text-[10px] text-zinc-500 leading-snug">Miami, Florida begins our flame-grilled royalty story.</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-orange-600 to-red-600 border border-red-500/15 p-4 rounded-2xl text-left text-white">
                  <Flame className="w-6 h-6 text-yellow-300 fill-yellow-300/10 mb-2" />
                  <p className="text-xs font-black uppercase tracking-wider">Flames are Real</p>
                  <p className="text-[9px] text-orange-100 leading-snug mt-1.5">Continuous automated steel grates brand our premium patties daily.</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400" 
                  alt="Gold salted fries" 
                  referrerPolicy="no-referrer"
                  className="rounded-2xl object-cover w-full aspect-[3/4] shadow-md hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>

            {/* Quality storytelling text */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs text-amber-500 font-extrabold tracking-widest uppercase block mb-1">CROWN HERITAGE</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Where Fire Meets Flavor Since <span className="text-[#FF4500]">1954</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-red-650 to-[#FF4500] mt-3 rounded-full" />
              </div>

              <div className="text-zinc-400 text-xs sm:text-sm leading-relaxed space-y-4">
                <p>
                  Many fast-food chains construct burgers on standard cold flat grills, frying and trapping excess fats. Since day one, Burger King has done things the honorable way. We grill our savory beef patties over open, super-heated flame grates.
                </p>
                <p>
                  Our flame-grilling system exposes the meat directly to continuous heat of over 800°F. The sear seals in essential juiciness, melts off heavy fats naturally, and adds our trademark smoky, fire-grilled signature flavor.
                </p>
                <p>
                  Beyond beef, quality matters. Our tomatoes are sliced fresh inside local store prep kitchens every single morning. Our savory bacon is cut extra-thick, and we maintain complete traceability for every potato, bun, and royal ingredient selected.
                </p>
              </div>

              {/* Quality commitment tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-zinc-900 border border-zinc-850 p-3.5 rounded-xl text-left">
                  <p className="font-bold text-xs text-zinc-100 font-mono">100% Beef</p>
                  <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">No artificial colors, soy fillers, or preservatives.</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-850 p-3.5 rounded-xl text-left">
                  <p className="font-bold text-xs text-zinc-100 font-mono">Sourced Local</p>
                  <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">Supporting regional farms & strict trace policies.</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-850 p-3.5 rounded-xl text-left col-span-2 sm:col-span-1">
                  <p className="font-bold text-xs text-zinc-100 font-mono">Eco-Packaging</p>
                  <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">Recyclable bags, cartons and wrapper sets by 2028.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REVIEWS SECTION (SOCIAL PROOF) */}
      <section id="reviews" className="py-20 border-t border-zinc-900 bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs text-amber-500 font-extrabold tracking-widest uppercase">REAL BURGER CRITICS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Endorsed by the <span className="text-amber-500">Royal Court</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              Hear directly from certified custom burger designers, daily meal bundle lovers, and verified foodies.
            </p>
          </div>

          {/* Testimonial slider layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="critical-reviews-list">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-zinc-900 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between shadow-md"
                id={`customer-review-${rev.id}`}
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                    "{rev.text}"
                  </p>
                </div>

                {/* Profile panel */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover border border-zinc-800" />
                    <div className="text-left">
                      <p className="font-bold text-xs text-white">{rev.author}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{rev.date}</p>
                    </div>
                  </div>

                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 bg-green-950/40 text-green-400 text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border border-green-500/10">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      <span>Verified Order</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ACCORDION FAQ SECTION */}
      <section id="faqs" className="py-20 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <HelpCircle className="w-8 h-8 text-[#FF4500] mx-auto mb-2 animate-bounce" />
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Curious Minds <span className="text-[#FF4500]">Want to Know</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              Have questions regarding our deliveries, nutrition indices, or rewards? We have the royal answers ready.
            </p>
          </div>

          {/* Accordion FAQ Grid */}
          <div className="space-y-3" id="accordion-faq-container">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;

              return (
                <div 
                  key={idx}
                  className="bg-zinc-905 border border-zinc-900 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-zinc-200 hover:text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors bg-zinc-900/40 hover:bg-zinc-900/70"
                    id={`btn-faq-header-${idx}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] bg-zinc-950 text-amber-500 px-2 py-0.5 rounded uppercase font-mono font-bold">{faq.category}</span>
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-[#FF4500]" /> : <ChevronDown className="w-4.5 h-4.5 text-zinc-520" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-zinc-950/80 border-t border-zinc-900/50"
                      >
                        <div className="px-5 py-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Customer support callout */}
          <div className="mt-8 text-center text-xs text-zinc-650">
            <span>Can't locate what you're looking for? Reach our Royal Support line: </span>
            <span className="text-amber-500 font-bold font-mono">1-800-ROYAL-BK</span>
            <span> or email support@bk.com</span>
          </div>

        </div>
      </section>

    </div>
  );
}
