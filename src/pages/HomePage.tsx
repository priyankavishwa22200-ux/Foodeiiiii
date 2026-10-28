import React, { useState } from 'react';
import {
  ArrowRight,
  Flame,
  Zap,
  Wheat,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Search,
  Scale,
  UtensilsCrossed,
  Calculator,
  Layers,
  HeartHandshake,
  TrendingUp,
  Apple as AppleIcon,
  BookOpen
} from 'lucide-react';
import { FOOD_DATABASE, NUTRIENT_DESCRIPTIONS } from '../data/nutritionData';
import { RECIPES_DATABASE } from '../data/recipesData';
import { BLOG_POSTS } from '../data/blogData';
import { FoodItem, Recipe } from '../types';
import { NavTab } from '../components/Navbar';
import { calculateNutrientsForGrams } from '../utils/nutritionCalculators';
import { useNutrition } from '../context/NutritionContext';

interface HomePageProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectFood: (food: FoodItem) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onSelectFood,
  onSelectRecipe,
}) => {
  const { addFoodToLog } = useNutrition();

  // Highlight specific requested popular foods: Apple, Banana, Eggs, Oats, Almonds, Spinach, Broccoli, Paneer
  const popularFoodIds = ['apple', 'banana', 'eggs', 'oats', 'almonds', 'spinach', 'broccoli', 'paneer'];
  const popularFoods = FOOD_DATABASE.filter((f) => popularFoodIds.includes(f.id));

  // Interactive Mini Calculator Widget State
  const [calcFoodId, setCalcFoodId] = useState('apple');
  const [calcGrams, setCalcGrams] = useState(150);
  const selectedCalcfood = FOOD_DATABASE.find((f) => f.id === calcFoodId) || FOOD_DATABASE[0];
  const calculatedLive = calculateNutrientsForGrams(selectedCalcfood.per100g, calcGrams);

  // Quick search in hero
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectTab('database');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-[#FFFDF5] via-emerald-50/40 to-white">
        {/* Subtle decorative background blur orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Science-Backed Nutrition & Calorie Tracking</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12] font-['Outfit']">
                Eat Better. <br className="hidden sm:inline" />
                Feel Better. <br className="hidden sm:inline" />
                <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  Live Better.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover the nutrition behind every bite and make healthier choices every day. Calculate macros, track calories in real-time, explore wholesome Indian & global recipes, and build sustainable wellness.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onSelectTab('database')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02]"
                >
                  <span>Explore Nutrition</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTab('recipes')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-200/90 font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:border-emerald-400"
                >
                  <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                  <span>Discover Healthy Recipes</span>
                </button>
              </div>

              {/* Fast Food Search Bar */}
              <form
                onSubmit={handleHeroSearchSubmit}
                className="max-w-md mx-auto lg:mx-0 pt-3"
              >
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search any food (e.g. Paneer, Oats, Apple, Dal)..."
                    className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl pl-11 pr-28 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Lookup
                  </button>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>USDA & ICMR Nutrients</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Portion Scaler</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free & Private</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Food Showcase Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                      alt="Vibrant healthy nutritional bowl"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600/90 uppercase tracking-wider backdrop-blur-xs">
                        Balanced Plate
                      </span>
                      <h3 className="text-xl font-bold mt-1 font-['Outfit']">
                        Quinoa & Herb Paneer Bowl
                      </h3>
                      <p className="text-xs text-white/90">
                        420 kcal • 24g Protein • 7g Fiber
                      </p>
                    </div>
                  </div>

                  {/* Quick preview stats */}
                  <div className="p-4 bg-white grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-900 font-semibold">
                      <span className="block text-[10px] text-orange-600">Calories</span>
                      <span className="text-sm font-bold">420 kcal</span>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-900 font-semibold">
                      <span className="block text-[10px] text-blue-600">Protein</span>
                      <span className="text-sm font-bold">24g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 font-semibold">
                      <span className="block text-[10px] text-emerald-600">Fiber</span>
                      <span className="text-sm font-bold">7g</span>
                    </div>
                  </div>
                </div>

                {/* Floating Capsule 1 */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 animate-bounce [animation-duration:3s]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <AppleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Featured Snack</span>
                    <h4 className="text-xs font-bold text-gray-900">Fresh Apple (182g)</h4>
                    <span className="text-[11px] font-semibold text-emerald-600">95 kcal • 4.4g Fiber</span>
                  </div>
                </div>

                {/* Floating Capsule 2 */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Live Precision</span>
                    <h4 className="text-xs font-bold text-gray-900">Smart Portion Scaler</h4>
                    <span className="text-[11px] font-semibold text-orange-600">Instant Micronutrients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUTRITION HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Nutritional Foundations
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
            Master the Building Blocks of Nutrition
          </h2>
          <p className="text-sm text-gray-600">
            Understanding key macronutrients and vitamins unlocks mindful, long-lasting wellness without restrictive diets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {NUTRIENT_DESCRIPTIONS.map((item) => (
            <div
              key={item.key}
              className="p-5 rounded-3xl bg-white border border-gray-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center text-emerald-700 mb-4">
                  {item.key === 'calories' && <Flame className="w-6 h-6" />}
                  {item.key === 'protein' && <Zap className="w-6 h-6" />}
                  {item.key === 'carbs' && <Wheat className="w-6 h-6" />}
                  {item.key === 'fat' && <HeartHandshake className="w-6 h-6" />}
                  {item.key === 'vitamins' && <Sparkles className="w-6 h-6" />}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1 font-['Outfit']">
                  {item.title}
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                  Measured in {item.unit}
                </span>

                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  {item.role}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-500 leading-snug block">
                  <strong className="text-gray-700">Target:</strong> {item.guideline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR HEALTHY FOODS (Apple, Banana, Eggs, Oats, Almonds, Spinach, Broccoli, Paneer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Everyday Essentials
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Outfit'] mt-2">
              Popular Healthy Foods
            </h2>
            <p className="text-sm text-gray-600">
              Verified nutritional data for your daily dietary staples. Click any card for the full breakdown.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('database')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-xl border border-emerald-200 hover:border-emerald-300 shadow-2xs"
          >
            <span>View All 50+ Foods</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Popular Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularFoods.map((food) => {
            const calculated = calculateNutrientsForGrams(food.per100g, food.servingDefaultGrams);
            return (
              <div
                key={food.id}
                className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Food Image */}
                  <div
                    onClick={() => onSelectFood(food)}
                    className="relative h-44 w-full overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs capitalize">
                        {food.category.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-emerald-800 shadow-xs">
                        {food.glycemicIndex} GI
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3
                        onClick={() => onSelectFood(food)}
                        className="text-base font-bold text-gray-900 hover:text-emerald-700 cursor-pointer transition-colors font-['Outfit']"
                      >
                        {food.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        Serving: {food.servingUnitLabel}
                      </p>
                    </div>

                    {/* Macronutrient Grid */}
                    <div className="grid grid-cols-4 gap-1.5 p-2 rounded-2xl bg-[#FFFDF5] border border-amber-100/80 text-center">
                      <div>
                        <span className="text-[10px] text-gray-500 block">Energy</span>
                        <span className="text-xs font-extrabold text-orange-600 block">
                          {calculated.calories}
                        </span>
                        <span className="text-[9px] text-gray-400">kcal</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Protein</span>
                        <span className="text-xs font-extrabold text-blue-700 block">
                          {calculated.protein}g
                        </span>
                        <span className="text-[9px] text-gray-400">g</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Carbs</span>
                        <span className="text-xs font-extrabold text-amber-700 block">
                          {calculated.carbs}g
                        </span>
                        <span className="text-[9px] text-gray-400">g</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Fat</span>
                        <span className="text-xs font-extrabold text-rose-700 block">
                          {calculated.fat}g
                        </span>
                        <span className="text-[9px] text-gray-400">g</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectFood(food)}
                    className="flex-1 py-2 rounded-xl bg-gray-50 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-gray-200"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => addFoodToLog(food, food.servingDefaultGrams, 'snack')}
                    title="Quick log 1 serving"
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    + Log
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE MINI CALCULATOR WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-emerald-300 border border-emerald-700">
                Interactive Food Nutrition Calculator
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                Estimate Nutrients with Precision
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                Test our calculator right now. Select a food item, slide or input any serving size in grams, and watch the calories, protein, carbohydrates, and fats recalculate dynamically in real-time.
              </p>
              <button
                onClick={() => onSelectTab('calculator')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Open Full Daily Meal Log Builder</span>
              </button>
            </div>

            {/* Right Interactive Box */}
            <div className="lg:col-span-7 bg-white text-gray-900 p-6 rounded-2xl shadow-xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Select Sample Food:
                  </label>
                  <select
                    value={calcFoodId}
                    onChange={(e) => setCalcFoodId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {FOOD_DATABASE.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-gray-700">Serving Size (Grams):</label>
                    <span className="text-xs font-extrabold text-emerald-700">{calcGrams}g</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={calcGrams}
                    onChange={(e) => setCalcGrams(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>10g</span>
                    <span>250g</span>
                    <span>500g</span>
                  </div>
                </div>
              </div>

              {/* Calculated Results Bar */}
              <div className="p-4 rounded-xl bg-[#FFFDF5] border border-amber-200/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedCalcfood.image}
                      alt={selectedCalcfood.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        {selectedCalcfood.name}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Calculated for {calcGrams} grams
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addFoodToLog(selectedCalcfood, calcGrams, 'lunch')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Add to Log
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Calories</span>
                    <span className="text-base font-extrabold text-orange-600">
                      {calculatedLive.calories}
                    </span>
                    <span className="text-[9px] text-gray-400">kcal</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Protein</span>
                    <span className="text-base font-extrabold text-blue-700">
                      {calculatedLive.protein}g
                    </span>
                    <span className="text-[9px] text-gray-400">grams</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Carbs</span>
                    <span className="text-base font-extrabold text-amber-700">
                      {calculatedLive.carbs}g
                    </span>
                    <span className="text-[9px] text-gray-400">grams</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-500 block">Fat</span>
                    <span className="text-base font-extrabold text-rose-700">
                      {calculatedLive.fat}g
                    </span>
                    <span className="text-[9px] text-gray-400">grams</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HEALTHY RECIPES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Kitchen Inspiration
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Outfit'] mt-2">
              Featured Healthy Recipes
            </h2>
            <p className="text-sm text-gray-600">
              Nutrient-dense meals with dynamic serving scalers and full step-by-step cooking guides.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('recipes')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-xl border border-emerald-200 hover:border-emerald-300 shadow-2xs"
          >
            <span>Explore All Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECIPES_DATABASE.slice(0, 3).map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 font-['Outfit'] group-hover:text-emerald-700 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between text-xs font-semibold py-2.5 px-3 rounded-xl bg-[#FFFDF5] border border-amber-100">
                  <span className="text-orange-700 font-bold">{recipe.caloriesPerServing} kcal</span>
                  <span className="text-blue-700 font-bold">{recipe.proteinPerServing}g protein</span>
                  <span className="text-emerald-700">View Recipe →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EDUCATIONAL BLOG HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Evidence-Based Insights
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Outfit'] mt-2">
              Nutrition Science & Myths
            </h2>
            <p className="text-sm text-gray-600">
              Read articles written by registered dietitians demystifying metabolism, meal planning, and whole foods.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('blog')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-xl border border-emerald-200 hover:border-emerald-300 shadow-2xs"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectTab('blog')}
              className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-emerald-800 shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-gray-400 font-medium">{post.readTime}</span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 font-['Outfit'] group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50">
                <span className="font-semibold text-gray-700">{post.author.name}</span>
                <span className="text-emerald-700 font-bold group-hover:underline">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
