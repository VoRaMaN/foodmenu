import React, { useState } from 'react';
import { Search, Heart, Home, ShoppingBag, User, ArrowLeft, Plus, Minus, Check, Moon, Sun, ChevronDown, QrCode, CreditCard, Banknote, Globe, Trash2 } from 'lucide-react';
import { MENU_ITEMS } from './menuItems';

const TRANSLATIONS = {
  'All': 'ទាំងអស់',
  'Food': 'ម្ហូប',
  'Delivery to': 'ដឹកជញ្ជូនទៅកាន់',
  'Khmer Food': 'ម្ហូបខ្មែរ',
  'Search your favorite food...': 'ស្វែងរកម្ហូបដែលអ្នកចូលចិត្ត...',
  'Khmer Specials': 'មុខម្ហូបពិសេស',
  'Order Now': 'កុម្ម៉ង់ឥឡូវនេះ',
  'Featured': 'លេចធ្លោ',
  'See All': 'មើលទាំងអស់',
  'All Menu': 'ម៉ឺនុយទាំងអស់',
  'Favorites': 'ចំណូលចិត្ត',
  'No favorites added yet.': 'មិនទាន់មានចំណូលចិត្តទេ។',
  'Ingredients': 'គ្រឿងផ្សំ',
  'Add to Basket': 'បញ្ចូលទៅកន្ត្រក',
  'Order Detail': 'ព័ត៌មានលម្អិតការកម្ម៉ង់',
  'Your basket is empty.': 'កន្ត្រករបស់អ្នកទទេរ។',
  'Qty': 'ចំនួន',
  'Dine-in / Takeaway': 'ញ៉ាំនៅហាង / ខ្ចប់',
  'Takeaway': 'ខ្ចប់',
  'Table 1': 'តុទី ១',
  'Table 2': 'តុទី ២',
  'Table 3': 'តុទី ៣',
  'Table 4': 'តុទី ៤',
  'Table 5': 'តុទី ៥',
  'Payment Method': 'វិធីសាស្ត្រទូទាត់',
  'Cash': 'សាច់ប្រាក់',
  'Card': 'កាត',
  'ABA KHQR': 'ABA KHQR',
  'Scan to pay with ABA Mobile': 'ស្កេនដើម្បីទូទាត់ជាមួយ ABA Mobile',
  'Processing': 'កំពុងដំណើរការ',
  'Total': 'សរុប',
  'Shipping': 'សេវាដឹកជញ្ជូន',
  'Grand Total': 'សរុបរួម',
  'Confirm Checkout': 'បញ្ជាក់ការទូទាត់',
  'Home': 'ទំព័រដើម',
  'Orders': 'ការកម្ម៉ង់',
  'Appetizers': 'មុខម្ហូប',
  'One Plate': 'ម្ហូបចានមួយ',
  'Stir Fried': 'ម្ហូបឆា',
  'Deep Fried': 'ម្ហូបបំពង',
  'Soups': 'ស៊ុប',
  'Curry': 'ការី',
  'Salad & Steamed': 'សាឡាត និង ចំហុយ',
  'Desserts': 'បង្អែម'
};

