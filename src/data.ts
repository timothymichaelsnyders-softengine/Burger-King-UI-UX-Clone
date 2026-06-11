import { Product, Store, Promotion, Review, FAQItem, CustomizableIngredient, LoyaltyMilestone } from './types';

// Premium products
export const PRODUCTS: Product[] = [
  {
    id: 'whopper',
    name: 'The Flame-Grilled Whopper®',
    description: 'Our signature burger features ¼ lb of savory flame-grilled beef topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    category: 'burgers',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    tags: ['Best Seller', 'Flame-Grilled', '100% Beef'],
    ingredients: ['100% Beef Patty', 'Sesame Bun', 'Lettuce', 'Tomato', 'Mayo', 'Ketchup', 'Pickles', 'Onions'],
    nutrition: {
      calories: 660,
      protein: '28g',
      carbs: '49g',
      fat: '40g',
    }
  },
  {
    id: 'bacon-king',
    name: 'Bacon King Double',
    description: 'Two ¼ lb savory flame-grilled beef patties, topped with a hearty portion of thick-cut smoked bacon, melted American cheese, ketchup, and creamy mayonnaise on a soft sesame seed bun.',
    category: 'burgers',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=800',
    tags: ['Premium', 'Double Patty', 'Extra Bacon'],
    ingredients: ['Two Beef Patties', 'Sesame Bun', 'Thick-Cut Bacon', 'American Cheese', 'Mayo', 'Ketchup'],
    nutrition: {
      calories: 1150,
      protein: '61g',
      carbs: '48g',
      fat: '79g',
    }
  },
  {
    id: 'chicken-royale',
    name: 'Chicken Royale Premium',
    description: 'A crispy white meat chicken fillet topped with shredded lettuce and creamy mayonnaise, served on our elongated toasted sesame seed bun.',
    category: 'chicken',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800',
    tags: ['Crispy Chicken', 'Classic Favorite'],
    ingredients: ['Crispy Chicken Patty', 'Royal Bun', 'Shredded Lettuce', 'Creamy Mayo'],
    nutrition: {
      calories: 570,
      protein: '24g',
      carbs: '58g',
      fat: '29g',
    }
  },
  {
    id: 'smokey-bbq-chicken',
    name: 'Smokey Bacon & BBQ Chicken',
    description: 'Juicy, flame-grilled chicken breast fillet, crispy smoked bacon, melted American cheese, lettuce, tomatoes, and rich sweet BBQ sauce on a toasted brioche bun.',
    category: 'chicken',
    price: 6.79,
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&q=80&w=800',
    tags: ['Flame-Grilled Chicken', 'BBQ Custom', 'LTO'],
    ingredients: ['Grilled Chicken Breast', 'Brioche Bun', 'Smokey Bacon', 'American Cheese', 'Lettuce', 'Tomato', 'Sweet BBQ Sauce'],
    nutrition: {
      calories: 510,
      protein: '35g',
      carbs: '40g',
      fat: '16g',
    },
    lto: true
  },
  {
    id: 'cheeseburger',
    name: 'Flame-Grilled Cheeseburger',
    description: 'Our simple yet classic flame-grilled beef patty topped with a layer of melted American cheese, yellow mustard, ketchup, and crunchy pickles on a toasted sesame bun.',
    category: 'burgers',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800',
    tags: ['Value Choice', 'Flame-Grilled'],
    ingredients: ['Beef Patty', 'Toasted Bun', 'American Cheese', 'Pickles', 'Ketchup', 'Mustard'],
    nutrition: {
      calories: 300,
      protein: '15g',
      carbs: '30g',
      fat: '12g',
    }
  },
  {
    id: 'crispy-fries',
    name: 'Golden Salted Fries',
    description: 'Crispy on the outside, fluffy on the inside. Perfectly salted potatoes, fried to a breathtaking golden-brown finish.',
    category: 'sides',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    tags: ['Crucial Side', 'Crispy Golden'],
    ingredients: ['Idaho Potatoes', 'Sea Salt', 'Vegetable Oil'],
    nutrition: {
      calories: 380,
      protein: '5g',
      carbs: '50g',
      fat: '17g',
    }
  },
  {
    id: 'onion-rings',
    name: 'BK Crispy Onion Rings',
    description: 'Served hot, crispy, and crunchy, our golden onion rings are the perfect companion to any legendary flame-grilled burger.',
    category: 'sides',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&q=80&w=800',
    tags: ['Fan Favorite', 'Crunchy'],
    ingredients: ['Sliced Onions', 'Crispy Batter Mix', 'Dipping Sauce Option'],
    nutrition: {
      calories: 410,
      protein: '4g',
      carbs: '46g',
      fat: '21g',
    }
  },
  {
    id: 'ice-cold-beverage',
    name: 'Refreshing Coca-Cola® Cherry',
    description: 'An icy, crisp cup of carbonated bliss, carbonated on site to release full sparkling flavor. Perfectly matches savory burgers.',
    category: 'drinks',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    tags: ['Pure Refreshment', 'Infinite Refill'],
    ingredients: ['Carbonated Water', 'High Fructose Corn Syrup', 'Cola Concentrate', 'Icy Blocks'],
    nutrition: {
      calories: 140,
      protein: '0g',
      carbs: '39g',
      fat: '0g',
    }
  },
  {
    id: 'royal-chocolate-shake',
    name: 'Royal Chocolate Fudge Shake',
    description: 'Velvety vanilla soft serve spun with rich real chocolate fudge, crowned with thick whipped topping and chocolate sprinkles.',
    category: 'desserts',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800',
    tags: ['Indulgent Dessert', 'Sweet Finish'],
    ingredients: ['BK Soft Serve Ice Cream', 'Chocolate Fudge Sauce', 'Whipped Cream', 'Sprinkles'],
    nutrition: {
      calories: 580,
      protein: '11g',
      carbs: '85g',
      fat: '20g',
    }
  },
  {
    id: 'family-feast-bundle',
    name: 'Royal Family Crown Feast',
    description: 'The ultimate royal setup: Two Flame-Grilled Whoppers, Two Flame-Grilled Cheeseburgers, Four Small Fries, Four Drinks, and a box of 10pc Golden Nuggets.',
    category: 'bundles',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&q=80&w=800',
    tags: ['Saves 40%', 'Family Pack', 'Feast Mode'],
    ingredients: ['2 Whoppers', '2 Cheeseburgers', '4 Small Fries', '4 Beverages', '10 Chicken Nuggets'],
    nutrition: {
      calories: 2980,
      protein: '118g',
      carbs: '310g',
      fat: '135g',
    }
  }
];

