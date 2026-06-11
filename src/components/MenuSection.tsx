import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Info, Filter, ShoppingBag, Plus, Sparkles, ChevronRight, Search, X } from 'lucide-react';
import { Product } from '../types';

interface MenuSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function MenuSection({ products, onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [onlyLTO, setOnlyLTO] = React.useState<boolean>(false);
  const [nutrientModalItem, setNutrientModalItem] = React.useState<Product | null>(null);

  // Extract categories dynamically
  const categories = ['all', 'burgers', 'chicken', 'sides', 'drinks', 'desserts', 'bundles'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLTO = !onlyLTO || product.lto;
    return matchesCategory && matchesSearch && matchesLTO;
  });

  return (
    <section id="menu" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-orange-900/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Heading with design craftsmanship */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold tracking-widest uppercase mb-1">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>CROWN KITCHEN MENU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sizzling Hot <span className="text-[#FF4500]">Royal Servings</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-lg">
              Indulge in certified flame-grilled masterpieces, crisp sides, and signature deals. Everything made-to-order.
            </p>
          </div>

          {/* Search bar inside header section */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search Crown menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500/50 rounded-full py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-colors"
              id="menu-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Scroller + LTO Filter Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-red-600 to-[#FF4500] text-white shadow-md'
                    : 'bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
                id={`btn-menu-cat-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-zinc-400 font-semibold font-mono">Limited Offers (LTO) Only:</span>
            <button
              onClick={() => setOnlyLTO(!onlyLTO)}
              className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${onlyLTO ? 'bg-[#FF4500]' : 'bg-zinc-800'}`}
              id="btn-toggle-lto"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${onlyLTO ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Dynamic products list */}
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-12 text-center max-w-md mx-auto">
            <X className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-200 font-bold mb-1">No delicacies matches selected filters</p>
            <p className="text-zinc-500 text-xs">Try adjusting your category search parameters or checking other categories.</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOnlyLTO(false); }}
              className="mt-4 bg-zinc-800 hover:bg-zinc-750 text-white rounded-full px-4 py-2 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="menu-items-grid">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-900 border border-zinc-800/80 hover:border-orange-500/30 rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                id={`menu-item-card-${product.id}`}
              >
                {/* Media Container with Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-zinc-950">
                  {/* Tags */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
                    {product.lto && (
                      <span className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-md tracking-wider flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" /> LTO
                      </span>
                    )}
                    {product.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-zinc-900/90 text-amber-500 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-zinc-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Nutrition small circular indicator */}
                  <button
                    onClick={() => setNutrientModalItem(product)}
                    className="absolute top-3 right-3 z-10 bg-zinc-900/95 hover:bg-orange-600 hover:text-white text-zinc-400 rounded-full p-1.5 transition-colors shadow-md cursor-pointer group/info"
                    title="View Nutritional Info"
                    id={`btn-view-nutrition-${product.id}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <img 
                    src={product.image} 
                    alt={product.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Subtle black scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Container */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="text-left">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 min-h-[32px] leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to plate panel */}
                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block leading-none">Price</span>
                      <span className="text-base font-black text-white">$ {product.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-zinc-800 hover:bg-[#FF4500] text-zinc-300 hover:text-white p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer transition-all duration-300 shadow-sm active:scale-95 border border-zinc-700/50 hover:border-[#FF4500]/50"
                      id={`btn-add-to-plate-${product.id}`}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add to Plate</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Dynamic Nutritional and Ingredients Detailed Modal */}
      <AnimatePresence>
        {nutrientModalItem && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setNutrientModalItem(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-left shadow-2xl z-10"
              id="nutrition-modal"
            >
              {/* Close button */}
              <button 
                onClick={() => setNutrientModalItem(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors"
                id="btn-close-nutrition-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-5 border-b border-zinc-800 pb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0">
                  <img src={nutrientModalItem.image} alt={nutrientModalItem.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[9px] text-[#FF4500] uppercase font-mono font-bold">Crown Nutrition Card</span>
                  <h3 className="font-extrabold text-sm text-white">{nutrientModalItem.name}</h3>
                </div>
              </div>

              {/* Nutritional block */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider mb-2">Nutritional Values</h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500 text-[10px] uppercase leading-none font-semibold">Calories</p>
                      <p className="font-extrabold text-[#FF4500] text-sm mt-1">{nutrientModalItem.nutrition.calories}</p>
                    </div>
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500 text-[10px] uppercase leading-none font-semibold">Protein</p>
                      <p className="font-extrabold text-zinc-200 text-sm mt-1">{nutrientModalItem.nutrition.protein}</p>
                    </div>
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500 text-[10px] uppercase leading-none font-semibold">Carbs</p>
                      <p className="font-extrabold text-zinc-200 text-sm mt-1">{nutrientModalItem.nutrition.carbs}</p>
                    </div>
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500 text-[10px] uppercase leading-none font-semibold">Fat</p>
                      <p className="font-extrabold text-zinc-200 text-sm mt-1">{nutrientModalItem.nutrition.fat}</p>
                    </div>
                  </div>
                </div>

                {/* Fresh Ingredients tags */}
                <div>
                  <h4 className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider mb-2">Recipe Composition</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {nutrientModalItem.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-zinc-800 text-zinc-300 text-xxs px-2.5 py-1 rounded-md border border-zinc-700/45">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-950/20 border border-orange-500/20 p-3 rounded-xl flex items-start gap-2.5">
                  <Flame className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-400 leading-normal">
                    This item is constructed from premium ingredients on dedicated cookware. Our flame-grilling process drains excess fats leaving you with authentic smoky tenderness.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 mt-6 pt-4 border-t border-zinc-800">
                <button 
                  onClick={() => {
                    onAddToCart(nutrientModalItem);
                    setNutrientModalItem(null);
                  }}
                  className="w-full bg-[#FF4500] hover:bg-orange-500 text-white font-extrabold py-3 rounded-full text-xs transition-colors cursor-pointer text-center"
                >
                  Add to Plate: ${nutrientModalItem.price.toFixed(2)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
