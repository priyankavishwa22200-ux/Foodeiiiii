import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Search,
  Scale,
  Plus,
  Trash2,
  PieChart as PieIcon,
  Flame,
  Zap,
  Wheat,
  HeartHandshake,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FOOD_DATABASE } from '../data/nutritionData';
import { FoodItem } from '../types';
import { calculateNutrientsForGrams } from '../utils/nutritionCalculators';
import { useNutrition } from '../context/NutritionContext';

export const CalculatorPage: React.FC = () => {
  const {
    foodLog,
    dailyTotals,
    userProfile,
    addFoodToLog,
    removeMealItem,
    updateMealItemGrams,
    clearTodayLog,
  } = useNutrition();

  // Selected food for calculator
  const [search, setSearch] = useState('');
  const [selectedFoodId, setSelectedFoodId] = useState<string>('oats');
  const [grams, setGrams] = useState<number>(100);
  const [targetMeal, setTargetMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [addNotice, setAddNotice] = useState(false);

  const selectedFood = useMemo(() => {
    return FOOD_DATABASE.find((f) => f.id === selectedFoodId) || FOOD_DATABASE[0];
  }, [selectedFoodId]);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return FOOD_DATABASE.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [search]);

  const calculated = calculateNutrientsForGrams(selectedFood.per100g, grams);

  // Macro Energy Percentages
  const pKcal = calculated.protein * 4;
  const cKcal = calculated.carbs * 4;
  const fKcal = calculated.fat * 9;
  const totalMacroKcal = Math.max(1, pKcal + cKcal + fKcal);

  const macroChartData = [
    { name: 'Protein', value: pKcal, grams: calculated.protein, color: '#3B82F6' },
    { name: 'Carbohydrates', value: cKcal, grams: calculated.carbs, color: '#F59E0B' },
    { name: 'Healthy Fats', value: fKcal, grams: calculated.fat, color: '#F43F5E' },
  ];

  const handleAddCurrentFood = () => {
    addFoodToLog(selectedFood, grams, targetMeal);
    setAddNotice(true);
    setTimeout(() => setAddNotice(false), 1200);
  };

  const calProgress = Math.min(100, Math.round((dailyTotals.calories / userProfile.goals.dailyCalories) * 100));
  const proteinProgress = Math.min(100, Math.round((dailyTotals.protein / userProfile.goals.dailyProtein) * 100));
  const carbsProgress = Math.min(100, Math.round((dailyTotals.carbs / userProfile.goals.dailyCarbs) * 100));
  const fatProgress = Math.min(100, Math.round((dailyTotals.fat / userProfile.goals.dailyFat) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Precision Tool
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
          Food Nutrition Calculator & Daily Meal Log
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Search any whole or prepared food, customize exact serving portions in grams, view comprehensive macro and micro breakdowns, and track your daily calorie budget.
        </p>
      </div>

      {/* TOP: INTERACTIVE CALCULATOR */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 font-['Outfit']">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>Interactive Portion & Nutrient Calculator</span>
          </h2>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Reliable USDA/ICMR Estimates
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Food Picker & Portion Slider */}
          <div className="lg:col-span-5 space-y-5">
            {/* Search or Select Food */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                1. Search or Select Food Item:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Quick search by name (e.g. Paneer, Oats, Salmon)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Instant Search Suggestions */}
              {searchResults.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-1.5 shadow-md space-y-1">
                  {searchResults.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setSelectedFoodId(f.id);
                        setGrams(f.servingDefaultGrams);
                        setSearch('');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 flex items-center justify-between text-xs cursor-pointer"
                    >
                      <span className="font-bold text-gray-800">{f.name}</span>
                      <span className="text-emerald-700 font-semibold">{f.per100g.calories} kcal/100g</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Dropdown fallback */}
              <select
                value={selectedFoodId}
                onChange={(e) => {
                  const found = FOOD_DATABASE.find((f) => f.id === e.target.value);
                  setSelectedFoodId(e.target.value);
                  if (found) setGrams(found.servingDefaultGrams);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {FOOD_DATABASE.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.per100g.calories} kcal / 100g)
                  </option>
                ))}
              </select>
            </div>

            {/* Serving Size Slider and Input */}
            <div className="bg-[#FFFDF5] p-4 rounded-2xl border border-amber-100/90 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>2. Serving Size in Grams:</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    step="5"
                    value={grams}
                    onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                    className="w-20 text-right font-bold text-emerald-900 bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-gray-600">grams</span>
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: '50g', val: 50 },
                  { label: '100g Standard', val: 100 },
                  { label: selectedFood.servingUnitLabel, val: selectedFood.servingDefaultGrams },
                  { label: '200g', val: 200 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGrams(preset.val)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      grams === preset.val
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Meal Selector & Add Button */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <label className="text-xs font-bold text-gray-700 block">
                3. Add to Daily Log:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTargetMeal(m)}
                    className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                      targetMeal === m
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddCurrentFood}
                className={`w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  addNotice
                    ? 'bg-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                }`}
              >
                {addNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to {targetMeal}!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add {selectedFood.name} ({calculated.calories} kcal)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Real-time Calculated Nutrition & Charts */}
          <div className="lg:col-span-7 space-y-6">
            {/* Food Header Card */}
            <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-amber-100 flex items-center gap-4">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  {selectedFood.category.replace('_', ' ')}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 font-['Outfit']">
                  {selectedFood.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Calculated values for <strong>{grams}g</strong> portion size
                </p>
              </div>
            </div>

            {/* Colorful Macronutrient Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100 text-center">
                <span className="text-xs font-semibold text-orange-700 block">Calories</span>
                <span className="text-2xl font-black text-orange-950 block">
                  {calculated.calories}
                </span>
                <span className="text-[11px] text-orange-600">kcal</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                <span className="text-xs font-semibold text-blue-700 block">Protein</span>
                <span className="text-2xl font-black text-blue-950 block">
                  {calculated.protein}g
                </span>
                <span className="text-[11px] text-blue-600">{Math.round((pKcal / totalMacroKcal) * 100)}% calories</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                <span className="text-xs font-semibold text-amber-700 block">Carbs</span>
                <span className="text-2xl font-black text-amber-950 block">
                  {calculated.carbs}g
                </span>
                <span className="text-[11px] text-amber-600">{Math.round((cKcal / totalMacroKcal) * 100)}% calories</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-center">
                <span className="text-xs font-semibold text-rose-700 block">Healthy Fats</span>
                <span className="text-2xl font-black text-rose-950 block">
                  {calculated.fat}g
                </span>
                <span className="text-[11px] text-rose-600">{Math.round((fKcal / totalMacroKcal) * 100)}% calories</span>
              </div>
            </div>

            {/* Macro Donut Chart & Micronutrients */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50/80 p-4 rounded-2xl border border-gray-200">
              <div className="sm:col-span-5 h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                    >
                      {macroChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any, name: any, item: any) => [
                        `${item.payload.grams}g (${Math.round(val)} kcal)`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="sm:col-span-7 space-y-2 text-xs">
                <h4 className="font-bold text-gray-800 text-xs mb-2">
                  Fiber, Sugars & Micronutrients ({grams}g)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-white border border-gray-100 flex justify-between">
                    <span className="text-gray-500">Dietary Fiber</span>
                    <span className="font-bold text-emerald-800">{calculated.fiber}g</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-100 flex justify-between">
                    <span className="text-gray-500">Natural Sugars</span>
                    <span className="font-bold text-gray-800">{calculated.sugar}g</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-100 flex justify-between">
                    <span className="text-gray-500">Potassium</span>
                    <span className="font-bold text-gray-800">{calculated.potassium}mg</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-100 flex justify-between">
                    <span className="text-gray-500">Calcium</span>
                    <span className="font-bold text-gray-800">{calculated.calcium}mg</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-100 flex justify-between">
                    <span className="text-gray-500">Iron</span>
                    <span className="font-bold text-gray-800">{calculated.iron}mg</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-gray-100 flex justify-between">
                    <span className="text-gray-500">Vitamin C</span>
                    <span className="font-bold text-gray-800">{calculated.vitaminC}mg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: DAILY FOOD LOG BUILDER */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">
              Today's Daily Food Log
            </h2>
            <p className="text-xs text-gray-500">
              Aggregated calories and macronutrients saved automatically in your browser
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearTodayLog}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Log</span>
            </button>
          </div>
        </div>

        {/* Daily Aggregated Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-orange-700 flex items-center gap-1">
                <Flame className="w-4 h-4" />
                Calories Consumed
              </span>
              <span className="text-gray-500 font-medium">Goal: {userProfile.goals.dailyCalories}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{dailyTotals.calories}</span>
              <span className="text-xs text-gray-500">kcal ({calProgress}%)</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  calProgress > 100 ? 'bg-rose-500' : 'bg-orange-500'
                }`}
                style={{ width: `${calProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-500 block">
              {userProfile.goals.dailyCalories - dailyTotals.calories > 0
                ? `${userProfile.goals.dailyCalories - dailyTotals.calories} kcal remaining`
                : `${Math.abs(userProfile.goals.dailyCalories - dailyTotals.calories)} kcal over budget`}
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-700 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Protein Intake
              </span>
              <span className="text-gray-500 font-medium">Target: {userProfile.goals.dailyProtein}g</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{dailyTotals.protein}g</span>
              <span className="text-xs text-gray-500">({proteinProgress}%)</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${proteinProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-500 block">
              {Math.max(0, userProfile.goals.dailyProtein - dailyTotals.protein).toFixed(1)}g to hit target
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <Wheat className="w-4 h-4" />
                Carbohydrates
              </span>
              <span className="text-gray-500 font-medium">Target: {userProfile.goals.dailyCarbs}g</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{dailyTotals.carbs}g</span>
              <span className="text-xs text-gray-500">({carbsProgress}%)</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${carbsProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-500 block">
              Fiber: {dailyTotals.fiber}g logged today
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-700 flex items-center gap-1">
                <HeartHandshake className="w-4 h-4" />
                Healthy Fats
              </span>
              <span className="text-gray-500 font-medium">Target: {userProfile.goals.dailyFat}g</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{dailyTotals.fat}g</span>
              <span className="text-xs text-gray-500">({fatProgress}%)</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: `${fatProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-500 block">
              {Math.max(0, userProfile.goals.dailyFat - dailyTotals.fat).toFixed(1)}g to daily target
            </span>
          </div>
        </div>

        {/* Meal Group Listings (Breakfast, Lunch, Dinner, Snack) */}
        <div className="space-y-4">
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((mealType) => {
            const items = foodLog.filter((i) => i.mealType === mealType);
            const mealCals = items.reduce((sum, item) => sum + item.calories, 0);
            const mealProtein = items.reduce((sum, item) => sum + item.protein, 0);

            return (
              <div
                key={mealType}
                className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs"
              >
                {/* Meal Header */}
                <div className="p-4 sm:px-6 bg-[#FFFDF5] border-b border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold uppercase tracking-wider text-emerald-950 font-['Outfit']">
                      {mealType}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-gray-700">
                    <span className="text-orange-600 mr-2">{mealCals} kcal</span>
                    <span className="text-blue-700">{mealProtein.toFixed(1)}g protein</span>
                  </div>
                </div>

                {/* Items in this meal */}
                {items.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400">
                    No foods logged for {mealType} yet. Use the calculator above to add an item.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.foodName}
                            className="w-11 h-11 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <span className="text-sm font-bold text-gray-900 block">
                              {item.foodName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.timestamp} • {item.calories} kcal
                            </span>
                          </div>
                        </div>

                        {/* Editable Grams & Action */}
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="5"
                              max="1000"
                              step="5"
                              value={item.grams}
                              onChange={(e) => updateMealItemGrams(item.id, Number(e.target.value))}
                              className="w-16 text-right font-bold text-xs bg-white border border-gray-300 rounded-lg px-2 py-1 text-gray-800"
                            />
                            <span className="text-xs text-gray-500">g</span>
                          </div>

                          <div className="text-right text-xs font-semibold min-w-28">
                            <span className="text-blue-700 block">{item.protein}g protein</span>
                            <span className="text-gray-400 text-[11px]">{item.carbs}g C • {item.fat}g F</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeMealItem(item.id)}
                            title="Remove food"
                            className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
