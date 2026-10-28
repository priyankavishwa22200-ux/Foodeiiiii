import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  Flame,
  ChefHat,
  Filter,
  Plus,
  Check,
  UtensilsCrossed,
  Sparkles,
  Users
} from 'lucide-react';
import { RECIPES_DATABASE } from '../data/recipesData';
import { Recipe } from '../types';
import { useNutrition } from '../context/NutritionContext';

interface RecipesPageProps {
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipesPage: React.FC<RecipesPageProps> = ({ onSelectRecipe }) => {
  const { addRecipeToLog } = useNutrition();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxTime, setMaxTime] = useState<number>(60);
  const [quickLoggedId, setQuickLoggedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Recipes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'high-protein', label: 'High-Protein Meals' },
    { id: 'indian', label: 'Indian Healthy Foods' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'quick-meal', label: 'Quick Meals (< 20m)' },
  ];

  const filteredRecipes = useMemo(() => {
    let result = [...RECIPES_DATABASE];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (r) =>
          r.category === selectedCategory ||
          r.subcategories.includes(selectedCategory as any)
      );
    }

    result = result.filter((r) => r.prepTimeMinutes + r.cookTimeMinutes <= maxTime);

    return result;
  }, [search, selectedCategory, maxTime]);

  const handleQuickLog = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    addRecipeToLog(recipe, recipe.category, 1);
    setQuickLoggedId(recipe.id);
    setTimeout(() => setQuickLoggedId(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Chef-Crafted Wholesome Meals
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
          Healthy Recipe Collection
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Delicious, balanced meals tailored for energy, lean protein, and gut health. Every recipe includes dynamic serving scalers and 1-click logging to your daily calorie tracker.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes by name or ingredient (e.g. Quinoa, Paneer, Salmon, Oats)..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          {/* Time Filter Slider */}
          <div className="md:col-span-4 bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Max Total Time:
              </span>
              <span className="text-emerald-700">{maxTime} minutes</span>
            </div>
            <input
              type="range"
              min="15"
              max="60"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
          const isJustLogged = quickLoggedId === recipe.id;

          return (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Recipe Hero Image */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                      {recipe.category}
                    </span>
                    {recipe.subcategories.includes('indian') && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                        Indian
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{totalTime}m</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold font-['Outfit'] drop-shadow-xs line-clamp-1">
                      {recipe.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Macronutrient Strip */}
                  <div className="grid grid-cols-4 gap-1.5 p-2 rounded-2xl bg-[#FFFDF5] border border-amber-100 text-center">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Energy</span>
                      <span className="text-xs font-black text-orange-600 block">
                        {recipe.caloriesPerServing}
                      </span>
                      <span className="text-[9px] text-gray-400">kcal</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Protein</span>
                      <span className="text-xs font-black text-blue-700 block">
                        {recipe.proteinPerServing}g
                      </span>
                      <span className="text-[9px] text-gray-400">g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Carbs</span>
                      <span className="text-xs font-black text-amber-700 block">
                        {recipe.carbsPerServing}g
                      </span>
                      <span className="text-[9px] text-gray-400">g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Fat</span>
                      <span className="text-xs font-black text-rose-700 block">
                        {recipe.fatPerServing}g
                      </span>
                      <span className="text-[9px] text-gray-400">g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectRecipe(recipe)}
                  className="flex-1 py-2 rounded-xl bg-gray-50 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-gray-200"
                >
                  View Steps & Scaler
                </button>
                <button
                  type="button"
                  onClick={(e) => handleQuickLog(e, recipe)}
                  title="Log 1 serving to meals"
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1 ${
                    isJustLogged
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isJustLogged ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Logged</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