// Initial ingredient values for custom burger building
export const CUSTOMIZABLE_INGREDIENTS: CustomizableIngredient[] = [
  // Buns
  { id: 'sesame-bun', name: 'Sesame Seed Bun', count: 1, maxCount: 1, pricePerUnit: 0.00, type: 'bun', color: 'bg-[#E5C394]', emoji: '🍞' },
  { id: 'brioche-bun', name: 'Toasted Premium Brioche', count: 0, maxCount: 1, pricePerUnit: 0.75, type: 'bun', color: 'bg-[#D6A66C]', emoji: '🥯' },
  { id: 'lettuce-wrap', name: 'Low Carb Lettuce Wrap', count: 0, maxCount: 1, pricePerUnit: 0.50, type: 'bun', color: 'bg-green-500', emoji: '🥬' },
  // Patties
  { id: 'beef-patty', name: 'Flame-Grilled Beef Patty', count: 1, maxCount: 3, pricePerUnit: 2.00, type: 'patty', color: 'bg-[#502314]', emoji: '🥩' },
  { id: 'crispy-chicken', name: 'Golden Crispy Chicken', count: 0, maxCount: 2, pricePerUnit: 1.75, type: 'patty', color: 'bg-[#CD853F]', emoji: '🍗' },
  { id: 'plant-patty', name: 'Plant-Based Impossible™', count: 0, maxCount: 2, pricePerUnit: 2.25, type: 'patty', color: 'bg-[#6B4E31]', emoji: '🌱' },
  // Toppings
  { id: 'sliced-cheese', name: 'Melted American Cheese', count: 1, maxCount: 4, pricePerUnit: 0.50, type: 'topping', color: 'bg-amber-400', emoji: '🧀' },
  { id: 'smoked-bacon', name: 'Thick-Cut Smoked Bacon', count: 0, maxCount: 4, pricePerUnit: 1.25, type: 'topping', color: 'bg-[#E08A64]', emoji: '🥓' },
  { id: 'fresh-lettuce', name: 'Crisp Shredded Lettuce', count: 1, maxCount: 3, pricePerUnit: 0.25, type: 'topping', color: 'bg-green-400', emoji: '🥬' },
  { id: 'juicy-tomato', name: 'Slices of Beefsteak Tomato', count: 1, maxCount: 3, pricePerUnit: 0.35, type: 'topping', color: 'bg-red-500', emoji: '🍅' },
  { id: 'white-onion', name: 'Sweet White Onion Rings', count: 1, maxCount: 3, pricePerUnit: 0.15, type: 'topping', color: 'bg-stone-200', emoji: '🧅' },
  { id: 'crunchy-pickle', name: 'Crinkle-Cut Pickles', count: 2, maxCount: 6, pricePerUnit: 0.20, type: 'topping', color: 'bg-emerald-600', emoji: '🥒' },
  { id: 'jalapenos', name: 'Spicy Fire Jalapeños', count: 0, maxCount: 5, pricePerUnit: 0.40, type: 'topping', color: 'bg-emerald-700', emoji: '🌶️' },
  // Sauces
  { id: 'creamy-mayo', name: 'Classic Mayo Sauce', count: 1, maxCount: 2, pricePerUnit: 0.00, type: 'sauce', color: 'bg-amber-50', emoji: '🥛' },
  { id: 'tangy-ketchup', name: 'Sweet Tomato Ketchup', count: 1, maxCount: 2, pricePerUnit: 0.00, type: 'sauce', color: 'bg-red-600', emoji: '🥫' },
  { id: 'bbq-sauce', name: 'Smokey Hickory BBQ', count: 0, maxCount: 3, pricePerUnit: 0.30, type: 'sauce', color: 'bg-[#3D0C02]', emoji: '🤎' },
  { id: 'zesty-buffalo', name: 'Spicy Zesty Buffalo', count: 0, maxCount: 3, pricePerUnit: 0.30, type: 'sauce', color: 'bg-orange-600', emoji: '🔥' },
  { id: 'melted-cheese-drizzle', name: 'Warm Cheese Fondue Drizzle', count: 0, maxCount: 2, pricePerUnit: 0.60, type: 'sauce', color: 'bg-yellow-500', emoji: '🧀' }
];