export default function App() {
  const [language, setLanguage] = useState('EN'); // 'EN' or 'KH'
  const [view, setView] = useState('home'); // 'home', 'favorites', 'details', 'cart'
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([1, 2]); // Pre-populate some favorites
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [detailQty, setDetailQty] = useState(1);
  const [table, setTable] = useState('Takeaway');
  const [paymentMethod, setPaymentMethod] = useState('ABA KHQR');

  const categories = ['All', 'Food', 'Appetizers', 'One Plate', 'Stir Fried', 'Deep Fried', 'Soups', 'Curry', 'Salad & Steamed', 'Desserts'];
  const filteredItems = selectedCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === selectedCategory);

  // Translation Helper
  const t = (text) => language === 'EN' ? text : (TRANSLATIONS[text] || text);

  // Actions
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const openDetails = (item) => {
    setSelectedItem(item);
    setDetailQty(1);
    setView('details');
  };

  const quickAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleDetailedAdd = (item, qty) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...item, qty: qty }];
    });
    setView('home');
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty + delta };
      }
      return item;
    }).filter(item => item.qty > 0)); // Automatically removes item if qty reaches 0
  };

  const checkout = () => {
    const shippingFee = table === 'Takeaway' ? 2 : 0;
    const total = (cart.reduce((s, i) => s + (i.price * i.qty), 0) + shippingFee).toFixed(2);
    
    const successMsg = language === 'EN' 
      ? `Order sent to POS system!\n\nTable: ${table}\nPayment: ${paymentMethod}\nGrand Total: $${total}\n\nThank you for your order!`
      : `ការកម្ម៉ង់ត្រូវបានបញ្ជូនទៅកន្លែងគិតប្រាក់!\n\nតុ: ${t(table)}\nការទូទាត់: ${t(paymentMethod)}\nសរុបរួម: $${total}\n\nសូមអរគុណ!`;
      
    alert(successMsg);
    setCart([]);
    setView('home');
  };

  // Reusable Item Card Component
  const ItemCard = ({ item, layout = 'grid' }) => (
    <div 
      onClick={() => openDetails(item)}
      className={`cursor-pointer rounded-2xl overflow-hidden shadow-sm border p-2 md:p-3 flex flex-col transition-transform active:scale-95 ${darkMode ? 'bg-[#1c1c1c] border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-900'} ${layout === 'scroll' ? 'min-w-[160px] w-[160px] md:min-w-[220px] md:w-[220px]' : 'w-full'}`}
    >
      <div className="relative h-28 md:h-40 w-full rounded-xl overflow-hidden mb-3">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors ${favorites.includes(item.id) ? 'bg-purple-600 text-white' : 'bg-white/70 text-gray-500'}`}
        >
          <Heart size={14} className="md:w-5 md:h-5" fill={favorites.includes(item.id) ? "currentColor" : "none"} />
        </button>
      </div>
      <h4 className="font-bold text-sm md:text-base mb-1 truncate">{language === 'EN' ? item.name : item.nameKh}</h4>
      <p className={`text-xs md:text-sm line-clamp-2 mb-2 flex-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.ingredients.join(', ')}</p>
      <div className="flex justify-between items-center mt-auto pt-1">
        <span className="font-bold md:text-lg text-purple-500">${item.price.toFixed(2)}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); quickAddToCart(item); }}
          className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 md:p-2 rounded-full transition-colors"
        >
          <Plus size={16} className="md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`h-screen w-full flex justify-center font-sans ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} ${language === 'KH' ? 'font-suwannaphum' : ''}`}>
      {/* Hide native scrollbar but allow scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @import url('https://fonts.googleapis.com/css2?family=Suwannaphum:wght@400;700&display=swap');
        .font-suwannaphum { font-family: 'Suwannaphum', sans-serif; }
      `}} />

      {/* App Container */}
      <div className={`w-full max-w-7xl h-full relative flex flex-col overflow-hidden md:shadow-2xl ${darkMode ? 'bg-[#121212] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        
        {/* --- HOME VIEW --- */}
        {view === 'home' && (
          <div className="flex-1 overflow-y-auto pb-24 md:pb-32 no-scrollbar flex flex-col relative">
            {/* Header Area */}
            <div className="bg-purple-600 px-5 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16 md:rounded-b-[3rem] rounded-b-[2.5rem] shrink-0">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <div className="flex flex-col">
                  <span className="text-white/80 text-xs md:text-sm font-medium tracking-wider mb-0.5">{t('Delivery to')}</span>
                  <span className="text-white font-bold flex items-center gap-1 text-lg md:text-2xl">{t('Khmer Food')} <ChevronDown size={20}/></span>
                </div>
                <div className="flex gap-2 md:gap-4">
                  {/* Language Switcher Button */}
                  <button 
                    onClick={() => setLanguage(language === 'EN' ? 'KH' : 'EN')} 
                    className="bg-white/20 px-3 py-2 rounded-full text-white backdrop-blur-sm transition-colors hover:bg-white/30 flex items-center gap-1.5 font-bold text-sm md:text-base"
                  >
                    <Globe size={18} />
                    {language === 'EN' ? 'EN' : 'KH'}
                  </button>
                  <button onClick={() => setDarkMode(!darkMode)} className="bg-white/20 p-2.5 md:p-3 rounded-full text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button className="bg-white/20 p-2.5 md:p-3 rounded-full text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                    <User size={20} />
                  </button>
                </div>
              </div>
              <div className="relative max-w-2xl mx-auto">
                <input 
                  type="text" 
                  placeholder={t('Search your favorite food...')} 
                  className="w-full py-3.5 md:py-4 pl-12 pr-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none shadow-lg md:text-lg"
                />
                <Search className="absolute left-4 top-3.5 md:top-4 text-gray-400" size={20} />
              </div>
            </div>

            {/* Banner */}
            <div className="mx-5 md:mx-10 mt-[-24px] md:mt-[-32px] relative z-10 rounded-2xl md:rounded-3xl overflow-hidden h-36 md:h-64 shadow-lg border border-white/10 shrink-0">
              <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80" alt="Khmer Specials" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 md:p-12">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-3 leading-tight">
                    {language === 'EN' ? <React.Fragment>Khmer<br/>Specials</React.Fragment> : <React.Fragment>មុខម្ហូប<br/>ពិសេស</React.Fragment>}
                  </h2>
                  <button className="bg-purple-600 text-white text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 rounded-full mt-2 font-bold shadow-md hover:bg-purple-700 transition-colors">
                    {t('Order Now')}
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto gap-3 px-5 md:px-10 mt-8 md:mt-10 pb-2 no-scrollbar shrink-0">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`whitespace-nowrap px-5 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-colors shadow-sm
                    ${selectedCategory === c 
                      ? 'bg-purple-600 text-white' 
                      : darkMode ? 'bg-[#1c1c1c] text-gray-300 border border-gray-800 hover:bg-gray-800' : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'}`}
                >
                  {t(c)}
                </button>
              ))}
            </div>

            {/* Featured Horizontal List */}
            <div className="mt-6 md:mt-8 px-5 md:px-10 shrink-0">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="font-bold text-lg md:text-2xl">{t('Featured')}</h3>
                <button className="text-purple-500 font-semibold text-sm md:text-base hover:text-purple-600">{t('See All')}</button>
              </div>
              <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5 md:mx-0 md:px-0">
                {filteredItems.slice(0, 4).map(item => <ItemCard key={item.id} item={item} layout="scroll" />)}
              </div>
            </div>

            {/* All Menu Grid */}
            <div className="mt-2 md:mt-6 px-5 md:px-10 pb-6 md:pb-10 shrink-0">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="font-bold text-lg md:text-2xl">{t('All Menu')}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredItems.map(item => <ItemCard key={`grid-${item.id}`} item={item} />)}
              </div>
            </div>
          </div>
        )}

        {/* --- FAVORITES VIEW --- */}
        {view === 'favorites' && (
          <div className="flex-1 flex flex-col h-full">
            <div className={`p-5 md:p-8 pt-8 md:pt-12 flex items-center gap-4 md:gap-6 ${darkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
              <button onClick={() => setView('home')} className={`p-2 md:p-3 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl md:text-3xl font-bold">{t('Favorites')}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-5 md:p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-24 md:pb-32 no-scrollbar items-start content-start">
              {favorites.length === 0 ? (
                <div className={`col-span-full text-center mt-10 md:mt-20 md:text-lg ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('No favorites added yet.')}</div>
              ) : (
                MENU_ITEMS.filter(i => favorites.includes(i.id)).map(item => <ItemCard key={item.id} item={item} />)
              )}
            </div>
          </div>
        )}

        {/* --- DETAILS VIEW --- */}
        {view === 'details' && selectedItem && (
          <div className={`flex-1 flex flex-col h-full relative ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
            <div className="flex-1 overflow-y-auto pb-28 md:pb-0 no-scrollbar md:flex">
              <div className="relative h-[40vh] md:h-full md:w-1/2">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover rounded-b-[2.5rem] md:rounded-none md:rounded-br-[3rem]" />
                <div className="absolute top-0 left-0 w-full p-5 md:p-10 flex justify-between items-start pt-8 md:pt-12">
                  <button onClick={() => setView('home')} className="bg-black/30 backdrop-blur-md p-2.5 md:p-3 rounded-full text-white hover:bg-black/50 transition-colors">
                    <ArrowLeft size={22} className="md:w-6 md:h-6" />
                  </button>
                  <button onClick={() => toggleFavorite(selectedItem.id)} className="bg-black/30 backdrop-blur-md p-2.5 md:p-3 rounded-full text-white hover:bg-black/50 transition-colors">
                    <Heart size={22} className="md:w-6 md:h-6" fill={favorites.includes(selectedItem.id) ? "white" : "none"} />
                  </button>
                </div>
              </div>
              <div className="p-6 md:p-12 md:w-1/2 flex flex-col md:h-full">
                <div className="flex-1 overflow-y-auto no-scrollbar md:pr-4">
                  <h2 className="text-2.5xl md:text-4xl font-bold mb-2 md:mb-4">{language === 'EN' ? selectedItem.name : selectedItem.nameKh}</h2>
                  <p className="text-purple-500 text-2xl md:text-3xl font-bold mb-4 md:mb-6">${selectedItem.price.toFixed(2)}</p>
                  <p className={`text-sm md:text-base mb-6 md:mb-8 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedItem.description}</p>
                  
                  <h3 className="font-bold text-lg md:text-xl mb-4">{t('Ingredients')}</h3>
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-24">
                    {selectedItem.ingredients.map((ing, idx) => (
                      <label key={idx} className={`flex items-center gap-3 p-3.5 md:p-4 rounded-xl md:rounded-2xl border cursor-pointer transition-colors ${darkMode ? 'border-gray-800 bg-[#1c1c1c] hover:bg-[#252525]' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}>
                        <input type="checkbox" defaultChecked className="w-5 h-5 md:w-6 md:h-6 accent-purple-600 rounded cursor-pointer" />
                        <span className="text-sm md:text-base font-medium">{ing}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Desktop Add to Cart within the right panel */}
                <div className="hidden md:flex mt-auto pt-6 border-t dark:border-gray-800 items-center justify-between gap-6">
                   <div className={`flex items-center gap-4 rounded-full px-6 py-4 ${darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100'}`}>
                    <button onClick={() => setDetailQty(Math.max(1, detailQty - 1))} className={`p-1 hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><Minus size={20}/></button>
                    <span className="font-bold w-8 text-center text-lg">{detailQty}</span>
                    <button onClick={() => setDetailQty(detailQty + 1)} className={`p-1 hover:text-purple-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><Plus size={20}/></button>
                  </div>
                  <button 
                    onClick={() => handleDetailedAdd(selectedItem, detailQty)} 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 transition-colors text-white py-4 rounded-full font-bold shadow-lg shadow-purple-600/30 text-center text-lg"
                  >
                    {t('Add to Basket')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile Add to Cart Bar */}
            <div className={`md:hidden absolute bottom-0 w-full p-6 flex justify-between items-center rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${darkMode ? 'bg-[#1c1c1c] border-t border-gray-800' : 'bg-white'}`}>
              <div className={`flex items-center gap-4 rounded-full px-4 py-3 ${darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-100'}`}>
                <button onClick={() => setDetailQty(Math.max(1, detailQty - 1))} className={`p-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><Minus size={18}/></button>
                <span className="font-bold w-6 text-center">{detailQty}</span>
                <button onClick={() => setDetailQty(detailQty + 1)} className={`p-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><Plus size={18}/></button>
              </div>
              <button 
                onClick={() => handleDetailedAdd(selectedItem, detailQty)} 
                className="flex-1 ml-5 bg-purple-600 hover:bg-purple-700 transition-colors text-white py-4 rounded-full font-bold shadow-lg shadow-purple-600/30 text-center text-lg"
              >
                {t('Add to Basket')}
              </button>
            </div>
          </div>
        )}

        {/* --- CART / ORDER DETAIL VIEW --- */}
        {view === 'cart' && (
          <div className="flex-1 flex flex-col h-full">
            <div className={`p-5 md:p-8 pt-8 md:pt-12 flex items-center gap-4 md:gap-6 border-b ${darkMode ? 'bg-[#121212] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
              <button onClick={() => setView('home')} className={`p-2 md:p-3 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl md:text-3xl font-bold">{t('Order Detail')}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 md:p-10 pb-24 md:pb-32 no-scrollbar md:flex md:gap-10 md:items-start max-w-5xl md:mx-auto w-full">
              {cart.length === 0 ? (
                <div className={`w-full text-center mt-10 md:mt-20 md:text-lg ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <ShoppingBag size={64} className="mx-auto mb-6 opacity-20" />
                  {t('Your basket is empty.')}
                </div>
              ) : (
                <>
                  <div className="space-y-4 md:space-y-6 mb-8 md:mb-0 md:flex-1">
                    {cart.map(item => (
                      <div key={item.id} className={`flex gap-4 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-sm border relative ${darkMode ? 'bg-[#1c1c1c] border-gray-800' : 'bg-white border-gray-100'}`}>
                        <img src={item.image} alt={item.name} className="w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl object-cover" />
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-bold text-sm md:text-xl mb-1 pr-8">{language === 'EN' ? item.name : item.nameKh}</h4>
                          <div className="flex items-center gap-3 mb-2 md:mb-3 mt-1">
                            <button onClick={() => updateCartQty(item.id, -1)} className={`p-1 md:p-1.5 rounded-full transition-colors ${darkMode ? 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                              <Minus size={14} className="md:w-4 md:h-4" />
                            </button>
                            <span className="font-bold text-sm md:text-base w-5 text-center">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className={`p-1 md:p-1.5 rounded-full transition-colors ${darkMode ? 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                              <Plus size={14} className="md:w-4 md:h-4" />
                            </button>
                          </div>
                          <p className="font-bold text-purple-500 md:text-xl">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className={`absolute top-3 right-3 md:top-5 md:right-5 p-2 rounded-full transition-colors ${darkMode ? 'text-red-400 hover:bg-red-900/30' : 'text-red-500 hover:bg-red-50'}`}
                          title="Remove item"
                        >
                          <Trash2 size={18} className="md:w-5 md:h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="md:w-96 md:shrink-0 flex flex-col">
                    
                    {/* Table Selection */}
                    <div className="mb-6">
                      <h3 className="font-bold text-sm md:text-base mb-3">{t('Dine-in / Takeaway')}</h3>
                      <div className="relative">
                        <select 
                          value={table}
                          onChange={(e) => setTable(e.target.value)}
                          className={`w-full p-3.5 md:p-4 rounded-xl md:rounded-2xl appearance-none border font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${darkMode ? 'bg-[#1c1c1c] border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                        >
                          <option value="Takeaway">🛍️ {t('Takeaway')}</option>
                          <option value="Table 1">🍽️ {t('Table 1')}</option>
                          <option value="Table 2">🍽️ {t('Table 2')}</option>
                          <option value="Table 3">🍽️ {t('Table 3')}</option>
                          <option value="Table 4">🍽️ {t('Table 4')}</option>
                          <option value="Table 5">🍽️ {t('Table 5')}</option>
                        </select>
                        <ChevronDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} pointer-events-none`} />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                      <h3 className="font-bold text-sm md:text-base mb-3">{t('Payment Method')}</h3>
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        <button 
                          onClick={() => setPaymentMethod('Cash')}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${paymentMethod === 'Cash' ? 'bg-purple-50 border-purple-500 text-purple-600 dark:bg-purple-900/30 dark:border-purple-500 dark:text-purple-400' : (darkMode ? 'bg-[#1c1c1c] border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-500')}`}
                        >
                          <Banknote size={24} className="mb-1" />
                          <span className="text-xs font-bold">{t('Cash')}</span>
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('ABA KHQR')}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${paymentMethod === 'ABA KHQR' ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400' : (darkMode ? 'bg-[#1c1c1c] border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-500')}`}
                        >
                          <QrCode size={24} className="mb-1" />
                          <span className="text-[10px] sm:text-xs font-bold text-center">KHQR</span>
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('Card')}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${paymentMethod === 'Card' ? 'bg-purple-50 border-purple-500 text-purple-600 dark:bg-purple-900/30 dark:border-purple-500 dark:text-purple-400' : (darkMode ? 'bg-[#1c1c1c] border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-500')}`}
                        >
                          <CreditCard size={24} className="mb-1" />
                          <span className="text-xs font-bold">{t('Card')}</span>
                        </button>
                      </div>
                      
                      {/* ABA KHQR Mock View */}
                      {paymentMethod === 'ABA KHQR' && (
                        <div className={`mt-3 p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-inner ${darkMode ? 'bg-[#151a23] border-blue-900/50' : 'bg-blue-50/50 border-blue-100'}`}>
                          <div className="bg-white p-2 rounded-xl shadow-sm mb-2">
                            <QrCode size={72} strokeWidth={1.5} className="text-blue-600" />
                          </div>
                          <span className="text-xs font-bold text-blue-700 dark:text-blue-400">{t('Scan to pay with ABA Mobile')}</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-5 md:p-8 rounded-2xl md:rounded-3xl mb-8 shadow-sm border ${darkMode ? 'bg-[#1c1c1c] border-gray-800' : 'bg-white border-gray-100'}`}>
                      <div className={`flex items-center gap-4 pb-4 md:pb-6 mb-4 md:mb-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                        <div className="bg-purple-100 dark:bg-purple-900/40 p-2.5 md:p-4 rounded-full text-purple-600 dark:text-purple-400">
                          <Check size={24} />
                        </div>
                        <div>
                          <span className="font-bold block text-sm md:text-lg">{t('Processing')}</span>
                          <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-5 text-sm md:text-base">
                        <div className="flex justify-between"><span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{t('Total')}</span> <span className="font-semibold">${cart.reduce((s, i) => s + (i.price * i.qty), 0).toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{t('Shipping')}</span> <span className="font-semibold">${(table === 'Takeaway' ? 2 : 0).toFixed(2)}</span></div>
                        <div className={`flex justify-between items-center pt-4 md:pt-6 mt-2 md:mt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                          <span className="font-bold text-lg md:text-xl">{t('Grand Total')}</span>
                          <span className="font-bold text-xl md:text-3xl text-purple-500">${(cart.reduce((s, i) => s + (i.price * i.qty), 0) + (table === 'Takeaway' ? 2 : 0)).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={checkout} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold shadow-lg shadow-purple-600/30 text-lg md:text-xl transition-transform active:scale-95">
                      {t('Confirm Checkout')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* --- BOTTOM NAVIGATION (Floating on Desktop) --- */}
        {['home', 'favorites', 'cart'].includes(view) && (
          <div className={`absolute bottom-0 md:bottom-6 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2 px-8 py-4 flex justify-between items-center rounded-t-[2.5rem] md:rounded-[2.5rem] md:border md:shadow-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.08)] z-50 transition-colors duration-200 ${darkMode ? 'bg-[#1c1c1c] md:border-gray-800' : 'bg-white md:border-gray-100'}`}>
            <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 hover:opacity-80 p-2 ${view === 'home' ? 'text-purple-600' : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <Home size={24} className={view === 'home' ? 'text-purple-600 drop-shadow-sm' : ''} />
              <span className={`text-[10px] md:text-xs font-bold ${view === 'home' ? 'text-purple-600' : ''}`}>{t('Home')}</span>
            </button>
            <button onClick={() => setView('favorites')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 hover:opacity-80 p-2 ${view === 'favorites' ? 'text-purple-600' : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <Heart size={24} className={view === 'favorites' ? 'text-purple-600 drop-shadow-sm' : ''} />
              <span className={`text-[10px] md:text-xs font-bold ${view === 'favorites' ? 'text-purple-600' : ''}`}>{t('Favorites')}</span>
            </button>
            <button onClick={() => setView('cart')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 hover:opacity-80 p-2 ${view === 'cart' ? 'text-purple-600' : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
              <div className="relative">
                <ShoppingBag size={24} className={view === 'cart' ? 'text-purple-600 drop-shadow-sm' : ''} />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                    {cart.reduce((sum, i) => sum + i.qty, 0)}
                  </span>
                )}
              </div>
              <span className={`text-[10px] md:text-xs font-bold ${view === 'cart' ? 'text-purple-600' : ''}`}>{t('Orders')}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}