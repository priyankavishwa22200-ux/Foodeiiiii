import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Flame,
  Scale,
  Sparkles,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { FOOD_DATABASE } from '../data/nutritionData';
import { FoodCategory, DietTag, FoodItem } from '../types';
import { calculateNutrientsForGrams } from '../utils/nutritionCalculators';
import { useNutrition } from '../context/NutritionContext';

interface FoodDatabasePageProps {
  onSelectFood: (food: FoodItem) => void;
  onCompareWith: (foodId: string) => void;
}

export const FoodDatabasePage: React.FC<FoodDatabasePageProps> = ({
  onSelectFood,
  onCompareWith,
}) => {
  const { addFoodToLog } = useNutrition();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedDietTag, setSelectedDietTag] = useState<DietTag | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'calories_asc' | 'protein_desc' | 'carbs_asc' | 'fiber_desc'>('popular');

  const categories: { id: FoodCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'indian_staples', label: 'Indian Healthy Staples' },
    { id: 'proteins', label: 'Proteins & Meats' },
    { id: 'fruits', label: 'Fresh Fruits' },
    { id: 'vegetables', label: 'Vegetables & Greens' },
    { id: 'grains', label: 'Whole Grains & Cereals' },
    { id: 'legumes', label: 'Legumes & Lentils' },
    { id: 'dairy', label: 'Dairy & Plant Milks' },
    { id: 'nuts_seeds', label: 'Nuts & Seeds' },
  ];

  const dietTags: { id: DietTag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'high-protein', label: 'High-Protein' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'low-carb', label: 'Low-Carb' },
  ];

  const filteredFoods = useMemo(() => {
    let result = [...FOOD_DATABASE];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          (f.originOrStyle && f.originOrStyle.toLowerCase().includes(q)) ||
          f.healthBenefits.some((b) => b.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((f) => f.category === selectedCategory);
    }

    // Dietary filter
    if (selectedDietTag !== 'all') {
      result = result.filter((f) => f.dietaryTags.includes(selectedDietTag));
    }

    // Sorting
    if (sortBy === 'calories_asc') {
      result.sort((a, b) => a.per100g.calories - b.per100g.calories);
    } else if (sortBy === 'protein_desc') {
      result.sort((a, b) => b.per100g.protein - a.per100g.protein);
    } else if (sortBy === 'carbs_asc') {
      result.sort((a, b) => a.per100g.carbs - b.per100g.carbs);
    } else if (sortBy === 'fiber_desc') {
      result.sort((a, b) => b.per100g.fiber - a.per100g.fiber);
    }

    return result;
  }, [search, selectedCategory, selectedDietTag, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Comprehensive Nutrition Database
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
          Food Nutrition Database
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Search and explore complete nutritional profiles for fruits, grains, proteins, vegetables, and Indian staples. All values verified against standard USDA and ICMR datasets.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by food name, ingredient, benefit..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-5 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="protein_desc">Sort: Highest Protein (per 100g)</option>
              <option value="calories_asc">Sort: Lowest Calories (per 100g)</option>
              <option value="carbs_asc">Sort: Lowest Carbohydrates</option>
              <option value="fiber_desc">Sort: Highest Fiber</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-gray-100 pt-3">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Diet:
          </span>
          {dietTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedDietTag(tag.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedDietTag === tag.id
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-gray-100/70 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>Showing <strong>{filteredFoods.length}</strong> verified nutritional items</span>
        {(search || selectedCategory !== 'all' || selectedDietTag !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedDietTag('all');
            }}
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Food Cards Grid */}
      {filteredFoods.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No foods found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            We couldn't find any foods matching "{search}". Try searching for Paneer, Oats, Apple, Eggs, or clear your filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedDietTag('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => {
            const calculated = calculateNutrientsForGrams(food.per100g, food.servingDefaultGrams);
            return (
              <div
                key={food.id}
                className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay Tags */}
                  <div
                    onClick={() => onSelectFood(food)}
                    className="relative h-48 w-full overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs capitalize">
                        {food.category.replace('_', ' ')}
                      </span>
                      {food.originOrStyle && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                          {food.originOrStyle}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-emerald-800 shadow-xs">
                        GI: {food.glycemicIndex}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-base font-bold font-['Outfit'] drop-shadow-xs">
                        {food.name}
                      </h3>
                      <p className="text-[11px] text-white/90">
                        Default: {food.servingUnitLabel}
                      </p>
                    </div>
                  </div>

                  {/* Nutritional Grid */}
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-2xl bg-[#FFFDF5] border border-amber-100 text-center">
                      <div>
                        <span className="text-[10px] text-gray-500 block">Calories</span>
                        <span className="text-xs font-black text-orange-600 block">
                          {calculated.calories}
                        </span>
                        <span className="text-[9px] text-gray-400">kcal</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Protein</span>
                        <span className="text-xs font-black text-blue-700 block">
                          {calculated.protein}g
                        </span>
                        <span className="text-[9px] text-gray-400">g</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Carbs</span>
                        <span className="text-xs font-black text-amber-700 block">
                          {calculated.carbs}g
                        </span>
                        <span className="text-[9px] text-gray-400">g</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Fats</span>
                        <span className="text-xs font-black text-rose-700 block">
                          {calculated.fat}g
                        </span>
                        <span className="text-[9px] text-gray-400">g</span>
                      </div>
                    </div>

                    {/* Micronutrient teaser tags */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-600">
                      <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100">
                        Fiber: {calculated.fiber}g
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100">
                        Potassium: {calculated.potassium}mg
                      </span>
                      {calculated.calcium > 30 && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                          Calcium: {calculated.calcium}mg
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 pt-0 border-t border-gray-50 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectFood(food)}
                    className="flex-1 py-2 rounded-xl bg-gray-50 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-gray-200"
                  >
                    Details & Macros
                  </button>
                  <button
                    type="button"
                    onClick={() => onCompareWith(food.id)}
                    title="Compare with another food"
                    className="p-2 rounded-xl border border-gray-200 hover:border-emerald-300 text-gray-600 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => addFoodToLog(food, food.servingDefaultGrams, 'breakfast')}
                    title="Add 1 serving to Breakfast"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
