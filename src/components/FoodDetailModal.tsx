import React, { useState } from 'react';
import { X, Plus, Check, Scale, ShieldCheck, Flame, PieChart, Sparkles, ArrowRightLeft } from 'lucide-react';
import { FoodItem } from '../types';
import { calculateNutrientsForGrams } from '../utils/nutritionCalculators';
import { useNutrition } from '../context/NutritionContext';

interface FoodDetailModalProps {
  food: FoodItem | null;
  onClose: () => void;
  onCompareWith?: (foodId: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  onClose,
  onCompareWith,
}) => {
  if (!food) return null;

  const { addFoodToLog } = useNutrition();
  const [grams, setGrams] = useState<number>(food.servingDefaultGrams || 100);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [addedToast, setAddedToast] = useState(false);

  const calculated = calculateNutrientsForGrams(food.per100g, grams);

  // Macro calorie contributions
  const proteinKcal = calculated.protein * 4;
  const carbsKcal = calculated.carbs * 4;
  const fatKcal = calculated.fat * 9;
  const totalMacroKcal = Math.max(1, proteinKcal + carbsKcal + fatKcal);

  const proteinPct = Math.round((proteinKcal / totalMacroKcal) * 100);
  const carbsPct = Math.round((carbsKcal / totalMacroKcal) * 100);
  const fatPct = Math.round((fatKcal / totalMacroKcal) * 100);

  const handleLog = () => {
    addFoodToLog(food, grams, selectedMeal);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Header Image & Close */}
        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600/90 text-white backdrop-blur-xs">
                {food.category.replace('_', ' ')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
                GI: {food.glycemicIndex}
              </span>
              {food.originOrStyle && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/80 text-white">
                  {food.originOrStyle}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold tracking-tight font-['Outfit']">
              {food.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Serving Size Adjuster */}
          <div className="bg-[#FFFDF5] p-4 rounded-2xl border border-amber-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Adjust Serving Size (Grams):</span>
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="5"
                  max="1000"
                  step="5"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-right font-bold text-emerald-800 bg-white border border-emerald-200 rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-gray-600">grams</span>
              </div>
            </div>

            {/* Serving Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: '50g', val: 50 },
                { label: '100g (Standard)', val: 100 },
                { label: food.servingUnitLabel, val: food.servingDefaultGrams },
                { label: '150g', val: 150 },
                { label: '200g', val: 200 },
              ].map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setGrams(p.val)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    grams === p.val
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Macronutrient Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-100 text-center">
              <span className="text-xs font-semibold text-orange-700 block">Energy</span>
              <span className="text-2xl font-extrabold text-orange-950 block">
                {calculated.calories}
              </span>
              <span className="text-[11px] text-orange-600">kcal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 text-center">
              <span className="text-xs font-semibold text-blue-700 block">Protein</span>
              <span className="text-2xl font-extrabold text-blue-950 block">
                {calculated.protein}g
              </span>
              <span className="text-[11px] text-blue-600">{proteinPct}% of energy</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-100 text-center">
              <span className="text-xs font-semibold text-amber-700 block">Carbohydrates</span>
              <span className="text-2xl font-extrabold text-amber-950 block">
                {calculated.carbs}g
              </span>
              <span className="text-[11px] text-amber-600">{carbsPct}% of energy</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-100 text-center">
              <span className="text-xs font-semibold text-rose-700 block">Fats</span>
              <span className="text-2xl font-extrabold text-rose-950 block">
                {calculated.fat}g
              </span>
              <span className="text-[11px] text-rose-600">{fatPct}% of energy</span>
            </div>
          </div>

          {/* Caloric Distribution Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-1.5">
              <span>Energy Contribution Ratio</span>
              <span>Protein / Carbs / Fat</span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex">
              <div
                style={{ width: `${proteinPct}%` }}
                className="bg-blue-500 h-full transition-all"
                title={`Protein: ${proteinPct}%`}
              />
              <div
                style={{ width: `${carbsPct}%` }}
                className="bg-amber-500 h-full transition-all"
                title={`Carbs: ${carbsPct}%`}
              />
              <div
                style={{ width: `${fatPct}%` }}
                className="bg-rose-500 h-full transition-all"
                title={`Fat: ${fatPct}%`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span className="text-blue-700 font-medium">● Protein {proteinPct}%</span>
              <span className="text-amber-700 font-medium">● Carbs {carbsPct}%</span>
              <span className="text-rose-700 font-medium">● Fat {fatPct}%</span>
            </div>
          </div>

          {/* Detailed Nutrient Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-emerald-600" />
              <span>Full Nutrient Breakdown ({grams}g)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Dietary Fiber</span>
                <span className="font-bold text-gray-800">{calculated.fiber} g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Natural Sugars</span>
                <span className="font-bold text-gray-800">{calculated.sugar} g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Sodium</span>
                <span className="font-bold text-gray-800">{calculated.sodium} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Potassium</span>
                <span className="font-bold text-gray-800">{calculated.potassium} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Calcium</span>
                <span className="font-bold text-gray-800">{calculated.calcium} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Iron</span>
                <span className="font-bold text-gray-800">{calculated.iron} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Vitamin C</span>
                <span className="font-bold text-gray-800">{calculated.vitaminC} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Vitamin A</span>
                <span className="font-bold text-gray-800">{calculated.vitaminA} mcg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Glycemic Index</span>
                <span className="font-bold text-emerald-700">{food.glycemicIndex}</span>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Evidence-Based Health Benefits</span>
            </h4>
            <ul className="space-y-1.5">
              {food.healthBenefits.map((benefit, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row: Log Food and Compare */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-xs font-semibold text-gray-600">Meal:</label>
                <select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 text-xs font-semibold rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onCompareWith && (
                  <button
                    type="button"
                    onClick={() => {
                      onCompareWith(food.id);
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-300 text-xs font-bold text-gray-700 hover:text-emerald-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Compare</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleLog}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                    addedToast
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Daily Log!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Daily Log ({calculated.calories} kcal)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
