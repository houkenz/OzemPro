// Types para o aplicativo OzemPro

export interface NutritionEntry {
  id: string;
  date: string;
  protein: number; // gramas
  fiber: number; // gramas
  water: number; // ml
  timestamp: number;
}

export interface InjectionRecord {
  id: string;
  date: string;
  time: string;
  dosage: string;
  notes?: string;
  timestamp: number;
}

export interface DailyGoals {
  protein: number; // gramas
  fiber: number; // gramas
  water: number; // ml
}

export interface PhotoAnalysis {
  id: string;
  imageUrl: string;
  protein: number;
  fiber: number;
  calories: number;
  timestamp: number;
  foodName?: string;
}

export interface UserProfile {
  age: string;
  height: string;
  weight: string;
  medication: string;
  completedOnboarding: boolean;
}
