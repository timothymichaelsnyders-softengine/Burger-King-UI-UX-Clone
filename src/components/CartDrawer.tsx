import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, Gift, Flame, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { CartItem, Product, Promotion } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (cartId: string, amount: number) => void;
  onRemoveItem: (cartId: string) => void;
  onAddToCart: (product: Product) => void;
  promotions: Promotion[];
  claimedVouchers: string[];
  onApplyVoucherCode: (code: string) => void;
  pointsEarnedOnCheckout: number;
  onCheckoutSuccess: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onAddToCart,
  promotions,
  claimedVouchers,
  onApplyVoucherCode,
  pointsEarnedOnCheckout,
  onCheckoutSuccess
}: CartDrawerProps) {
  const [voucherInput, setVoucherInput] = React.useState('');
  const [activeVoucher, setActiveVoucher] = React.useState<Promotion | null>(null);
  const [checkingOut, setCheckingOut] = React.useState(false);
  const [checkoutStep, setCheckoutStep] = React.useState<number>(0); // 0 = idle, 1 = prepping, 2 = seared, 3 = delivery, 4 = complete

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + (item.customizedPrice * item.quantity), 0);
  
  // Local delivery fees (defaults to 3.99 if there's any item, free if subtotal > 15 and code is FREESHIP)
  const isFreeShipApplied = claimedVouchers.includes('FREESHIP') && subtotal >= 15;
  const deliveryFee = subtotal === 0 ? 0 : (isFreeShipApplied ? 0 : 3.99);

  // Free Whopper voucher discount calculation
  let voucherDiscount = 0;
  const isFreeWhopperApplied = claimedVouchers.includes('FREEWHOPPER');
  if (isFreeWhopperApplied && subtotal > 0) {
    // Locate if whopper exists in cart
    const whopperInCart = cart.find(item => item.product.id === 'whopper');
    if (whopperInCart) {
      voucherDiscount = whopperInCart.customizedPrice; // Disount full whopper
    } else {
      // If no whopper, fallback to flat $5 discount to prevent frustration if code applied but whopper omitted
      voucherDiscount = Math.min(subtotal, 5.00); 
    }
  }

  // Double King Deal discount
  const isKingDealApplied = claimedVouchers.includes('KINGDEAL');
  if (isKingDealApplied && subtotal > 0) {
    voucherDiscount = Math.min(subtotal, 4.50); // Save 4.50
  }

  const tax = subtotal * 0.0825; // NY core tax
  const total = Math.max(0, subtotal + deliveryFee + tax - voucherDiscount);

  // Recommendations: Upsell / cross-sell AOV boosters
  const upsellRecommendations = [
    {
      id: 'onion-rings',
      name: 'BK Golden Onion Rings',
      description: 'Crunchy battered rings with zesty dip.',
      price: 3.29,
      image: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'royal-chocolate-shake',
      name: 'Royal Chocolate Fudge Shake',
      description: 'Vanilla soft serve with fudge swirls.',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=200'
    }
  ];

  // Filter out recommendations that already exist in the cart
  const activeRecommendations = upsellRecommendations.filter(rec => 
    !cart.some(item => item.product.id === rec.id)
  );

  // Handle coupon custom input
  const handleVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    onApplyVoucherCode(voucherInput.trim().toUpperCase());
    setVoucherInput('');
  };

  // Trigger Checkout mock simulation
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckingOut(true);
    setCheckoutStep(1); // Prepping

    // Step multipliers timers mapping
    setTimeout(() => setCheckoutStep(2), 2000); // Seared
    setTimeout(() => setCheckoutStep(3), 4000); // Delivering
    setTimeout(() => {
      setCheckoutStep(4); // Completed success!
      onCheckoutSuccess();
    }, 6000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              id="cart-backdrop"
            />

            {/* Sliding Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-zinc-950 border-l border-zinc-900 shadow-2xl flex flex-col h-full"
                id="cart-sliding-container"
              >
                {/* Header panel */}
                <div className="bg-zinc-90 w-full p-6 border-b border-zinc-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#FF4500]" />
                    <h3 className="font-extrabold text-sm sm:text-base text-white uppercase tracking-wider">Your Plate</h3>
                    <span className="bg-zinc-900 text-amber-500 font-bold font-mono text-[10px] px-2 py-0.5 rounded border border-zinc-800">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </div>

                  <button 
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white p-1.5 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
                    id="btn-close-cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Cart Body */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
                  
                  {/* Empty state prompt */}
                  {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                      <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-850">
                        <ShoppingBag className="w-7 h-7 text-zinc-650" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-zinc-400">Your Plate is Empty</h4>
                        <p className="text-zinc-550 text-[10px] sm:text-xs mt-1 max-w-xs mx-auto">Browse through our flame-grilled items or build your customized burger now to begin!</p>
                      </div>
                      <button 
                        onClick={() => {
                          onClose();
                          const el = document.getElementById('menu');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-zinc-900 hover:bg-[#FF4500] text-zinc-300 hover:text-white rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-wider border border-zinc-800 transition-colors"
                      >
                        Explore Menu Items
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4" id="cart-items-list">
                      {cart.map((item) => (
                        <div 
                          key={item.cartId}
                          className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-4 flex items-start gap-4 relative hover:border-zinc-800 transition-colors"
                          id={`cart-item-${item.cartId}`}
                        >
                          {/* Image preview */}
                          <div className="w-14 h-14 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-850">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>

                          {/* Data columns */}
                          <div className="flex-grow text-left space-y-1">
                            <h4 className="font-extrabold text-xs text-white leading-tight pr-6">
                              {item.product.name}
                            </h4>
                            {item.isCustomized ? (
                              <p className="text-[9px] text-amber-500 font-medium leading-relaxed bg-amber-950/20 border border-amber-500/10 px-2 py-1 rounded">
                                Customized: {item.customizationSummary || 'Artisan stack options'}
                              </p>
                            ) : null}
                            <p className="font-mono text-xs font-black text-white">$ {item.customizedPrice.toFixed(2)}</p>

                            {/* Quantity panel and deletion */}
                            <div className="flex items-center justify-between pt-2.5">
                              <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-full p-0.5 gap-2.5">
                                <button
                                  onClick={() => onUpdateQty(item.cartId, -1)}
                                  className="w-5.5 h-5.5 bg-zinc-900 hover:bg-zinc-850 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                  id={`btn-cart-sub-${item.cartId}`}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xxs font-black text-white min-w-[10px] text-center">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQty(item.cartId, 1)}
                                  className="w-5.5 h-5.5 bg-zinc-900 hover:bg-zinc-850 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                  id={`btn-cart-add-${item.cartId}`}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.cartId)}
                                className="text-zinc-650 hover:text-red-500 transition-colors p-1"
                                id={`btn-cart-delete-${item.cartId}`}
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations Upsell/Cross-sell Section (increases AOV!) */}
                  {cart.length > 0 && activeRecommendations.length > 0 && (
                    <div className="border-t border-zinc-900 pt-5 text-left" id="cross-sell-section">
                      <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider block mb-3 leading-none">Complete Your Feast (Saves +20%!)</span>
                      <div className="space-y-2.5">
                        {activeRecommendations.slice(0, 2).map((rec) => (
                          <div 
                            key={rec.id}
                            className="bg-zinc-905 border border-zinc-900 rounded-xl p-3 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={rec.image} alt={rec.name} className="w-10 h-10 rounded-lg object-cover bg-zinc-950 border border-zinc-850" />
                              <div className="text-left">
                                <h5 className="font-bold text-[11px] text-zinc-200 leading-snug">{rec.name}</h5>
                                <p className="font-mono text-[10px] text-zinc-550">$ {rec.price.toFixed(2)}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                // Maps mock item as a product to add
                                const p: Product = {
                                  id: rec.id,
                                  name: rec.name,
                                  description: rec.description,
                                  category: 'sides',
                                  price: rec.price,
                                  image: rec.image,
                                  tags: ['Cross-Sell Boost'],
                                  ingredients: ['Artisan recipe'],
                                  nutrition: { calories: 340, protein: '4g', carbs: '44g', fat: '12g' }
                                };
                                onAddToCart(p);
                              }}
                              className="bg-zinc-900 hover:bg-[#FF4500] text-zinc-300 hover:text-white font-extrabold text-[9px] uppercase px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-zinc-800 hover:border-transparent"
                              id={`btn-add-cross-sell-${rec.id}`}
                            >
                              + Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coupon Promo voucher input */}
                  {cart.length > 0 && (
                    <div className="border-t border-zinc-900 pt-5">
                      <form onSubmit={handleVoucherSubmit} className="flex gap-2">
                        <div className="relative flex-grow">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text" 
                            placeholder="Enter Code (e.g. FREEWHOPPER)" 
                            value={voucherInput}
                            onChange={(e) => setVoucherInput(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-xxs text-white focus:outline-none focus:border-amber-500/40"
                            id="voucher-text-input"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="bg-zinc-80s bg-zinc-800 hover:bg-zinc-750 text-white font-bold px-4 rounded-lg text-xxs cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>

                      {/* Claimed/Available vouchers checklist inside cart drawers */}
                      {claimedVouchers.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 text-[10px] text-zinc-400">
                          {claimedVouchers.map((code) => (
                            <span key={code} className="bg-green-950/40 text-green-400 border border-green-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <strong>{code}</strong> Applied ✓
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom receipt / calculations */}
                {cart.length > 0 && (
                  <div className="bg-zinc-900 p-6 border-t border-zinc-850 space-y-4">
                    <div className="space-y-2 text-xs text-zinc-400">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span className="font-mono text-zinc-200">$ {subtotal.toFixed(2)}</span>
                      </div>
                      
                      {/* Vouchers discounts */}
                      {voucherDiscount > 0 && (
                        <div className="flex justify-between text-[#FF4500] font-semibold">
                          <span>Voucher Discount:</span>
                          <span className="font-mono">- $ {voucherDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Local Delivery Fee:</span>
                        <span className="font-mono text-zinc-200">{deliveryFee === 0 ? 'FREE' : `$ ${deliveryFee.toFixed(2)}`}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Sales Tax (8.25%):</span>
                        <span className="font-mono text-zinc-200">$ {tax.toFixed(2)}</span>
                      </div>

                      <div className="h-px bg-zinc-800 my-2" />

                      <div className="flex justify-between text-base font-black text-white">
                        <span>Final Total:</span>
                        <span className="font-mono text-amber-500">$ {total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Loyalty Points Gained forecast warning */}
                    <div className="bg-amber-950/15 border border-amber-500/10 px-3 py-2 rounded-lg text-left text-[10px] text-amber-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Gift className="w-4 h-4 text-amber-500" /> Plus Reward Crowns:</span>
                      <span className="font-bold underline">+{pointsEarnedOnCheckout} crowns</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-red-650 to-[#FF4500] hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-full shadow-xl hover:shadow-orange-500/10 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                      id="btn-place-order"
                    >
                      <span>Place Crown Order (${total.toFixed(2)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Tracker Full Screen Overlay */}
      <AnimatePresence>
        {checkingOut && (
          <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 text-center text-white">
            <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-850 rounded-3xl shadow-2xl relative space-y-6 text-left">
              
              <div className="text-center">
                <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest block mb-1">CROWN KITCHEN DISPATCH</span>
                <h3 className="text-xl font-extrabold text-white">Your Order Tracker</h3>
              </div>

              {/* Progress step tracking visuals */}
              <div className="space-y-6 pt-4">
                
                {/* Step 1: Prepping */}
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    checkoutStep >= 1 ? 'bg-orange-600 border-orange-500 text-white' : 'border-zinc-800 text-zinc-650'
                  }`}>
                    1
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${checkoutStep >= 1 ? 'text-white' : 'text-zinc-550'}`}>Grills Warming Up</h5>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">Automated steel grates are reaching 800°F matching recipe specs.</p>
                  </div>
                </div>

                {/* Step 2: Searing */}
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    checkoutStep >= 2 ? 'bg-orange-600 border-orange-500 text-white animate-pulse' : 'border-zinc-800 text-zinc-650'
                  }`}>
                    2
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${checkoutStep >= 2 ? 'text-white' : 'text-zinc-550'}`}>Flame Searing Patties</h5>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">High smoke searing process. Melted American cheddar is layered.</p>
                  </div>
                </div>

                {/* Step 3: Packing */}
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    checkoutStep >= 3 ? 'bg-orange-600 border-orange-500 text-white' : 'border-zinc-800 text-zinc-650'
                  }`}>
                    3
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${checkoutStep >= 3 ? 'text-white' : 'text-zinc-550'}`}>Boxing and Dispatched</h5>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">Wrapped securely in heat-isolated foil. Routed with delivery drivers.</p>
                  </div>
                </div>

              </div>

              {/* Step 4: Complete State */}
              <AnimatePresence>
                {checkoutStep === 4 && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl text-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">PRIORITY ORDER DISPATCHED!</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">Check your mobile parameters for continuous live SMS notifications. Your Duke crowns are added.</p>
                    </div>
                    <button
                      onClick={() => {
                        setCheckingOut(false);
                        setCheckoutStep(0);
                        onClose();
                      }}
                      className="bg-[#FF4500] hover:bg-orange-500 text-white rounded-xl py-2 px-6 text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Return to Court
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {checkoutStep < 4 && (
                <div className="flex items-center gap-2 justify-center text-xxs text-zinc-550 pt-2 border-t border-zinc-850">
                  <div className="w-2 h-2 rounded-full bg-[#FF4500] animate-ping" />
                  <span>Interactive checkout simulation is active. Do not close.</span>
                </div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
