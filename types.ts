export enum Category {
  Food = 'Food',
  Transport = 'Transport',
  Bills = 'Bills',
  Entertainment = 'Entertainment',
  Shopping = 'Shopping',
  Other = 'Other',
}

export type Expense = {
  id: string;
  amount: number;
  category: Category;
  date: Date;
  note: string;
};

export type CatMood = 'happy' | 'worried' | 'angry';
export type CatStage = 'kitten' | 'teen' | 'adult';

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.Food]: '#FF9999',         // Pastel Red
  [Category.Transport]: '#99CCFF',    // Pastel Blue
  [Category.Bills]: '#FFCC99',        // Pastel Orange
  [Category.Entertainment]: '#CC99FF', // Pastel Purple
  [Category.Shopping]: '#99FF99',     // Pastel Green
  [Category.Other]: '#CCCCCC',        // Grey
};

// --- CUSTOMIZATION TYPES ---

export type CatId = 'pertti' | 'nana' | 'nini' | 'shnupi';
export type HatId = 'none' | 'red' | 'blue' | 'orange' | 'purple' | 'crown';

export interface CatProfile {
  id: CatId;
  name: string;
  description: string;
}

export interface HatProfile {
  id: HatId;
  name: string;
  color: string;
}

export const CAT_PROFILES: CatProfile[] = [
  { id: 'pertti', name: 'Pertti', description: 'Ragdoll' },
  { id: 'nana', name: 'Nana', description: 'Odd-Eye White' },
  { id: 'nini', name: 'Nini', description: 'Calico' },
  { id: 'shnupi', name: 'Shnupi', description: 'Li Hua Tabby' },
];

export const HAT_PROFILES: HatProfile[] = [
  { id: 'none', name: 'No Hat', color: 'transparent' },
  { id: 'red', name: 'Pastel Red', color: '#FFAB91' },
  { id: 'blue', name: 'Pastel Blue', color: '#90CAF9' },
  { id: 'orange', name: 'Pastel Orange', color: '#FFCC80' },
  { id: 'purple', name: 'Pastel Purple', color: '#CE93D8' },
];