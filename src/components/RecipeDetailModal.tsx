import React, { useState } from 'react';
import { X, Clock, Users, Flame, Plus, Check, CheckSquare, Square, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types';
import { useNutrition } from '../context/NutritionContext';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
}) => {
  if (!recipe) return null;

  const { addRecipeToLog } = useNutrition();
  const [servings, setServings] = useState<number>(recipe.servingsDefault);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [addedToast, setAddedToast] = useState(false);

  const scaleFactor = servings / recipe.servingsDefault;

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLogRecipe = () => {
    addRecipeToLog(recipe, selectedMeal, 1); // 1 portion for user
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Header Photo */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white">
                {recipe.category}
              </span>
              {recipe.subcategories.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs capitalize"
                >
                  {sub.replace('-', ' ')}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-['Outfit']">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFFDF5] border border-amber-100">
            <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Prep: {recipe.prepTimeMinutes}m | Cook: {recipe.cookTimeMinutes}m</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{recipe.caloriesPerServing} kcal / serving</span>
              </div>
            </div>

            {/* Serving Scaler */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">Servings:</span>
              <button
                type="button"
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-6 h-6 rounded-md bg-gray-100 hover:bg-emerald-100 text-gray-800 font-bold flex items-center justify-center text-xs cursor-pointer"
              >
                -
              </button>
              <span className="w-5 text-center text-sm font-bold text-emerald-800">
                {servings}
              </span>
              <button
                type="button"
                onClick={() => setServings(Math.min(12, servings + 1))}
                className="w-6 h-6 rounded-md bg-gray-100 hover:bg-emerald-100 text-gray-800 font-bold flex items-center justify-center text-xs cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{recipe.description}</p>

          {/* Macro Nutrition per Serving */}
          <div className="grid grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-100">
              <span className="text-[11px] font-semibold text-orange-700 block">Calories</span>
              <span className="text-lg font-black text-orange-950">{recipe.caloriesPerServing}</span>
              <span className="text-[10px] text-orange-600">kcal</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-700 block">Protein</span>
              <span className="text-lg font-black text-blue-950">{recipe.proteinPerServing}g</span>
              <span className="text-[10px] text-blue-600">per serving</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-100">
              <span className="text-[11px] font-semibold text-amber-700 block">Carbs</span>
              <span className="text-lg font-black text-amber-950">{recipe.carbsPerServing}g</span>
              <span className="text-[10px] text-amber-600">per serving</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-100">
              <span className="text-[11px] font-semibold text-rose-700 block">Healthy Fat</span>
              <span className="text-lg font-black text-rose-950">{recipe.fatPerServing}g</span>
              <span className="text-[10px] text-rose-600">per serving</span>
            </div>
          </div>

          {/* Ingredients with Dynamic Scaler */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-600" />
                <span>Ingredients</span>
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                Scaled for {servings} serving{servings > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, idx) => {
                const scaledAmount = Math.round((ing.amount * scaleFactor) * 10) / 10;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-800 font-medium">{ing.name}</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                      {scaledAmount} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Instructions with Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span>Cooking Instructions</span>
              </h3>
              <span className="text-xs text-emerald-700 font-semibold">
                {completedSteps.length} of {recipe.instructions.length} completed
              </span>
            </div>

            <div className="space-y-2.5">
              {recipe.instructions.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm ${
                      isDone
                        ? 'bg-emerald-50/50 border-emerald-200 text-gray-500 line-through'
                        : 'bg-white border-gray-200 hover:border-emerald-300 text-gray-800 shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-emerald-600 shrink-0"
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <div>
                      <span className="font-bold mr-1.5 text-emerald-900 not-italic">
                        Step {idx + 1}:
                      </span>
                      <span>{step}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nutritionist Tip */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-emerald-900">
              <span className="font-bold block mb-0.5">Nutritionist Notes:</span>
              {recipe.nutritionTips}
            </div>
          </div>

          {/* Bottom Action: Log to Dashboard */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs font-semibold text-gray-600">Add to:</label>
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

            <button
              type="button"
              onClick={handleLogRecipe}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                addedToast
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Logged to {selectedMeal}!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Log 1 Serving to Today's Meals ({recipe.caloriesPerServing} kcal)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
