import React, { useState } from 'react';
import { X, Sparkles, Check, Target, Activity, Heart, Droplets, Flame } from 'lucide-react';
import { useNutrition } from '../context/NutritionContext';
import { estimateTDEE } from '../utils/nutritionCalculators';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateProfile } = useNutrition();

  const [name, setName] = useState(userProfile.name);
  const [gender, setGender] = useState(userProfile.gender);
  const [age, setAge] = useState(userProfile.age);
  const [weightKg, setWeightKg] = useState(userProfile.weightKg);
  const [heightCm, setHeightCm] = useState(userProfile.heightCm);
  const [activityLevel, setActivityLevel] = useState(userProfile.goals.activityLevel);
  const [fitnessGoal, setFitnessGoal] = useState(userProfile.goals.fitnessGoal);
  const [dietPreference, setDietPreference] = useState(userProfile.dietPreference);

  // Custom targets
  const [calories, setCalories] = useState(userProfile.goals.dailyCalories);
  const [protein, setProtein] = useState(userProfile.goals.dailyProtein);
  const [carbs, setCarbs] = useState(userProfile.goals.dailyCarbs);
  const [fat, setFat] = useState(userProfile.goals.dailyFat);
  const [waterMl, setWaterMl] = useState(userProfile.goals.dailyWaterMl);

  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleAutoCalculate = () => {
    const estimated = estimateTDEE(gender, weightKg, heightCm, age, activityLevel, fitnessGoal);
    setCalories(estimated.dailyCalories);
    setProtein(estimated.dailyProtein);
    setCarbs(estimated.dailyCarbs);
    setFat(estimated.dailyFat);
    setWaterMl(estimated.dailyWaterMl);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      gender,
      age,
      weightKg,
      heightCm,
      dietPreference,
      goals: {
        dailyCalories: calories,
        dailyProtein: protein,
        dailyCarbs: carbs,
        dailyFat: fat,
        dailyWaterMl: waterMl,
        fitnessGoal,
        activityLevel,
      },
    });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FFFDF5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-['Outfit']">
                Nutrition Profile & Daily Targets
              </h3>
              <p className="text-xs text-gray-500">
                Personalize your calorie targets and macronutrient splits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* User Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Dietary Lifestyle</label>
              <select
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Balanced / Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten_free">Gluten-Free</option>
              </select>
            </div>
          </div>

          {/* Biological Stats for TDEE */}
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Mifflin-St Jeor TDEE Calculator
              </span>
              <button
                type="button"
                onClick={handleAutoCalculate}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs hover:bg-emerald-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Auto-Calculate Targets</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="14"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  min="100"
                  max="230"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as any)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800"
                >
                  <option value="sedentary">Sedentary (Desk job, little movement)</option>
                  <option value="light">Light (1-3 days exercise/week)</option>
                  <option value="moderate">Moderate (3-5 days workout/sports)</option>
                  <option value="very_active">Very Active (6-7 days heavy training)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Primary Goal</label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value as any)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800"
                >
                  <option value="maintenance">Weight Maintenance & Vitality</option>
                  <option value="weight_loss">Fat Loss (-450 kcal deficit)</option>
                  <option value="muscle_gain">Lean Muscle Gain (+350 kcal)</option>
                  <option value="clean_eating">Clean Eating & Habits</option>
                </select>
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              Daily Target Numbers
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100">
                <label className="text-[11px] font-bold text-orange-700 flex items-center gap-1 mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Calories (kcal)</span>
                </label>
                <input
                  type="number"
                  step="25"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full bg-white border border-orange-200 rounded-lg px-2.5 py-1 text-sm font-bold text-gray-900"
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <label className="text-[11px] font-bold text-blue-700 block mb-1">
                  Protein (grams)
                </label>
                <input
                  type="number"
                  step="5"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  className="w-full bg-white border border-blue-200 rounded-lg px-2.5 py-1 text-sm font-bold text-gray-900"
                />
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <label className="text-[11px] font-bold text-amber-700 block mb-1">
                  Carbohydrates (g)
                </label>
                <input
                  type="number"
                  step="5"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  className="w-full bg-white border border-amber-200 rounded-lg px-2.5 py-1 text-sm font-bold text-gray-900"
                />
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                <label className="text-[11px] font-bold text-rose-700 block mb-1">
                  Healthy Fats (g)
                </label>
                <input
                  type="number"
                  step="5"
                  value={fat}
                  onChange={(e) => setFat(Number(e.target.value))}
                  className="w-full bg-white border border-rose-200 rounded-lg px-2.5 py-1 text-sm font-bold text-gray-900"
                />
              </div>

              <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 col-span-2 sm:col-span-2">
                <label className="text-[11px] font-bold text-sky-700 flex items-center gap-1 mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Hydration Target (ml)</span>
                </label>
                <input
                  type="number"
                  step="250"
                  value={waterMl}
                  onChange={(e) => setWaterMl(Number(e.target.value))}
                  className="w-full bg-white border border-sky-200 rounded-lg px-2.5 py-1 text-sm font-bold text-gray-900"
                />
                <span className="text-[10px] text-sky-600 mt-1 block">
                  Approx {Math.round(waterMl / 250)} standard 250ml glasses daily
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved Targets!</span>
                </>
              ) : (
                <span>Save Nutrition Profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