// High-converting exclusive promotions
export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Free Whopper® On Signup',
    description: 'Complete your Royal Rewards registration online. Unlock a totally free flame-grilled Whopper on your very first purchase of $5 or more.',
    code: 'FREEWHOPPER',
    badge: 'NEW MEMBERS ONLY',
    discountValue: '$6.99 VALUE',
    expiresInMinutes: 45,
    bgGradient: 'from-orange-600 to-red-600'
  },
  {
    id: 'promo-2',
    title: 'Royal King Double Deal',
    description: 'Get two Double Cheeseburgers, one Medium Golden Fries, and a cold Soft Drink for a special reduced price.',
    code: 'KINGDEAL',
    badge: 'LIMITED TIME ONLY',
    discountValue: 'SAVE 45%',
    expiresInMinutes: 120,
    bgGradient: 'from-amber-500 to-amber-700'
  },
  {
    id: 'promo-3',
    title: 'Zero Delivery Fee Tuesday',
    description: 'Skip the delivery charge on any mobile or desktop cart over $15. Satisfy all flame-grilled cravings right at your doorstep.',
    code: 'FREESHIP',
    badge: 'TODAY ONLY',
    discountValue: 'FREE DELIVERY',
    expiresInMinutes: 280,
    bgGradient: 'from-red-600 to-bk-terracotta'
  }
];

// Gamified milestones for loyaly
export const LOYALTY_MILESTONES: LoyaltyMilestone[] = [
  {
    id: 'milestone-1',
    pointsRequired: 150,
    rewardName: 'Crispy Small Fries / Drink',
    rewardDescription: 'Perfect salty crisp snack or a bubbly soda refreshment.',
    image: '🍟'
  },
  {
    id: 'milestone-2',
    pointsRequired: 250,
    rewardName: '8pc Chicken Nuggets',
    rewardDescription: 'Tender on the inside, golden-battered on the outside.',
    image: '🍗'
  },
  {
    id: 'milestone-3',
    pointsRequired: 500,
    rewardName: 'The Flame-Grilled Whopper®',
    rewardDescription: 'Our hallmark crown burger, hand-prepared for pure bliss.',
    image: '🍔'
  },
  {
    id: 'milestone-4',
    pointsRequired: 750,
    rewardName: 'Full King Meal Deal Double',
    rewardDescription: 'Any premium burger, medium salted fries, drink, and a dessert pie.',
    image: '👑'
  }
];

