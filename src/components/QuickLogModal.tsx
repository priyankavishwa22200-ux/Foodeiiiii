import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Check, Scale } from 'lucide-react';
import { FOOD_DATABASE } from '../data/nutritionData';
import { FoodItem } from '../types';
import { useNutrition } from '../context/NutritionContext';
import { calculateNutrientsForGrams } from '../utils/nutritionCalculators';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDetailedFood?: (food: FoodItem) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  onOpenDetailedFood,
}) => {
  const { addFoodToLog } = useNutrition();
  const [search, setSearch] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [loggedToast, setLoggedToast] = useState(false);

  const filteredFoods = useMemo(() => {
    if (!search.trim()) return FOOD_DATABASE.slice(0, 10);
    const q = search.toLowerCase();
    return FOOD_DATABASE.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.dietaryTags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  if (!isOpen) return null;

  const currentFood = selectedFood || filteredFoods[0] || FOOD_DATABASE[0];
  const nutrients = calculateNutrientsForGrams(currentFood.per100g, grams);

  const handleLog = () => {
    addFoodToLog(currentFood, grams, selectedMeal);
    setLoggedToast(true);
    setTimeout(() => {
      setLoggedToast(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-['Outfit']">
              Quick Log Food
            </h3>
            <p className="text-xs text-gray-500">
              Search and add items directly to your daily meals
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meal Selector */}
        <div className="flex items-center justify-between bg-[#FFFDF5] p-3 rounded-2xl border border-amber-100/80">
          <span className="text-xs font-bold text-gray-700">Select Meal Slot:</span>
          <div className="flex gap-1.5">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((meal) => (
              <button
                key={meal}
                type="button"
                onClick={() => setSelectedMeal(meal)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                  selectedMeal === meal
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300'
                }`}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Apple, Oats, Paneer, Chicken, Dal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            autoFocus
          />
        </div>

        {/* Food Candidates List */}
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 divide-y divide-gray-50">
          {filteredFoods.map((f) => {
            const isSelected = (selectedFood ? selectedFood.id : currentFood.id) === f.id;
            return (
              <div
                key={f.id}
                onClick={() => {
                  setSelectedFood(f);
                  setGrams(f.servingDefaultGrams || 100);
                }}
                className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                      {f.name}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {f.per100g.calories} kcal / 100g • {f.per100g.protein}g protein
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 capitalize bg-emerald-50/80 px-2 py-0.5 rounded-md">
                  {f.category.replace('_', ' ')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Portion Adjuster for selected food */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Portion for {currentFood.name}:</span>
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="5"
                max="1000"
                step="5"
                value={grams}
                onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                className="w-20 text-right font-bold text-emerald-900 bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs"
              />
              <span className="text-xs font-bold text-gray-600">grams</span>
            </div>
          </div>

          {/* Quick nutrient preview */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 block">Calories</span>
              <span className="font-extrabold text-orange-600">{nutrients.calories}</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 block">Protein</span>
              <span className="font-extrabold text-blue-600">{nutrients.protein}g</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 block">Carbs</span>
              <span className="font-extrabold text-amber-600">{nutrients.carbs}g</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 block">Fat</span>
              <span className="font-extrabold text-rose-600">{nutrients.fat}g</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {onOpenDetailedFood && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDetailedFood(currentFood);
              }}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              View Full Micronutrients →
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLog}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ${
                loggedToast
                  ? 'bg-emerald-800'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
              }`}
            >
              {loggedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Logged!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to {selectedMeal} ({nutrients.calories} kcal)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
