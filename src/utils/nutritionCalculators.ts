import { FoodItem, NutrientProfile, UserGoals } from '../types';

export function calculateNutrientsForGrams(
  per100g: NutrientProfile,
  grams: number
): NutrientProfile {
  const multiplier = Math.max(0, grams) / 100;
  return {
    calories: Math.round(per100g.calories * multiplier),
    protein: Number((per100g.protein * multiplier).toFixed(1)),
    carbs: Number((per100g.carbs * multiplier).toFixed(1)),
    fat: Number((per100g.fat * multiplier).toFixed(1)),
    fiber: Number((per100g.fiber * multiplier).toFixed(1)),
    sugar: Number((per100g.sugar * multiplier).toFixed(1)),
    sodium: Math.round(per100g.sodium * multiplier),
    potassium: Math.round(per100g.potassium * multiplier),
    calcium: Math.round(per100g.calcium * multiplier),
    iron: Number((per100g.iron * multiplier).toFixed(1)),
    vitaminC: Number((per100g.vitaminC * multiplier).toFixed(1)),
    vitaminA: per100g.vitaminA ? Math.round(per100g.vitaminA * multiplier) : 0,
  };
}

export function estimateTDEE(
  gender: 'male' | 'female' | 'other',
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active',
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'clean_eating'
): UserGoals {
  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else if (gender === 'female') {
    bmr -= 161;
  } else {
    bmr -= 78;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
  };

  const maintenanceCalories = Math.round(bmr * activityMultipliers[activityLevel]);

  let targetCalories = maintenanceCalories;
  if (goal === 'weight_loss') {
    targetCalories = Math.max(1200, Math.round(maintenanceCalories - 450));
  } else if (goal === 'muscle_gain') {
    targetCalories = Math.round(maintenanceCalories + 350);
  }

  // Protein targets: 1.8g/kg for muscle gain/loss to preserve lean mass, 1.4g/kg maintenance
  const proteinMultiplier = goal === 'muscle_gain' || goal === 'weight_loss' ? 1.8 : 1.4;
  const targetProtein = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = targetProtein * 4;

  // Fat targets: ~25-30% of total calories
  const fatCalories = targetCalories * 0.28;
  const targetFat = Math.round(fatCalories / 9);

  // Remainder to Carbs: 4 kcal per gram
  const carbCalories = Math.max(0, targetCalories - proteinCalories - (targetFat * 9));
  const targetCarbs = Math.round(carbCalories / 4);

  // Water: 35ml per kg + activity compensation
  const baseWater = weightKg * 35;
  const targetWater = Math.round(baseWater + (activityLevel === 'very_active' ? 750 : 300));

  return {
    dailyCalories: targetCalories,
    dailyProtein: targetProtein,
    dailyCarbs: targetCarbs,
    dailyFat: targetFat,
    dailyWaterMl: targetWater,
    fitnessGoal: goal,
    activityLevel,
  };
}

export const DEFAULT_USER_GOALS: UserGoals = {
  dailyCalories: 2000,
  dailyProtein: 120,
  dailyCarbs: 220,
  dailyFat: 65,
  dailyWaterMl: 2500,
  fitnessGoal: 'maintenance',
  activityLevel: 'moderate',
};