// Interactive stores
export const STORES: Store[] = [
  {
    id: 'store-1',
    name: 'BK Royal Broadway',
    address: '1540 Broadway, New York, NY 10036',
    phone: '(212) 768-1250',
    hours: '6:00 AM - 2:00 AM',
    isOpen: true,
    latitude: 40.7579,
    longitude: -73.9855,
    features: ['drive-thru', 'delivery', 'dine-in', 'wifi']
  },
  {
    id: 'store-2',
    name: 'BK Crown Central Park',
    address: '810 7th Ave, New York, NY 10019',
    phone: '(212) 581-2244',
    hours: '24 Hours Open',
    isOpen: true,
    latitude: 40.7634,
    longitude: -73.9809,
    features: ['delivery', 'dine-in', 'wifi']
  },
  {
    id: 'store-3',
    name: 'BK Chelsea Fire Station',
    address: '260 8th Ave, New York, NY 10011',
    phone: '(212) 366-0422',
    hours: '7:00 AM - Midnight',
    isOpen: true,
    latitude: 40.7456,
    longitude: -73.9991,
    features: ['drive-thru', 'delivery', 'dine-in', 'playland']
  },
  {
    id: 'store-4',
    name: 'BK Downtown Wall Street',
    address: '106 Liberty St, New York, NY 10006',
    phone: '(212) 349-2111',
    hours: '7:00 AM - 10:00 PM',
    isOpen: false,
    latitude: 40.7093,
    longitude: -74.0113,
    features: ['delivery', 'dine-in', 'wifi']
  }
];

// Highly authentic social proof testimonials
export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alexander M.',
    rating: 5,
    text: 'Nothing beats the authentic flame-grilled smoky charcoal flavor of the Whopper. This website customized hamburger builder let me double up the spicy jalapeños and bacon in seconds. Ordered and picked it up in 10 minutes flat!',
    date: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Jessica Thorne',
    rating: 5,
    text: 'The loyalty Royal rewards program is incredible! I earned 250 points with my first group dinner order and immediately redeemed a free order of chicken nuggets. Delivery was lightning fast, and they arrived piping hot.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Daniel Craig S.',
    rating: 5,
    text: 'This brand experience is on another level. The Custom Burger Builder has absolute pixel perfection. Slicing white onions, dripping hot cheese and dragging a clean brioche bun—felt like baking it on my screen.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verifiedPurchase: true
  }
];

// Brand FAQ list
export const FAQS: FAQItem[] = [
  {
    category: 'ordering',
    question: 'How do I place an online order for instant collection?',
    answer: 'Simply select your favorite flame-grilled elements from our digital Menu or craft an ultra-personalized recipe using our Burger Builder. Click checkout to select your closest Crown store location, pay securely, and collect in-store or at the drive-thru.'
  },
  {
    category: 'delivery',
    question: 'Which delivery partners do you integrate with?',
    answer: 'We directly route orders via top-tier networks including DoorDash, UberEats, and Grubhub. If you use our official app or web checkout, our dynamic delivery partners ensure instant routing of the flame-grilled items, directly mapping to your live position.'
  },
  {
    category: 'rewards',
    question: 'How do the Royal Crowns loyalty points accumulate?',
    answer: 'For every $1 spent on food or beverages directly through the website or mobile app, you earn 10 Royal Crowns points. As you climb the levels (150, 250, 500, or 750 crowns), you can instantly claim reward items to redeem with your next burger meal!'
  },
  {
    category: 'dietary',
    question: 'Do you offer plant-based or gluten-sensitive options?',
    answer: 'Absolutely! Our legendary Impossible™ Whopper offers a 100% plant-based savory patty cooked on our flame-grills. For gluten-sensitive guests, you can customize any sandwich utilizing our Fresh Crisp Lettuce wrap as the bun option inside our interactive Burger Builder.'
  },
  {
    category: 'ordering',
    question: 'Can I save my custom crafted burgers for future quick checkout?',
    answer: 'Yes! When you complete a custom recipe in the Build Your Burger Experience, you can add it to your Cart or save it as a favorite to enjoy one-click checkout the next time you have a craving.'
  }
];
