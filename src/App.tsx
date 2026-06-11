import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, MapPin, Award, ShoppingBag, Info, X, ShieldCheck, Heart } from 'lucide-react';
import { Product, Store, CartItem, Promotion } from './types';
import { PRODUCTS, STORES, PROMOTIONS, REVIEWS, FAQS } from './data';

import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import BurgerBuilder from './components/BurgerBuilder';
import PromoSection from './components/PromoSection';
import LoyaltyHub from './components/LoyaltyHub';
import StoreLocator from './components/StoreLocator';
import MobileApp from './components/MobileApp';
import StoryReviewsFaq from './components/StoryReviewsFaq';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ExitIntentModal from './components/ExitIntentModal';

export default function App() {
  // Global React states
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bk_royal_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [points, setPoints] = React.useState<number>(() => {
    const saved = localStorage.getItem('bk_royal_points');
    return saved ? parseInt(saved, 10) : 340; // Default Duke starters points
  });

  const [activeStore, setActiveStore] = React.useState<Store>(() => {
    const saved = localStorage.getItem('bk_royal_store');
    return saved ? JSON.parse(saved) : STORES[0];
  });

  const [claimedVouchers, setClaimedVouchers] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('bk_royal_vouchers');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state toggles
  const [cartOpen, setCartOpen] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState<string | null>(null);

  React.useEffect(() => {
    localStorage.setItem('bk_royal_cart', JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem('bk_royal_points', points.toString());
  }, [points]);

  React.useEffect(() => {
    localStorage.setItem('bk_royal_store', JSON.stringify(activeStore));
  }, [activeStore]);

  React.useEffect(() => {
    localStorage.setItem('bk_royal_vouchers', JSON.stringify(claimedVouchers));
  }, [claimedVouchers]);

  // Flash UI Toast notification helper
  const triggerToast = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  // Add standard product to cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      // Find if item is already in cart AND not customized
      const existingProductIdx = prevCart.findIndex(item => 
        item.product.id === product.id && !item.isCustomized
      );

      if (existingProductIdx > -1) {
        const updated = [...prevCart];
        updated[existingProductIdx] = {
          ...updated[existingProductIdx],
          quantity: updated[existingProductIdx].quantity + 1
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartId: `${product.id}-${Date.now()}`,
            product,
            quantity: 1,
            isCustomized: false,
            customizedPrice: product.price
          }
        ];
      }
    });
    triggerToast(`Added ${product.name} to Plate! 👑`);
  };

  // Add customized builder product to cart
  const handleAddCustomToCart = (customItem: Omit<CartItem, 'cartId'>) => {
    setCart((prevCart) => [
      ...prevCart,
      {
        ...customItem,
        cartId: `custom-recipe-${Date.now()}`
      }
    ]);
    triggerToast('Custom Masterpiece added to Plate! 🔥');
  };

  // Update cart item quantity
  const handleUpdateQty = (cartId: string, amount: number) => {
    setCart((prevCart) => 
      prevCart.map(item => {
        if (item.cartId === cartId) {
          const nextQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.cartId !== cartId));
    triggerToast('Item removed from Plate.');
  };

  // Claim voucher codes
  const handleApplyVoucherCode = (code: string) => {
    if (claimedVouchers.includes(code)) {
      triggerToast('Code already applied to checkout!');
      return;
    }

    // Verify code exists in active database to avoid fake inputs
    const validCodes = ['FREEWHOPPER', 'KINGDEAL', 'FREESHIP', 'CROWNSAVE'];
    if (validCodes.includes(code)) {
      setClaimedVouchers((prev) => [...prev, code]);
      triggerToast(`Voucher code "${code}" registered successfully! 🎁`);
    } else {
      triggerToast('Invalid code sequence. Try active vouchers!');
    }
  };

  // Dedect points on reward claims
  const handleDeductPoints = (amount: number) => {
    setPoints((prev) => Math.max(0, prev - amount));
  };

  // Claim free milestone food rewards
  const handleClaimRewardItem = (rewardProduct: Product) => {
    // Inject straight to cart with 0 price!
    setCart((prevCart) => [
      ...prevCart,
      {
        cartId: `reward-${rewardProduct.id}-${Date.now()}`,
        product: rewardProduct,
        quantity: 1,
        isCustomized: false,
        customizedPrice: 0
      }
    ]);
    triggerToast(`Unlocked ${rewardProduct.name} for 0 crowns! 🍟`);
  };

  // Checkout tracker completion cleanups
  const handleCheckoutSuccess = () => {
    // Grant points based on items
    const grantedPoints = Math.round(cart.reduce((s, i) => s + (i.customizedPrice * i.quantity), 0) * 10);
    setPoints((prev) => prev + grantedPoints);
    setCart([]);
    setClaimedVouchers([]); // Clear applied voucher codes
    triggerToast(`Congratulations! Score credit: +${grantedPoints} Crowns! 👑`);
  };

  // Helper smooth navigation scrolling
  const handleOpenBurgerBuilder = () => {
    const el = document.getElementById('burger-builder-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    triggerToast('Artisan Customizer active! ⚙️');
  };

  const handleOpenStoreLocator = () => {
    const el = document.getElementById('store-locator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLoyaltyHub = () => {
    const el = document.getElementById('loyalty');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickOrderWhopper = () => {
    const whopperProduct = PRODUCTS.find(p => p.id === 'whopper');
    if (whopperProduct) {
      handleAddToCart(whopperProduct);
      setCartOpen(true);
    }
  };

  // Points mapping forecast helper
  const forecastPointsGained = Math.round(cart.reduce((sum, item) => sum + (item.customizedPrice * item.quantity), 0) * 10);

  return (
    <div className="bg-zinc-950 min-h-screen text-white relative">
      
      {/* Dynamic Flash Banner Notification UI */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#FF4500] border-2 border-amber-400 text-white font-extrabold text-[11px] sm:text-xs px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Interactive Header */}
      <Header 
        cart={cart}
        vouchersClaimed={claimedVouchers.length}
        points={points}
        activeStore={activeStore}
        onOpenCart={() => setCartOpen(true)}
        onOpenStoreLocator={handleOpenStoreLocator}
        onOpenLoyaltyHub={handleOpenLoyaltyHub}
        onOpenBurgerBuilder={handleOpenBurgerBuilder}
        onSelectStore={setActiveStore}
        stores={STORES}
      />

      {/* Hero Visual Intro Block */}
      <Hero 
        onQuickOrderWhopper={handleQuickOrderWhopper}
        onOpenBurgerBuilder={handleOpenBurgerBuilder}
      />

      {/* Interactive Category Filter Menu Component */}
      <MenuSection 
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* Live Artisan Stacking Custom Burger Builder Experience */}
      <div className="bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold tracking-widest uppercase mb-1">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>ARTISAN LABS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            The Crown Stacking <span className="text-[#FF4500]">Artisan customizer</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-xl">
            Design an authentic personalized recipe. Layer smoked bacon, spicy jalapenos, white onions, custom buns, and juicy seared flame-grilled patties in seconds.
          </p>
        </div>

        <BurgerBuilder 
          onAddCustomToCart={handleAddCustomToCart}
        />
      </div>

      {/* Limited-Time Vouchers Campaigns block */}
      <PromoSection 
        promotions={PROMOTIONS}
        onClaimVoucher={handleApplyVoucherCode}
        claimedVouchers={claimedVouchers}
      />

      {/* Gamified Loyalty Point Milestones trackers */}
      <LoyaltyHub 
        points={points}
        onAddPoints={(amt) => {
          setPoints((prev) => prev + amt);
          triggerToast(`Gained +${amt} Reward Crowns! 👑`);
        }}
        onDeductPoints={handleDeductPoints}
        onClaimRewardItem={handleClaimRewardItem}
      />

      {/* Interactive Store Locator Manhattan projection Map */}
      <div className="bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left mb-6">
          <span className="text-xs text-amber-500 font-extrabold tracking-widest uppercase block mb-1">MAP SYSTEMS</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Active Manhattan Outposts</h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-lg">
            Lock in your nearest kitchen. Get live updates on opening times, drive-thru lanes, and specialized local menu options.
          </p>
        </div>

        <StoreLocator 
          stores={STORES}
          activeStore={activeStore}
          onSelectStore={(st) => {
            setActiveStore(st);
            triggerToast(`Grill switched to ${st.name}! 🍔`);
          }}
        />
      </div>

      {/* Mobile App Promotion block (conversion hooks!) */}
      <MobileApp />

      {/* Quality commitment brand story, customer reviews verified badges, and collapsible FAQs */}
      <StoryReviewsFaq 
        reviews={REVIEWS}
        faqs={FAQS}
      />

      {/* Deep Corporate Footer */}
      <Footer />

      {/* Cart side panel sliding drawer with recommendation engines and detailed checkout tracking */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        promotions={PROMOTIONS}
        claimedVouchers={claimedVouchers}
        onApplyVoucherCode={handleApplyVoucherCode}
        pointsEarnedOnCheckout={forecastPointsGained}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Exit Intent conversion offer drop modal */}
      <ExitIntentModal 
        cartLength={cart.length}
        onApplyCode={handleApplyVoucherCode}
        claimedVouchers={claimedVouchers}
      />

    </div>
  );
}
