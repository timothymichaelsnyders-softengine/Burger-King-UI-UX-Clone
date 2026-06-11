export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'burgers' | 'chicken' | 'sides' | 'drinks' | 'desserts' | 'bundles';
  price: number;
  image: string;
  tags: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  lto?: boolean;
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  isCustomized: boolean;
  customIngredients?: {
    bun: string;
    pattyCount: number;
    toppings: Record<string, number>; // ingredientId -> count
    sauces: Record<string, number>; // ingredientId -> count
  };
  customizedPrice: number;
  customizationSummary?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  badge: string;
  discountValue: string;
  expiresInMinutes?: number;
  bgGradient: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  verifiedPurchase: boolean;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  distance?: number;
  latitude: number;
  longitude: number;
  features: ('drive-thru' | 'delivery' | 'wifi' | 'dine-in' | 'playland')[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'ordering' | 'delivery' | 'rewards' | 'dietary';
}

export interface CustomizableIngredient {
  id: string;
  name: string;
  count: number;
  maxCount: number;
  pricePerUnit: number;
  type: 'bun' | 'patty' | 'topping' | 'sauce';
  color: string; // for visual representation if needed
  emoji: string;
}

export interface LoyaltyMilestone {
  id: string;
  pointsRequired: number;
  rewardName: string;
  rewardDescription: string;
  image: string;
}
