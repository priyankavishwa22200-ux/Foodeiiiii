import React, { useState } from 'react';
import {
  Columns2,
  ArrowRightLeft,
  Flame,
  Zap,
  Wheat,
  HeartHandshake,
  CheckCircle2,
  Trophy,
  Sparkles,
  Scale
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { FOOD_DATABASE } from '../data/nutritionData';
import { FoodItem } from '../types';
import { calculateNutrientsForGrams } from '../utils/nutritionCalculators';

interface ComparisonPageProps {
  initialFoodIdA?: string;
  initialFoodIdB?: string;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({
  initialFoodIdA = 'paneer',
  initialFoodIdB = 'tofu',
}) => {
  const [foodAId, setFoodAId] = useState<string>(initialFoodIdA);
  const [foodBId, setFoodBId] = useState<string>(initialFoodIdB);
  const [compareMode, setCompareMode] = useState<'per100g' | 'perServing'>('per100g');

  const foodA = FOOD_DATABASE.find((f) => f.id === foodAId) || FOOD_DATABASE[0];
  const foodB = FOOD_DATABASE.find((f) => f.id === foodBId) || FOOD_DATABASE[1];

  const gramsA = compareMode === 'per100g' ? 100 : foodA.servingDefaultGrams;
  const gramsB = compareMode === 'per100g' ? 100 : foodB.servingDefaultGrams;

  const nutrientsA = calculateNutrientsForGrams(foodA.per100g, gramsA);
  const nutrientsB = calculateNutrientsForGrams(foodB.per100g, gramsB);

  // Quick Preset Matchups
  const presets = [
    { label: 'Paneer vs Tofu', a: 'paneer', b: 'tofu' },
    { label: 'Apple vs Banana', a: 'apple', b: 'banana' },
    { label: 'Roti vs Brown Rice', a: 'roti', b: 'brown-rice' },
    { label: 'Oats vs Quinoa', a: 'oats', b: 'quinoa' },
    { label: 'Eggs vs Salmon', a: 'eggs', b: 'salmon' },
    { label: 'Spinach vs Broccoli', a: 'spinach', b: 'broccoli' },
  ];

  // Side-by-side grouped bar chart data
  const chartData = [
    {
      nutrient: 'Calories (kcal / 10)',
      [foodA.name.split(' ')[0]]: Math.round(nutrientsA.calories / 10),
      [foodB.name.split(' ')[0]]: Math.round(nutrientsB.calories / 10),
    },
    {
      nutrient: 'Protein (g)',
      [foodA.name.split(' ')[0]]: nutrientsA.protein,
      [foodB.name.split(' ')[0]]: nutrientsB.protein,
    },
    {
      nutrient: 'Carbohydrates (g)',
      [foodA.name.split(' ')[0]]: nutrientsA.carbs,
      [foodB.name.split(' ')[0]]: nutrientsB.carbs,
    },
    {
      nutrient: 'Healthy Fat (g)',
      [foodA.name.split(' ')[0]]: nutrientsA.fat,
      [foodB.name.split(' ')[0]]: nutrientsB.fat,
    },
    {
      nutrient: 'Fiber (g)',
      [foodA.name.split(' ')[0]]: nutrientsA.fiber,
      [foodB.name.split(' ')[0]]: nutrientsB.fiber,
    },
  ];

  const nameA = foodA.name.split(' ')[0];
  const nameB = foodB.name.split(' ')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Side-By-Side Food Analysis
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
          Food Comparison Tool
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Compare any two foods side by side to evaluate calories, protein quality, carbohydrates, fiber, and micronutrients. Perfect for smart ingredient swaps and fitness choices.
        </p>
      </div>

      {/* Preset Matchups */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Popular Comparisons:
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setFoodAId(p.a);
              setFoodBId(p.b);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              foodAId === p.a && foodBId === p.b
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Selectors Bar & Mode Switcher */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-gray-700">Comparison Basis:</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setCompareMode('per100g')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compareMode === 'per100g'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Per 100g (Scientific Standard)
            </button>
            <button
              type="button"
              onClick={() => setCompareMode('perServing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compareMode === 'perServing'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Per Standard Serving
            </button>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Food A Selector */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-emerald-800 flex items-center justify-between">
              <span>Food A (Primary):</span>
              <span className="text-gray-400 font-normal">{gramsA}g analyzed</span>
            </label>
            <select
              value={foodAId}
              onChange={(e) => setFoodAId(e.target.value)}
              className="w-full bg-emerald-50/50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {FOOD_DATABASE.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* VS Divider */}
          <div className="md:col-span-1 flex justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shadow-xs">
              VS
            </div>
          </div>

          {/* Food B Selector */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-teal-800 flex items-center justify-between">
              <span>Food B (Comparison):</span>
              <span className="text-gray-400 font-normal">{gramsB}g analyzed</span>
            </label>
            <select
              value={foodBId}
              onChange={(e) => setFoodBId(e.target.value)}
              className="w-full bg-teal-50/50 border border-teal-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {FOOD_DATABASE.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-side Showcase Cards with Winner Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Food A */}
        <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={foodA.image}
              alt={foodA.name}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-xs"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {foodA.category.replace('_', ' ')}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 font-['Outfit']">
                {foodA.name}
              </h3>
              <p className="text-xs text-gray-500">
                Portion: {gramsA} grams ({compareMode === 'perServing' ? foodA.servingUnitLabel : '100g sample'})
              </p>
            </div>
          </div>

          {/* Quick Winner Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {nutrientsA.protein > nutrientsB.protein && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                Higher Protein (+{(nutrientsA.protein - nutrientsB.protein).toFixed(1)}g)
              </span>
            )}
            {nutrientsA.calories < nutrientsB.calories && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                Lower Calories (-{nutrientsB.calories - nutrientsA.calories} kcal)
              </span>
            )}
            {nutrientsA.fiber > nutrientsB.fiber && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                Higher Fiber (+{(nutrientsA.fiber - nutrientsB.fiber).toFixed(1)}g)
              </span>
            )}
            {nutrientsA.calcium > nutrientsB.calcium && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Higher Calcium (+{nutrientsA.calcium - nutrientsB.calcium}mg)
              </span>
            )}
          </div>
        </div>

        {/* Card Food B */}
        <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={foodB.image}
              alt={foodB.name}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-xs"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                {foodB.category.replace('_', ' ')}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 font-['Outfit']">
                {foodB.name}
              </h3>
              <p className="text-xs text-gray-500">
                Portion: {gramsB} grams ({compareMode === 'perServing' ? foodB.servingUnitLabel : '100g sample'})
              </p>
            </div>
          </div>

          {/* Quick Winner Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {nutrientsB.protein > nutrientsA.protein && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                Higher Protein (+{(nutrientsB.protein - nutrientsA.protein).toFixed(1)}g)
              </span>
            )}
            {nutrientsB.calories < nutrientsA.calories && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                Lower Calories (-{nutrientsA.calories - nutrientsB.calories} kcal)
              </span>
            )}
            {nutrientsB.fiber > nutrientsA.fiber && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                Higher Fiber (+{(nutrientsB.fiber - nutrientsA.fiber).toFixed(1)}g)
              </span>
            )}
            {nutrientsB.calcium > nutrientsA.calcium && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Higher Calcium (+{nutrientsB.calcium - nutrientsA.calcium}mg)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Visual Chart Comparison */}
      <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
          Nutritional Comparison Chart
        </h3>
        <p className="text-xs text-gray-500">
          Comparing {foodA.name} (Emerald) vs {foodB.name} (Teal)
        </p>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="nutrient" tick={{ fontSize: 11, fill: '#4B5563' }} />
              <YAxis tick={{ fontSize: 11, fill: '#4B5563' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey={nameA} fill="#059669" radius={[6, 6, 0, 0]} maxBarSize={45} />
              <Bar dataKey={nameB} fill="#0D9488" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side-by-Side Detailed Comparison Table */}
      <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs">
        <div className="p-5 bg-[#FFFDF5] border-b border-amber-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
            Side-by-Side Nutritional Difference Matrix
          </h3>
          <span className="text-xs text-gray-500">
            Green highlight indicates superior value
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-6">Nutrient Metric</th>
                <th className="py-3 px-6 text-emerald-800">{foodA.name}</th>
                <th className="py-3 px-6 text-teal-800">{foodB.name}</th>
                <th className="py-3 px-6 text-gray-600">Net Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Calories */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Energy (Calories)</td>
                <td className={`py-3.5 px-6 font-extrabold ${nutrientsA.calories < nutrientsB.calories ? 'text-emerald-700 bg-emerald-50/40' : 'text-gray-800'}`}>
                  {nutrientsA.calories} kcal
                </td>
                <td className={`py-3.5 px-6 font-extrabold ${nutrientsB.calories < nutrientsA.calories ? 'text-teal-700 bg-teal-50/40' : 'text-gray-800'}`}>
                  {nutrientsB.calories} kcal
                </td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(nutrientsA.calories - nutrientsB.calories)} kcal difference
                </td>
              </tr>

              {/* Protein */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Protein</td>
                <td className={`py-3.5 px-6 font-extrabold ${nutrientsA.protein > nutrientsB.protein ? 'text-emerald-700 bg-emerald-50/40' : 'text-gray-800'}`}>
                  {nutrientsA.protein} g
                </td>
                <td className={`py-3.5 px-6 font-extrabold ${nutrientsB.protein > nutrientsA.protein ? 'text-teal-700 bg-teal-50/40' : 'text-gray-800'}`}>
                  {nutrientsB.protein} g
                </td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(Number((nutrientsA.protein - nutrientsB.protein).toFixed(1)))} g
                </td>
              </tr>

              {/* Carbs */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Carbohydrates</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsA.carbs} g</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsB.carbs} g</td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(Number((nutrientsA.carbs - nutrientsB.carbs).toFixed(1)))} g
                </td>
              </tr>

              {/* Fat */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Total Fat</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsA.fat} g</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsB.fat} g</td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(Number((nutrientsA.fat - nutrientsB.fat).toFixed(1)))} g
                </td>
              </tr>

              {/* Fiber */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Dietary Fiber</td>
                <td className={`py-3.5 px-6 font-extrabold ${nutrientsA.fiber > nutrientsB.fiber ? 'text-emerald-700 bg-emerald-50/40' : 'text-gray-800'}`}>
                  {nutrientsA.fiber} g
                </td>
                <td className={`py-3.5 px-6 font-extrabold ${nutrientsB.fiber > nutrientsA.fiber ? 'text-teal-700 bg-teal-50/40' : 'text-gray-800'}`}>
                  {nutrientsB.fiber} g
                </td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(Number((nutrientsA.fiber - nutrientsB.fiber).toFixed(1)))} g
                </td>
              </tr>

              {/* Sugar */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Sugar</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsA.sugar} g</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsB.sugar} g</td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(Number((nutrientsA.sugar - nutrientsB.sugar).toFixed(1)))} g
                </td>
              </tr>

              {/* Sodium */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Sodium</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsA.sodium} mg</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsB.sodium} mg</td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(nutrientsA.sodium - nutrientsB.sodium)} mg
                </td>
              </tr>

              {/* Potassium */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Potassium</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsA.potassium} mg</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsB.potassium} mg</td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(nutrientsA.potassium - nutrientsB.potassium)} mg
                </td>
              </tr>

              {/* Calcium */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Calcium</td>
                <td className={`py-3.5 px-6 font-semibold ${nutrientsA.calcium > nutrientsB.calcium ? 'text-emerald-700 bg-emerald-50/40 font-bold' : ''}`}>
                  {nutrientsA.calcium} mg
                </td>
                <td className={`py-3.5 px-6 font-semibold ${nutrientsB.calcium > nutrientsA.calcium ? 'text-teal-700 bg-teal-50/40 font-bold' : ''}`}>
                  {nutrientsB.calcium} mg
                </td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(nutrientsA.calcium - nutrientsB.calcium)} mg
                </td>
              </tr>

              {/* Vitamin C */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Vitamin C</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsA.vitaminC} mg</td>
                <td className="py-3.5 px-6 font-semibold text-gray-800">{nutrientsB.vitaminC} mg</td>
                <td className="py-3.5 px-6 font-semibold text-gray-600">
                  {Math.abs(Number((nutrientsA.vitaminC - nutrientsB.vitaminC).toFixed(1)))} mg
                </td>
              </tr>

              {/* Glycemic Index */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-6 font-bold text-gray-800">Glycemic Index</td>
                <td className="py-3.5 px-6 font-bold text-emerald-800">{foodA.glycemicIndex}</td>
                <td className="py-3.5 px-6 font-bold text-teal-800">{foodB.glycemicIndex}</td>
                <td className="py-3.5 px-6 text-gray-500">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
