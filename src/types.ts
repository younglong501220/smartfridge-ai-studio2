export interface Ingredient {
  id: string;
  name: string;
  category: 'produce' | 'proteins' | 'dairy' | 'staples';
  selected: boolean;
  freshnessDays?: number;
}

export interface CustomIngredient {
  id: string;
  name: string;
}

export interface CookingStep {
  step: number;
  highlight: string;
  description: string;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  inFridge: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  badges: string[];
  prepTime: string;
  calories: string;
  difficulty: string;
  dietTag: string;
  ingredients: RecipeIngredient[];
  steps: CookingStep[];
  consumesDescription?: string;
  summaryTime?: string;
}

export type DietaryOption = '低碳水 (Low Carb)' | '高蛋白 (High Protein)' | '全素 (Vegan)' | '蛋奶素' | '生酮友好';
export type TimeOption = '15 分鐘以內' | '30 分鐘快手' | '60 分鐘慢煮';
export type ApplianceOption = '氣炸鍋' | '平底鍋' | '烤箱' | '電鍋';
export type DifficultyOption = '新手友善' | '中等難度' | '大廚挑戰';
export type ActiveTab = 'inventory' | 'generator' | 'favorites' | 'health';
