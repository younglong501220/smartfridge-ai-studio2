import React, { useState } from 'react';
import { Sparkles, Shuffle } from 'lucide-react';
import { 
  Ingredient, 
  Recipe, 
  DietaryOption, 
  TimeOption, 
  ApplianceOption, 
  DifficultyOption, 
  ActiveTab 
} from './types';
import { 
  INITIAL_INGREDIENTS, 
  INITIAL_CUSTOM_TAGS, 
  PRIMARY_RECIPE, 
  ALTERNATIVE_RECIPES 
} from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IngredientSelector } from './components/IngredientSelector';
import { DietaryPreferences } from './components/DietaryPreferences';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Footer } from './components/Footer';
import { FridgeModal } from './components/FridgeModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { HealthModal } from './components/HealthModal';

export default function App() {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator');
  const [isFridgeModalOpen, setIsFridgeModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);

  // Ingredients State
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [customTags, setCustomTags] = useState<string[]>(INITIAL_CUSTOM_TAGS);

  // Dietary Preferences State
  const [selectedDiets, setSelectedDiets] = useState<DietaryOption[]>([
    '低碳水 (Low Carb)',
    '高蛋白 (High Protein)',
  ]);
  const [selectedTime, setSelectedTime] = useState<TimeOption>('30 分鐘快手');
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceOption>('平底鍋');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyOption>('新手友善');

  // Recipes State
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(PRIMARY_RECIPE);
  const [altRecipes, setAltRecipes] = useState<Recipe[]>(ALTERNATIVE_RECIPES);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false);

  // User Interactive Persistence Lists
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([PRIMARY_RECIPE.id]);
  const [cookingListIds, setCookingListIds] = useState<string[]>([]);

  // Count calculations
  const selectedStandardCount = ingredients.filter((i) => i.selected).length;
  const totalSelectedCount = selectedStandardCount + customTags.length;
  const totalFridgeCount = ingredients.length;

  // Handlers
  const handleToggleIngredient = (id: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleClearAllIngredients = () => {
    setIngredients((prev) => prev.map((item) => ({ ...item, selected: false })));
  };

  const handleSelectAllIngredients = () => {
    setIngredients((prev) => prev.map((item) => ({ ...item, selected: true })));
  };

  const handleAddCustomTag = (tag: string) => {
    if (!customTags.includes(tag)) {
      setCustomTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveCustomTag = (index: number) => {
    setCustomTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleDiet = (diet: DietaryOption) => {
    setSelectedDiets((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const handleToggleFavorite = (recipeId: string) => {
    setFavoriteRecipeIds((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const handleToggleCookingList = (recipeId: string) => {
    setCookingListIds((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const handleSelectRecipe = (newRecipe: Recipe) => {
    if (newRecipe.id === currentRecipe.id) return;
    // Swap current with alt
    const oldRecipe = currentRecipe;
    setCurrentRecipe(newRecipe);
    setAltRecipes((prev) => [
      oldRecipe,
      ...prev.filter((r) => r.id !== newRecipe.id),
    ]);
  };

  // Main AI Generation Trigger
  const handleGenerateRecipe = () => {
    setIsLoadingRecipe(true);

    // Smooth scroll on mobile to recipe card
    if (window.innerWidth < 1024) {
      const rightCol = document.getElementById('recipe-display-column');
      if (rightCol) {
        rightCol.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Dynamic generation simulation based on current selections
    setTimeout(() => {
      const activeIngredients = [
        ...ingredients.filter((i) => i.selected).map((i) => i.name),
        ...customTags,
      ];

      // Check if we can build a dynamic customized recipe based on selection
      if (activeIngredients.includes('雞胸肉') || activeIngredients.includes('番茄')) {
        setCurrentRecipe((prev) => ({
          ...prev,
          title: `地中海風香蒜洋蔥蘑菇嫩煎雞胸佐帕瑪森起司`,
          prepTime: selectedTime,
          difficulty: selectedDifficulty,
          dietTag: selectedDiets[0] || '高纖低脂',
          ingredients: [
            { name: '雞胸肉', amount: '200g', inFridge: true },
            { name: '洋蔥', amount: '1/2 顆', inFridge: true },
            { name: '蒜頭', amount: '3 瓣', inFridge: true },
            { name: '蘑菇', amount: '5 朵', inFridge: true },
            { name: '帕瑪森起司', amount: '15g', inFridge: true },
            { name: '橄欖油', amount: '少許', inFridge: true },
          ],
        }));
      }

      setIsLoadingRecipe(false);
    }, 2200);
  };

  // Randomize ingredients and preferences
  const handleRandomize = () => {
    setIngredients((prev) =>
      prev.map((item) => ({
        ...item,
        selected: Math.random() > 0.45,
      }))
    );

    const times: TimeOption[] = ['15 分鐘以內', '30 分鐘快手', '60 分鐘慢煮'];
    const appliances: ApplianceOption[] = ['氣炸鍋', '平底鍋', '烤箱', '電鍋'];
    const diffs: DifficultyOption[] = ['新手友善', '中等難度', '大廚挑戰'];

    setSelectedTime(times[Math.floor(Math.random() * times.length)]);
    setSelectedAppliance(appliances[Math.floor(Math.random() * appliances.length)]);
    setSelectedDifficulty(diffs[Math.floor(Math.random() * diffs.length)]);

    // Switch recipe
    const allRecipes = [PRIMARY_RECIPE, ...ALTERNATIVE_RECIPES];
    const pick = allRecipes[Math.floor(Math.random() * allRecipes.length)];
    if (pick.id !== currentRecipe.id) {
      handleSelectRecipe(pick);
    }
  };

  // Handle Tab navigation
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'inventory') {
      setIsFridgeModalOpen(true);
    } else if (tab === 'favorites') {
      setIsFavoritesDrawerOpen(true);
    } else if (tab === 'health') {
      setIsHealthModalOpen(true);
    }
  };

  // Compute all favorite recipes objects
  const allKnownRecipes = [PRIMARY_RECIPE, ...ALTERNATIVE_RECIPES];
  const favoriteRecipes = allKnownRecipes.filter((r) =>
    favoriteRecipeIds.includes(r.id)
  );

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-['Plus_Jakarta_Sans']">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favoriteRecipeIds.length}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 pb-16">
        {/* Hero Section */}
        <HeroSection
          selectedCount={totalSelectedCount}
          totalFridgeCount={totalFridgeCount}
        />

        {/* Bento Grid Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* LEFT CONFIGURATION COLUMN (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Step 1: Ingredient Selector */}
            <IngredientSelector
              ingredients={ingredients}
              onToggleIngredient={handleToggleIngredient}
              onClearAll={handleClearAllIngredients}
              customTags={customTags}
              onAddCustomTag={handleAddCustomTag}
              onRemoveCustomTag={handleRemoveCustomTag}
            />

            {/* Step 2: Dietary Preferences & Cooking Parameters */}
            <DietaryPreferences
              selectedDiets={selectedDiets}
              onToggleDiet={handleToggleDiet}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              selectedAppliance={selectedAppliance}
              onSelectAppliance={setSelectedAppliance}
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={setSelectedDifficulty}
            />

            {/* Primary Action Generation CTA Group */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                id="generate-recipe-btn"
                type="button"
                onClick={handleGenerateRecipe}
                className="flex-1 w-full h-16 rounded-2xl bg-gradient-to-r from-[#16452a] via-[#2f5d40] to-[#3e6751] text-white font-['Epilogue'] text-lg sm:text-xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all relative overflow-hidden group cursor-pointer"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <Sparkles className="w-6 h-6 text-[#ffdbcc] animate-spin" style={{ animationDuration: '8s' }} />
                <span>✨ 產生 AI 智慧食譜 (已選 {totalSelectedCount} 項食材)</span>
                <span className="w-2 h-2 rounded-full bg-[#ffb694] animate-pulse" />
              </button>

              <button
                id="random-mix-btn"
                type="button"
                onClick={handleRandomize}
                className="h-16 px-6 rounded-2xl bg-[#f0ede9] text-[#414942] hover:text-[#1c1c19] hover:bg-[#ebe8e3] transition-colors flex items-center justify-center gap-2 font-semibold text-sm shrink-0 cursor-pointer shadow-xs"
              >
                <Shuffle className="w-5 h-5 text-[#3e6751]" />
                隨機組合
              </button>
            </div>
          </div>

          {/* RIGHT GENERATED RECIPE COLUMN (5 cols) */}
          <div id="recipe-display-column" className="lg:col-span-5">
            <RecipeDisplay
              recipe={currentRecipe}
              alternativeRecipes={altRecipes}
              onSelectRecipe={handleSelectRecipe}
              isLoading={isLoadingRecipe}
              onToggleLoading={setIsLoadingRecipe}
              isFavorite={favoriteRecipeIds.includes(currentRecipe.id)}
              onToggleFavorite={handleToggleFavorite}
              isInCookingList={cookingListIds.includes(currentRecipe.id)}
              onToggleCookingList={handleToggleCookingList}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenFreshnessGuide={() => setIsFridgeModalOpen(true)}
        onOpenHardwareSync={() => setIsFridgeModalOpen(true)}
      />

      {/* Interactive Feature Modals */}
      <FridgeModal
        isOpen={isFridgeModalOpen}
        onClose={() => setIsFridgeModalOpen(false)}
        ingredients={ingredients}
        onToggleIngredient={handleToggleIngredient}
        onSelectAll={handleSelectAllIngredients}
        onGoToGenerator={() => setActiveTab('generator')}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favoriteRecipes}
        onSelectRecipe={handleSelectRecipe}
        onRemoveFavorite={handleToggleFavorite}
      />

      <HealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
        recipe={currentRecipe}
      />
    </div>
  );
}
