import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { FoodItem, MealLogItem, NutrientProfile, Recipe, UserGoals, UserProfile } from '../types';
import { calculateNutrientsForGrams, DEFAULT_USER_GOALS } from '../utils/nutritionCalculators';
import { FOOD_DATABASE } from '../data/nutritionData';

interface DailyTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface NutritionContextType {
  foodLog: MealLogItem[];
  userProfile: UserProfile;
  waterDrankMl: number;
  favoriteFoodIds: string[];
  favoriteRecipeIds: string[];
  dailyTotals: DailyTotals;
  remainingCalories: number;
  mealsByType: {
    breakfast: MealLogItem[];
    lunch: MealLogItem[];
    dinner: MealLogItem[];
    snack: MealLogItem[];
  };
  addFoodToLog: (food: FoodItem, grams: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  addRecipeToLog: (recipe: Recipe, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', servings?: number) => void;
  removeMealItem: (id: string) => void;
  updateMealItemGrams: (id: string, grams: number) => void;
  clearTodayLog: () => void;
  addWaterGlass: () => void;
  removeWaterGlass: () => void;
  resetWater: () => void;
  setWaterAmount: (ml: number) => void;
  updateGoals: (goals: UserGoals) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toggleFavoriteFood: (id: string) => void;
  toggleFavoriteRecipe: (id: string) => void;
  weeklyHistory: { day: string; calories: number; target: number; protein: number; carbs: number; fat: number }[];
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

const INITIAL_PROFILE: UserProfile = {
  name: 'Priyanka V.',
  email: 'priyanka@example.com',
  isLoggedIn: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  dietPreference: 'vegetarian',
  gender: 'female',
  age: 28,
  weightKg: 62,
  heightCm: 165,
  goals: DEFAULT_USER_GOALS,
};

// Realistic prefilled entries for today's log so the dashboard is immediately vivid and interactive
const SAMPLE_LOG: MealLogItem[] = [
  {
    id: 'sample-1',
    foodId: 'oats',
    foodName: 'Rolled Oats (Raw)',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80',
    mealType: 'breakfast',
    grams: 50,
    calories: 195,
    protein: 8.5,
    carbs: 33.2,
    fat: 3.5,
    fiber: 5.3,
    sugar: 0.5,
    timestamp: '08:30 AM',
  },
  {
    id: 'sample-2',
    foodId: 'banana',
    foodName: 'Banana (Ripe)',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
    mealType: 'breakfast',
    grams: 118,
    calories: 105,
    protein: 1.3,
    carbs: 26.9,
    fat: 0.4,
    fiber: 3.1,
    sugar: 14.4,
    timestamp: '08:35 AM',
  },
  {
    id: 'sample-3',
    foodId: 'paneer',
    foodName: 'Paneer (Fresh Indian Cottage Cheese)',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
    mealType: 'lunch',
    grams: 100,
    calories: 265,
    protein: 18.3,
    carbs: 3.2,
    fat: 20.8,
    fiber: 0,
    sugar: 2.8,
    timestamp: '01:15 PM',
  },
  {
    id: 'sample-4',
    foodId: 'roti',
    foodName: 'Whole Wheat Roti / Chapati (Without oil)',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    mealType: 'lunch',
    grams: 80,
    calories: 211,
    protein: 7.3,
    carbs: 44.3,
    fat: 1.7,
    fiber: 6.8,
    sugar: 0.6,
    timestamp: '01:20 PM',
  },
  {
    id: 'sample-5',
    foodId: 'almonds',
    foodName: 'Almonds (Raw, Whole)',
    image: 'https://images.unsplash.com/photo-1508061252445-535e5ed43611?auto=format&fit=crop&w=400&q=80',
    mealType: 'snack',
    grams: 28,
    calories: 162,
    protein: 5.9,
    carbs: 6.0,
    fat: 14.0,
    fiber: 3.5,
    sugar: 1.2,
    timestamp: '04:45 PM',
  },
];

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodLog, setFoodLog] = useState<MealLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('nutrilife_food_log');
      return saved ? JSON.parse(saved) : SAMPLE_LOG;
    } catch {
      return SAMPLE_LOG;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('nutrilife_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [waterDrankMl, setWaterDrankMl] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nutrilife_water');
      return saved ? Number(saved) : 1750; // 7 glasses by afternoon
    } catch {
      return 1750;
    }
  });

  const [favoriteFoodIds, setFavoriteFoodIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nutrilife_fav_foods');
      return saved ? JSON.parse(saved) : ['apple', 'paneer', 'oats', 'almonds'];
    } catch {
      return ['apple', 'paneer', 'oats', 'almonds'];
    }
  });

  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nutrilife_fav_recipes');
      return saved ? JSON.parse(saved) : ['paneer-quinoa-bowl', 'berry-chia-oats'];
    } catch {
      return ['paneer-quinoa-bowl', 'berry-chia-oats'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nutrilife_food_log', JSON.stringify(foodLog));
    } catch (e) {
      console.error(e);
    }
  }, [foodLog]);

  useEffect(() => {
    try {
      localStorage.setItem('nutrilife_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('nutrilife_water', waterDrankMl.toString());
    } catch (e) {
      console.error(e);
    }
  }, [waterDrankMl]);

  useEffect(() => {
    try {
      localStorage.setItem('nutrilife_fav_foods', JSON.stringify(favoriteFoodIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteFoodIds]);

  useEffect(() => {
    try {
      localStorage.setItem('nutrilife_fav_recipes', JSON.stringify(favoriteRecipeIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteRecipeIds]);

  const dailyTotals = useMemo<DailyTotals>(() => {
    return foodLog.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: Number((acc.protein + item.protein).toFixed(1)),
        carbs: Number((acc.carbs + item.carbs).toFixed(1)),
        fat: Number((acc.fat + item.fat).toFixed(1)),
        fiber: Number((acc.fiber + item.fiber).toFixed(1)),
        sugar: Number((acc.sugar + item.sugar).toFixed(1)),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
  }, [foodLog]);

  const mealsByType = useMemo(() => {
    return {
      breakfast: foodLog.filter((item) => item.mealType === 'breakfast'),
      lunch: foodLog.filter((item) => item.mealType === 'lunch'),
      dinner: foodLog.filter((item) => item.mealType === 'dinner'),
      snack: foodLog.filter((item) => item.mealType === 'snack'),
    };
  }, [foodLog]);

  const remainingCalories = userProfile.goals.dailyCalories - dailyTotals.calories;

  const addFoodToLog = (
    food: FoodItem,
    grams: number,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ) => {
    const calculated: NutrientProfile = calculateNutrientsForGrams(food.per100g, grams);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newItem: MealLogItem = {
      id: `${food.id}-${Date.now()}`,
      foodId: food.id,
      foodName: food.name,
      image: food.image,
      mealType,
      grams,
      calories: calculated.calories,
      protein: calculated.protein,
      carbs: calculated.carbs,
      fat: calculated.fat,
      fiber: calculated.fiber,
      sugar: calculated.sugar,
      timestamp: timeStr,
    };

    setFoodLog((prev) => [newItem, ...prev]);
  };

  const addRecipeToLog = (
    recipe: Recipe,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    servings: number = 1
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const factor = Math.max(0.5, servings);

    const newItem: MealLogItem = {
      id: `${recipe.id}-${Date.now()}`,
      foodId: recipe.id,
      foodName: `${recipe.title} (${servings} serving${servings > 1 ? 's' : ''})`,
      image: recipe.image,
      mealType,
      grams: Math.round(250 * factor),
      calories: Math.round(recipe.caloriesPerServing * factor),
      protein: Number((recipe.proteinPerServing * factor).toFixed(1)),
      carbs: Number((recipe.carbsPerServing * factor).toFixed(1)),
      fat: Number((recipe.fatPerServing * factor).toFixed(1)),
      fiber: Number((recipe.fiberPerServing * factor).toFixed(1)),
      sugar: Number((2 * factor).toFixed(1)),
      timestamp: timeStr,
    };

    setFoodLog((prev) => [newItem, ...prev]);
  };

  const removeMealItem = (id: string) => {
    setFoodLog((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMealItemGrams = (id: string, grams: number) => {
    setFoodLog((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const baseFood = FOOD_DATABASE.find((f) => f.id === item.foodId);
        if (baseFood) {
          const calc = calculateNutrientsForGrams(baseFood.per100g, grams);
          return {
            ...item,
            grams,
            calories: calc.calories,
            protein: calc.protein,
            carbs: calc.carbs,
            fat: calc.fat,
            fiber: calc.fiber,
            sugar: calc.sugar,
          };
        } else {
          // proportional scaling if custom recipe
          const ratio = grams / (item.grams || 100);
          return {
            ...item,
            grams,
            calories: Math.round(item.calories * ratio),
            protein: Number((item.protein * ratio).toFixed(1)),
            carbs: Number((item.carbs * ratio).toFixed(1)),
            fat: Number((item.fat * ratio).toFixed(1)),
            fiber: Number((item.fiber * ratio).toFixed(1)),
            sugar: Number((item.sugar * ratio).toFixed(1)),
          };
        }
      })
    );
  };

  const clearTodayLog = () => {
    setFoodLog([]);
  };

  const addWaterGlass = () => {
    setWaterDrankMl((prev) => Math.min(prev + 250, 5000));
  };

  const removeWaterGlass = () => {
    setWaterDrankMl((prev) => Math.max(prev - 250, 0));
  };

  const resetWater = () => {
    setWaterDrankMl(0);
  };

  const setWaterAmount = (ml: number) => {
    setWaterDrankMl(Math.max(0, ml));
  };

  const updateGoals = (newGoals: UserGoals) => {
    setUserProfile((prev) => ({
      ...prev,
      goals: newGoals,
    }));
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...partial,
      goals: partial.goals ? partial.goals : prev.goals,
    }));
  };

  const toggleFavoriteFood = (id: string) => {
    setFavoriteFoodIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFavoriteRecipe = (id: string) => {
    setFavoriteRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 7-day realistic weekly trend (including today's actual live data)
  const weeklyHistory = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
    const pastCalories = [1920, 2050, 1840, 2120, 1980, 2210];
    const pastProteins = [115, 128, 108, 130, 118, 122];
    const pastCarbs = [210, 225, 205, 230, 215, 240];
    const pastFats = [62, 68, 59, 70, 64, 75];

    return days.map((day, idx) => {
      const isToday = idx === 6;
      return {
        day,
        calories: isToday ? dailyTotals.calories : pastCalories[idx],
        target: userProfile.goals.dailyCalories,
        protein: isToday ? Math.round(dailyTotals.protein) : pastProteins[idx],
        carbs: isToday ? Math.round(dailyTotals.carbs) : pastCarbs[idx],
        fat: isToday ? Math.round(dailyTotals.fat) : pastFats[idx],
      };
    });
  }, [dailyTotals, userProfile.goals.dailyCalories]);

  return (
    <NutritionContext.Provider
      value={{
        foodLog,
        userProfile,
        waterDrankMl,
        favoriteFoodIds,
        favoriteRecipeIds,
        dailyTotals,
        remainingCalories,
        mealsByType,
        addFoodToLog,
        addRecipeToLog,
        removeMealItem,
        updateMealItemGrams,
        clearTodayLog,
        addWaterGlass,
        removeWaterGlass,
        resetWater,
        setWaterAmount,
        updateGoals,
        updateProfile,
        toggleFavoriteFood,
        toggleFavoriteRecipe,
        weeklyHistory,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
