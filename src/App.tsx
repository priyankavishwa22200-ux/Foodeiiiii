import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FoodDatabasePage } from './pages/FoodDatabasePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecipesPage } from './pages/RecipesPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { BlogPage } from './pages/BlogPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { FoodDetailModal } from './components/FoodDetailModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { QuickLogModal } from './components/QuickLogModal';
import { NutritionProvider } from './context/NutritionContext';
import { FoodItem, Recipe } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Modal States
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);

  // Comparison Seed State
  const [compareFoodA, setCompareFoodA] = useState<string>('paneer');
  const [compareFoodB, setCompareFoodB] = useState<string>('tofu');

  const handleCompareWith = (foodId: string) => {
    setCompareFoodA(foodId);
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NutritionProvider>
      <div className="min-h-screen bg-[#FFFDF5] text-gray-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-200 selection:text-emerald-900">
        {/* Persistent Sticky Navbar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenQuickLog={() => setIsQuickLogOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-grow">
          {activeTab === 'home' && (
            <HomePage
              onSelectTab={setActiveTab}
              onSelectFood={setSelectedFood}
              onSelectRecipe={setSelectedRecipe}
            />
          )}

          {activeTab === 'database' && (
            <FoodDatabasePage
              onSelectFood={setSelectedFood}
              onCompareWith={handleCompareWith}
            />
          )}

          {activeTab === 'calculator' && <CalculatorPage />}

          {activeTab === 'dashboard' && (
            <DashboardPage
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenQuickLog={() => setIsQuickLogOpen(true)}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'recipes' && (
            <RecipesPage onSelectRecipe={setSelectedRecipe} />
          )}

          {activeTab === 'compare' && (
            <ComparisonPage
              key={`${compareFoodA}-${compareFoodB}`}
              initialFoodIdA={compareFoodA}
              initialFoodIdB={compareFoodB}
            />
          )}

          {activeTab === 'blog' && <BlogPage />}

          {activeTab === 'about' && <AboutContactPage />}
        </main>

        {/* Global Footer with Medical & Nutritional Disclaimer */}
        <Footer onSelectTab={setActiveTab} />

        {/* Modals & Dialogs */}
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onCompareWith={handleCompareWith}
        />

        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <QuickLogModal
          isOpen={isQuickLogOpen}
          onClose={() => setIsQuickLogOpen(false)}
          onOpenDetailedFood={(food) => setSelectedFood(food)}
        />
      </div>
    </NutritionProvider>
  );
}
