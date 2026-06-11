import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Plus, Minus, Info, Sparkles, Check, ShoppingBag, X } from 'lucide-react';
import { CustomizableIngredient, CartItem, Product } from '../types';
import { CUSTOMIZABLE_INGREDIENTS } from '../data';

interface BurgerBuilderProps {
  onAddCustomToCart: (customItem: Omit<CartItem, 'cartId'>) => void;
  onClose?: () => void;
}

export default function BurgerBuilder({ onAddCustomToCart, onClose }: BurgerBuilderProps) {
  const [ingredients, setIngredients] = React.useState<CustomizableIngredient[]>(
    CUSTOMIZABLE_INGREDIENTS.map(ing => ({ ...ing }))
  );
  const [activeTab, setActiveTab] = React.useState<'bun' | 'patty' | 'topping' | 'sauce'>('bun');
  const [successAnimation, setSuccessAnimation] = React.useState(false);

  // Calculate prices
  const basePrice = 3.99; // Base cost of artisan labor and package
  const extraPrice = ingredients.reduce((sum, ing) => {
    // If it's standard count, only charge for extras
    let paidCount = ing.count;
    // Buns: count is 1. If it has a price (like Brioche), charge once.
    if (ing.type === 'bun') {
      return sum + (ing.count > 0 ? ing.pricePerUnit : 0);
    }
    // Patties or toppings or sauces
    return sum + (paidCount * ing.pricePerUnit);
  }, 0);

  const totalPrice = basePrice + extraPrice;

  // Modify ingredient counts
  const updateCount = (id: string, amount: number) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.id === id) {
        // Bun restriction: only one bun category active at a time
        if (ing.type === 'bun' && amount > 0) {
          return ing; // Handled separately
        }
        const newCount = Math.min(Math.max(0, ing.count + amount), ing.maxCount);
        return { ...ing, count: newCount };
      }
      return ing;
    }));
  };

  // Select bun specifically (exclusive selection)
  const selectBun = (id: string) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.type === 'bun') {
        return { ...ing, count: ing.id === id ? 1 : 0 };
      }
      return ing;
    }));
  };

  // Handle addition to plate
  const handleAddToPlate = () => {
    const selectedBun = ingredients.find(i => i.type === 'bun' && i.count > 0)?.name || 'Sesame seed bun';
    const pattyCount = ingredients.filter(i => i.type === 'patty').reduce((sum, i) => sum + i.count, 0);
    
    // Construct ingredient counters
    const toppingsRecord: Record<string, number> = {};
    const saucesRecord: Record<string, number> = {};
    
    ingredients.forEach(i => {
      if (i.count > 0) {
        if (i.type === 'topping') toppingsRecord[i.id] = i.count;
        if (i.type === 'sauce') saucesRecord[i.id] = i.count;
      }
    });

    // Custom description summary
    const summaryParts: string[] = [];
    if (pattyCount > 0) summaryParts.push(`${pattyCount}x Patty`);
    ingredients.forEach(i => {
      if (i.count > 0 && i.type !== 'bun' && i.type !== 'patty') {
        summaryParts.push(`${i.count > 1 ? i.count + 'x ' : ''}${i.name}`);
      }
    });

    const customProduct: Product = {
      id: `custom-bk-${Date.now()}`,
      name: '👑 Artisan Custom Whopper',
      description: `Artfully customized with toasted ${selectedBun}, ${summaryParts.join(', ') || 'and special crown spices'}. Crafted by you!`,
      category: 'burgers',
      price: totalPrice,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
      tags: ['Customized', 'Artisan Spec'],
      ingredients: [selectedBun, ...ingredients.filter(i => i.count > 0 && i.type !== 'bun').map(i => `${i.count}x ${i.name}`)],
      nutrition: {
        calories: Math.round(400 + (pattyCount * 220) + (ingredients.filter(i => i.type === 'topping').reduce((s, i) => s + (i.count * 40), 0))),
        protein: `${20 + (pattyCount * 14)}g`,
        carbs: '42g',
        fat: `${22 + (pattyCount * 16)}g`
      }
    };

    onAddCustomToCart({
      product: customProduct,
      quantity: 1,
      isCustomized: true,
      customIngredients: {
        bun: selectedBun,
        pattyCount,
        toppings: toppingsRecord,
        sauces: saucesRecord
      },
      customizedPrice: totalPrice,
      customizationSummary: summaryParts.join(', ')
    });

    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      if (onClose) onClose();
    }, 1500);
  };

  // Reset customizer
  const handleReset = () => {
    setIngredients(CUSTOMIZABLE_INGREDIENTS.map(ing => ({ ...ing })));
  };

  // Filter items based on active tabs
  const tabItems = ingredients.filter(ing => ing.type === activeTab);

  return (
    <div id="burger-builder-section" className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative max-w-5xl mx-auto my-10 text-left">
      
      {/* Absolute success visual popover overlay */}
      <AnimatePresence>
        {successAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/10 mb-4"
            >
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </motion.div>
            <h3 className="text-2xl font-black text-white">CROWN MASTERPIECE SECURED!</h3>
            <p className="text-zinc-500 text-xs mt-1.5 max-w-xs">Your custom recipe has been dispatched to your active plate. Get ready for authentic flame flavor.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top action header */}
      <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FF4500]/15 rounded-xl flex items-center justify-center border border-[#FF4500]/20">
            <Flame className="w-5 h-5 text-[#FF4500] fill-orange-500/10" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">Artisan Burger Lab</h3>
            <p className="text-zinc-500 text-[10px] sm:text-xs">Stack ingredients exactly how your hunger commands it.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={handleReset}
            className="text-[10px] uppercase font-bold text-zinc-500 hover:text-white transition-colors py-1 px-3 border border-zinc-850 hover:border-zinc-700 rounded-full"
            id="builder-btn-reset"
          >
            Reset Stack
          </button>
          
          {onClose && (
            <button 
              onClick={onClose}
              className="text-zinc-500 hover:text-white p-1 rounded-full bg-zinc-950/80 hover:bg-zinc-800 transition-colors"
              id="builder-btn-close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: Live Stack visual preview */}
        <div className="col-span-1 lg:col-span-5 bg-zinc-900/40 p-6 flex flex-col items-center justify-between border-r border-zinc-900 min-h-[400px]">
          <div className="text-center w-full">
            <span className="text-[10px] text-amber-500 uppercase font-black tracking-widest block mb-1">Your Recipe Live Stack</span>
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent w-full" />
          </div>

          {/* Visual Canvas Stack */}
          <div className="relative w-full max-w-[280px] h-72 flex flex-col items-center justify-end pb-8">
            {/* Crown visual floating on top */}
            <div className="absolute top-0 animate-bounce text-2xl" title="Crafted for royalty!">👑</div>

            {/* Sandwich Stack Container with animations */}
            <div className="w-full flex flex-col items-center space-y-[-12px] relative z-10">
              
              {/* Sesame TOP BUN */}
              {ingredients.find(i => i.id === 'sesame-bun')?.count === 1 && (
                <motion.div 
                  layout
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-48 h-12 bg-gradient-to-b from-[#E5C394] to-[#CD9B65] rounded-t-[50px] shadow-lg border-t border-yellow-150 flex items-center justify-center text-xs text-[#502314] font-black relative"
                >
                  <span>🍔 Sesam Top</span>
                  {/* Seeds */}
                  <div className="absolute top-2 left-6 w-1 h-0.5 bg-yellow-50 rounded" />
                  <div className="absolute top-3 left-16 w-1 h-0.5 bg-yellow-50 rounded" />
                  <div className="absolute top-1 left-24 w-1 h-0.5 bg-yellow-50 rounded" />
                  <div className="absolute top-4 left-36 w-1 h-0.5 bg-yellow-50 rounded" />
                </motion.div>
              )}

              {/* Brioche TOP BUN */}
              {ingredients.find(i => i.id === 'brioche-bun')?.count === 1 && (
                <motion.div 
                  layout
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-48 h-12 bg-gradient-to-b from-[#C68D49] to-[#8E511E] rounded-t-[40px] shadow-lg flex items-center justify-center text-xs text-white font-black"
                >
                  🥯 Artisan Brioche
                </motion.div>
              )}

              {/* Lettuce wraps top */}
              {ingredients.find(i => i.id === 'lettuce-wrap')?.count === 1 && (
                <motion.div 
                  layout
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-52 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-[30px] shadow-lg flex items-center justify-center text-xs text-black font-black"
                >
                  🥬 Ultimate Lettuce Wrap
                </motion.div>
              )}

              {/* Condiments / Sauces indicators shown as visual colored bands */}
              {ingredients.filter(i => i.type === 'sauce' && i.count > 0).map((sauce) => (
                <motion.div
                  key={sauce.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`w-44 h-3.5 rounded-full ${sauce.color} shadow-md border-b border-white/10 opacity-90 flex items-center justify-center text-[8px] text-white font-black uppercase tracking-wider relative space-y-px`}
                >
                  <span>{sauce.emoji} {sauce.name}</span>
                </motion.div>
              ))}

              {/* Toppings indicators */}
              {ingredients.filter(i => i.type === 'topping' && i.count > 0).map((top) => (
                Array.from({ length: top.count }).map((_, idx) => (
                  <motion.div
                    key={`${top.id}-${idx}`}
                    layout
                    initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`w-46 h-5 rounded-lg ${top.color} shadow-sm border border-zinc-950/20 flex items-center justify-center text-[9px] text-[#502314] font-extrabold relative`}
                  >
                    <span>{top.emoji} {top.name}</span>
                  </motion.div>
                ))
              ))}

              {/* Patties indicators */}
              {ingredients.filter(i => i.type === 'patty' && i.count > 0).map((patty) => (
                Array.from({ length: patty.count }).map((_, idx) => (
                  <motion.div
                    key={`${patty.id}-${idx}`}
                    layout
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`w-48 h-8 rounded-xl ${patty.color} border-y-2 border-dashed border-[#FF4500]/50 shadow-md flex flex-col items-center justify-center text-xs text-amber-100 font-bold`}
                  >
                    <span>🔥 {patty.name}</span>
                    <span className="text-[7px] text-orange-400 font-mono font-bold leading-none">FLAME SEARED</span>
                  </motion.div>
                ))
              ))}

              {/* BOTTOM BUN */}
              {ingredients.find(i => i.type === 'bun' && i.count > 0) && (
                <motion.div 
                  layout
                  className="w-48 h-6 bg-[#CD9B65] border-t-4 border-dashed border-[#502314]/20 rounded-b-xl shadow-inner text-center text-[9px] text-amber-950/70 font-semibold pt-1"
                >
                  🍞 Bottom Bun Base
                </motion.div>
              )}

            </div>

            {/* Stand fixture shadow */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-56 h-3 bg-zinc-900 border-b border-zinc-850 rounded-full blur-[1px]" />
          </div>

          {/* Quick Stats overview */}
          <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-900 w-full text-center text-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span>Stack Weight:</span>
              <span className="font-bold text-zinc-300">~ 450 grams</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span>Estimated Energy:</span>
              <span className="font-bold text-zinc-300">
                {Math.round(450 + (ingredients.filter(i => i.type === 'patty').reduce((s, i) => s + (i.count * 220), 0)))} kcal
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Step selectors and ingredient grids */}
        <div className="col-span-1 lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            {/* Tab navigation */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-6 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900">
              {(['bun', 'patty', 'topping', 'sauce'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 text-[11px] font-extrabold uppercase tracking-widest text-center rounded-lg cursor-pointer transition-all ${
                    activeTab === tab
                      ? 'bg-zinc-900 text-[#FF4500] shadow-sm border border-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  id={`btn-builder-tab-${tab}`}
                >
                  {tab}s
                </button>
              ))}
            </div>

            {/* List of active ingredients */}
            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
              {tabItems.map((ing) => {
                const isSelectedBun = ing.type === 'bun' && ing.count > 0;
                
                return (
                  <div 
                    key={ing.id} 
                    className={`bg-zinc-900/60 border rounded-2xl p-4.5 flex items-center justify-between transition-colors ${
                      ing.count > 0 ? 'border-orange-500/10' : 'border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl bg-zinc-950 w-11 h-11 rounded-xl flex items-center justify-center border border-zinc-850">
                        {ing.emoji}
                      </span>
                      <div className="text-left">
                        <p className="font-bold text-xs text-white leading-snug">{ing.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {ing.pricePerUnit === 0 ? 'FREE OPTION' : `+ $${ing.pricePerUnit.toFixed(2)} each`}
                        </p>
                      </div>
                    </div>

                    {/* Numeric customizer controls */}
                    {ing.type === 'bun' ? (
                      <button
                        onClick={() => selectBun(ing.id)}
                        className={`text-[10px] uppercase font-black tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer ${
                          isSelectedBun
                            ? 'bg-green-950/60 text-green-400 border border-green-500/20'
                            : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-550 hover:text-white border border-zinc-850'
                        }`}
                        id={`btn-select-bun-${ing.id}`}
                      >
                        {isSelectedBun ? 'Active Bun ✓' : 'Select'}
                      </button>
                    ) : (
                      <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-full p-1 gap-3">
                        <button
                          disabled={ing.count === 0}
                          onClick={() => updateCount(ing.id, -1)}
                          className="w-7 h-7 bg-zinc-900 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                          id={`btn-sub-ing-${ing.id}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="font-mono font-black text-xs text-white min-w-[12px] text-center">
                          {ing.count}
                        </span>

                        <button
                          disabled={ing.count >= ing.maxCount}
                          onClick={() => updateCount(ing.id, 1)}
                          className="w-7 h-7 bg-zinc-900 hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                          id={`btn-add-ing-${ing.id}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Checkout & summary section at bottom */}
          <div className="mt-8 pt-6 border-t border-zinc-900 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold block leading-none">Your Customized Total</span>
                <span className="font-black text-2xl text-white font-mono">$ {totalPrice.toFixed(2)}</span>
              </div>

              <div className="text-right text-[10px] text-zinc-500 leading-tight">
                <span className="block font-semibold">Artisan Recipe v1.0</span>
                <span>Includes customized bun, sauces, and wrapping.</span>
              </div>
            </div>

            <button
              onClick={handleAddToPlate}
              className="w-full bg-gradient-to-r from-red-600 to-[#FF4500] hover:from-red-500 hover:to-orange-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-full shadow-xl hover:shadow-orange-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              id="builder-btn-add-recipe"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Custom Masterpiece to Plate</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
