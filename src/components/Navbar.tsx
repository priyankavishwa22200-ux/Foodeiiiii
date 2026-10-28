import React, { useState } from 'react';
import {
  Apple,
  Calculator,
  UtensilsCrossed,
  LayoutDashboard,
  Columns2,
  BookOpen,
  Info,
  Menu,
  X,
  User,
  PlusCircle,
  Flame,
  Droplets,
  Heart
} from 'lucide-react';
import { useNutrition } from '../context/NutritionContext';

export type NavTab =
  | 'home'
  | 'database'
  | 'calculator'
  | 'recipes'
  | 'dashboard'
  | 'compare'
  | 'blog'
  | 'about';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuickLog: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickLog,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dailyTotals, userProfile, waterDrankMl } = useNutrition();

  const navLinks: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Heart className="w-4 h-4" /> },
    { id: 'database', label: 'Food Database', icon: <Apple className="w-4 h-4" /> },
    { id: 'calculator', label: 'Nutrition Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Daily Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'recipes', label: 'Healthy Recipes', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'compare', label: 'Compare Foods', icon: <Columns2 className="w-4 h-4" /> },
    { id: 'blog', label: 'Nutrition Blog', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'about', label: 'About & Contact', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calPercent = Math.min(100, Math.round((dailyTotals.calories / userProfile.goals.dailyCalories) * 100));

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      {/* Top Banner Alert for Health awareness */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>NutriLife Clinical Data: Science-backed nutrition estimates and balanced eating guidelines.</span>
        <button
          onClick={() => handleNavClick('about')}
          className="underline hover:text-white transition-colors cursor-pointer text-emerald-300 ml-1 font-semibold"
        >
          Medical Disclaimer
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-gray-900 font-['Outfit']">
                  Nutri<span className="text-emerald-700">Life</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
                  Health
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">
                Eat Smart, Live Healthy
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                      : 'text-gray-700 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Tracking Stats & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Calorie Capsule (Click opens Dashboard) */}
            <button
              onClick={() => handleNavClick('dashboard')}
              title="View Daily Dashboard"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-emerald-200/80 hover:border-emerald-300 shadow-xs cursor-pointer group transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              </div>
              <div className="text-left text-xs">
                <div className="flex items-center gap-1 font-bold text-gray-800">
                  <span>{dailyTotals.calories}</span>
                  <span className="text-gray-400 font-normal">/ {userProfile.goals.dailyCalories} kcal</span>
                </div>
                <div className="w-20 bg-gray-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div
                    className={`h-full rounded-full transition-all ${
                      calPercent > 100 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, calPercent)}%` }}
                  ></div>
                </div>
              </div>
            </button>

            {/* Quick Log Button */}
            <button
              onClick={onOpenQuickLog}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all cursor-pointer hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Log Food</span>
              <span className="sm:hidden">Log</span>
            </button>

            {/* Profile / Goal Settings Avatar */}
            <button
              onClick={onOpenProfile}
              title="User Goals & Profile"
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 hover:border-emerald-300 bg-white shadow-xs cursor-pointer transition-all"
            >
              <img
                src={userProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={userProfile.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/30"
              />
              <span className="text-xs font-semibold text-gray-800 hidden sm:inline">
                {userProfile.name.split(' ')[0]}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF5] border-b border-emerald-100 px-4 pt-2 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="p-3 bg-white rounded-2xl border border-emerald-100 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-medium text-gray-600">Today's Intake:</span>
              <span className="text-xs font-bold text-gray-900">{dailyTotals.calories} kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-500" />
              <span className="text-xs font-bold text-gray-900">{waterDrankMl} ml</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="flex-1 py-2.5 px-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Goal & Profile</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickLog();
              }}
              className="flex-1 py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Food Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
