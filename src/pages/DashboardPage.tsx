import React from 'react';
import {
  Flame,
  Droplets,
  Plus,
  Minus,
  RotateCcw,
  Sliders,
  TrendingUp,
  PieChart as PieIcon,
  Utensils,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useNutrition } from '../context/NutritionContext';
import { NavTab } from '../components/Navbar';

interface DashboardPageProps {
  onOpenProfile: () => void;
  onOpenQuickLog: () => void;
  onSelectTab: (tab: NavTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenProfile,
  onOpenQuickLog,
  onSelectTab,
}) => {
  const {
    dailyTotals,
    userProfile,
    remainingCalories,
    waterDrankMl,
    addWaterGlass,
    removeWaterGlass,
    resetWater,
    mealsByType,
    weeklyHistory,
  } = useNutrition();

  const calorieGoal = userProfile.goals.dailyCalories;
  const consumedCalories = dailyTotals.calories;
  const calPercent = Math.min(100, Math.round((consumedCalories / calorieGoal) * 100));

  // Macro percentages
  const proteinPercent = Math.min(100, Math.round((dailyTotals.protein / userProfile.goals.dailyProtein) * 100));
  const carbsPercent = Math.min(100, Math.round((dailyTotals.carbs / userProfile.goals.dailyCarbs) * 100));
  const fatPercent = Math.min(100, Math.round((dailyTotals.fat / userProfile.goals.dailyFat) * 100));

  // Macro Energy Distribution
  const proteinCalories = dailyTotals.protein * 4;
  const carbsCalories = dailyTotals.carbs * 4;
  const fatCalories = dailyTotals.fat * 9;
  const totalMacroCalories = Math.max(1, proteinCalories + carbsCalories + fatCalories);

  const pieData = [
    { name: 'Protein', value: Math.round(proteinCalories), color: '#3B82F6', grams: dailyTotals.protein },
    { name: 'Carbohydrates', value: Math.round(carbsCalories), color: '#F59E0B', grams: dailyTotals.carbs },
    { name: 'Healthy Fats', value: Math.round(fatCalories), color: '#F43F5E', grams: dailyTotals.fat },
  ];

  // Water calculations
  const waterTarget = userProfile.goals.dailyWaterMl;
  const waterGlasses = Math.floor(waterDrankMl / 250);
  const targetGlasses = Math.round(waterTarget / 250);
  const waterPercent = Math.min(100, Math.round((waterDrankMl / waterTarget) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Real-Time Wellness Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Outfit'] mt-1">
            Daily Nutrition Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Welcome back, <strong className="text-gray-800">{userProfile.name}</strong>. Here is your daily intake progress against your targets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenProfile}
            className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 text-xs font-bold text-gray-700 flex items-center gap-2 shadow-2xs cursor-pointer transition-all hover:bg-emerald-50"
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Set Personal Goals</span>
          </button>

          <button
            onClick={onOpenQuickLog}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Food</span>
          </button>
        </div>
      </div>

      {/* Top Cards: Calorie Ring, Remaining Calories & Macro Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Calorie Ring Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span>Daily Calorie Budget</span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
              {calPercent}% Met
            </span>
          </div>

          {/* Circular Indicator Presentation */}
          <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
            {/* SVG Circle Gauge */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                className="text-gray-100 fill-transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * calPercent) / 100}
                strokeLinecap="round"
                className={`fill-transparent transition-all duration-700 ${
                  consumedCalories > calorieGoal ? 'text-rose-500' : 'text-emerald-500'
                }`}
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-gray-900 font-['Outfit']">
                {consumedCalories}
              </span>
              <span className="text-xs text-gray-400 font-medium">of {calorieGoal} kcal</span>
              <span className="text-[11px] font-bold text-emerald-700 mt-1 uppercase tracking-wider">
                {calPercent}% Consumed
              </span>
            </div>
          </div>

          {/* Remaining Calories Callout */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-amber-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-500 block">Remaining Energy</span>
              <span className={`text-base font-extrabold ${remainingCalories >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {remainingCalories >= 0 ? `${remainingCalories} kcal left` : `${Math.abs(remainingCalories)} kcal over target`}
              </span>
            </div>
            <button
              onClick={() => onSelectTab('calculator')}
              className="text-emerald-800 font-bold hover:underline cursor-pointer"
            >
              Open Log →
            </button>
          </div>
        </div>

        {/* Macronutrient Bars Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Macronutrient Targets vs Intake</span>
            </h3>
            <span className="text-xs text-gray-400">Values in grams</span>
          </div>

          {/* Macro Progress Bars */}
          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  Protein
                </span>
                <span className="font-semibold text-gray-700">
                  <strong>{dailyTotals.protein}g</strong> / {userProfile.goals.dailyProtein}g ({proteinPercent}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${proteinPercent}%` }}
                />
              </div>
            </div>

            {/* Carbohydrates */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Carbohydrates
                </span>
                <span className="font-semibold text-gray-700">
                  <strong>{dailyTotals.carbs}g</strong> / {userProfile.goals.dailyCarbs}g ({carbsPercent}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${carbsPercent}%` }}
                />
              </div>
            </div>

            {/* Healthy Fats */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  Healthy Fats
                </span>
                <span className="font-semibold text-gray-700">
                  <strong>{dailyTotals.fat}g</strong> / {userProfile.goals.dailyFat}g ({fatPercent}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${fatPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Macro Split Preview */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-2xl text-center text-xs">
            <div>
              <span className="text-[10px] text-gray-500 block">Dietary Fiber</span>
              <span className="font-bold text-emerald-800 text-sm">{dailyTotals.fiber}g</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Natural Sugars</span>
              <span className="font-bold text-gray-800 text-sm">{dailyTotals.sugar}g</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Protein Ratio</span>
              <span className="font-bold text-blue-700 text-sm">
                {Math.round((proteinCalories / totalMacroCalories) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Water Intake Tracker & Macro Split Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* WATER INTAKE TRACKER */}
        <div className="lg:col-span-6 bg-gradient-to-br from-sky-50 via-white to-sky-50/40 rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 font-['Outfit']">
                  Daily Water Intake Tracker
                </h3>
                <span className="text-xs text-sky-700 font-semibold">
                  Target: {waterTarget} ml (~{targetGlasses} glasses)
                </span>
              </div>
            </div>

            <button
              onClick={resetWater}
              title="Reset today's water"
              className="text-gray-400 hover:text-sky-700 p-1.5 rounded-lg hover:bg-sky-100/60 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Water Graphic & Counter */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-extrabold text-sky-900 font-['Outfit']">
                  {waterDrankMl}
                </span>
                <span className="text-sm font-semibold text-sky-600 ml-1">/ {waterTarget} ml</span>
              </div>
              <span className="text-xs font-bold text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
                {waterGlasses} glasses consumed
              </span>
            </div>

            {/* Visual Glass Dots */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.max(8, targetGlasses) }).map((_, idx) => {
                const isDrank = idx < waterGlasses;
                return (
                  <div
                    key={idx}
                    className={`w-9 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isDrank
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'bg-white border-2 border-dashed border-sky-200 text-sky-300'
                    }`}
                  >
                    <Droplets className="w-4 h-4" />
                  </div>
                );
              })}
            </div>

            {/* Water progress bar */}
            <div className="w-full bg-sky-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>

          {/* Glass Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={removeWaterGlass}
              className="flex-1 py-2.5 rounded-xl border border-sky-200 hover:bg-sky-100/50 text-xs font-bold text-sky-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Minus className="w-4 h-4" />
              <span>- 250ml</span>
            </button>

            <button
              type="button"
              onClick={addWaterGlass}
              className="flex-2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Drink 1 Glass (+250ml)</span>
            </button>
          </div>
        </div>

        {/* MACRONUTRIENT PIE CHART */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-600" />
              <span>Energy Distribution (%)</span>
            </h3>
            <span className="text-xs text-gray-400">Total: {dailyTotals.calories} kcal</span>
          </div>

          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val} kcal (${item.payload.grams}g)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-gray-100">
            <div className="p-2 rounded-xl bg-blue-50/70">
              <span className="text-[10px] text-blue-600 font-bold block">Protein</span>
              <span className="text-sm font-black text-blue-900">
                {Math.round((proteinCalories / totalMacroCalories) * 100)}%
              </span>
              <span className="text-[10px] text-gray-400">{dailyTotals.protein}g</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-50/70">
              <span className="text-[10px] text-amber-600 font-bold block">Carbohydrates</span>
              <span className="text-sm font-black text-amber-900">
                {Math.round((carbsCalories / totalMacroCalories) * 100)}%
              </span>
              <span className="text-[10px] text-gray-400">{dailyTotals.carbs}g</span>
            </div>
            <div className="p-2 rounded-xl bg-rose-50/70">
              <span className="text-[10px] text-rose-600 font-bold block">Healthy Fats</span>
              <span className="text-sm font-black text-rose-900">
                {Math.round((fatCalories / totalMacroCalories) * 100)}%
              </span>
              <span className="text-[10px] text-gray-400">{dailyTotals.fat}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row: Weekly Nutrition Chart (Recharts) */}
      <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>Weekly Calorie Intake Trend</span>
            </h3>
            <p className="text-xs text-gray-500">
              Tracking your consistency across the past 7 days against your target of {calorieGoal} kcal
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 self-start sm:self-auto">
            Target: {calorieGoal} kcal/day
          </span>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyHistory}
              margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[0, 2600]} />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `${value} kcal`,
                  name === 'calories' ? 'Calories Consumed' : 'Target Goal',
                ]}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend
                formatter={(val) => (val === 'calories' ? 'Consumed (kcal)' : 'Goal (kcal)')}
              />
              <Bar dataKey="calories" fill="#10B981" radius={[8, 8, 0, 0]} maxBarSize={48} />
              <Bar dataKey="target" fill="#E5E7EB" radius={[8, 8, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fourth Row: Today's Meal Summary Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-600" />
            <span>Today's Meal Breakdown</span>
          </h3>
          <button
            onClick={() => onSelectTab('calculator')}
            className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Manage Food Log & Servings →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((meal) => {
            const items = mealsByType[meal];
            const mealCals = items.reduce((sum, i) => sum + i.calories, 0);
            const mealProtein = items.reduce((sum, i) => sum + i.protein, 0);

            return (
              <div
                key={meal}
                className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 capitalize">
                      {meal}
                    </span>
                    <span className="text-xs font-black text-orange-600">
                      {mealCals} kcal
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-500 block mb-2">
                    {mealProtein.toFixed(1)}g protein
                  </span>

                  {items.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No foods logged</p>
                  ) : (
                    <ul className="space-y-1">
                      {items.map((i) => (
                        <li key={i.id} className="text-xs text-gray-700 flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          <span className="truncate">{i.foodName}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onOpenQuickLog}
                  className="w-full py-1.5 rounded-xl border border-gray-200 hover:border-emerald-300 text-xs font-semibold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to {meal}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-amber-200/80 flex items-start gap-3 text-xs text-gray-600">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-gray-900 block mb-0.5">Note on Nutritional Accuracy:</strong>
          Calorie and macronutrient targets are estimates calculated via the Mifflin-St Jeor equation. Actual human metabolic requirements vary according to genetics, body composition, hormonal profile, thyroid status, and daily exercise intensity. Use these targets as baseline guideposts, not rigid rules.
        </div>
      </div>
    </div>
  );
};
