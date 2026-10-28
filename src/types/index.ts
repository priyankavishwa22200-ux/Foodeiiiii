export interface NutrientProfile {
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  sugar: number; // g
  sodium: number; // mg
  potassium: number; // mg
  calcium: number; // mg
  iron: number; // mg
  vitaminC: number; // mg
  vitaminA?: number; // mcg
}

export type FoodCategory =
  | 'fruits'
  | 'vegetables'
  | 'grains'
  | 'dairy'
  | 'proteins'
  | 'legumes'
  | 'nuts_seeds'
  | 'indian_staples';

export type DietTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'high-protein'
  | 'low-carb'
  | 'heart-healthy'
  | 'dairy-free';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  servingDefaultGrams: number;
  servingUnitLabel: string;
  image: string;
  per100g: NutrientProfile;
  dietaryTags: DietTag[];
  healthBenefits: string[];
  glycemicIndex: 'Low' | 'Medium' | 'High';
  originOrStyle?: string;
}

export interface MealLogItem {
  id: string;
  foodId: string;
  foodName: string;
  image: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  timestamp: string;
}

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  note?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  subcategories: ('high-protein' | 'vegetarian' | 'vegan' | 'indian' | 'quick-meal')[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servingsDefault: number;
  caloriesPerServing: number;
  proteinPerServing: number;
  carbsPerServing: number;
  fatPerServing: number;
  fiberPerServing: number;
  image: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutritionTips: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: 'Nutrition Science' | 'Healthy Habits' | 'Myths & Facts' | 'Indian Nutrition' | 'Meal Planning';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  content: string[];
  takeaways: string[];
}

export interface UserGoals {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  dailyWaterMl: number;
  targetWeightKg?: number;
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'clean_eating';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
  dietPreference: 'all' | 'vegetarian' | 'vegan' | 'gluten_free';
  gender: 'male' | 'female' | 'other';
  age: number;
  weightKg: number;
  heightCm: number;
  goals: UserGoals;
}
