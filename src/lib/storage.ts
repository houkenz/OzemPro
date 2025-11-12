// LocalStorage helpers para persistência de dados

import { NutritionEntry, InjectionRecord, DailyGoals, UserProfile } from './types';

const KEYS = {
  NUTRITION: 'ozempro_nutrition_entries',
  INJECTIONS: 'ozempro_injections',
  GOALS: 'ozempro_daily_goals',
  PROFILE: 'ozempro_user_profile',
};

// User Profile
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
};

export const hasCompletedOnboarding = (): boolean => {
  const profile = getUserProfile();
  return profile?.completedOnboarding || false;
};

// Nutrition Entries
export const saveNutritionEntry = (entry: NutritionEntry): void => {
  const entries = getNutritionEntries();
  entries.push(entry);
  localStorage.setItem(KEYS.NUTRITION, JSON.stringify(entries));
};

export const getNutritionEntries = (): NutritionEntry[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(KEYS.NUTRITION);
  return data ? JSON.parse(data) : [];
};

export const getTodayNutrition = (): NutritionEntry | null => {
  const entries = getNutritionEntries();
  const today = new Date().toISOString().split('T')[0];
  return entries.find(e => e.date === today) || null;
};

// Injection Records
export const saveInjectionRecord = (record: InjectionRecord): void => {
  const records = getInjectionRecords();
  records.push(record);
  localStorage.setItem(KEYS.INJECTIONS, JSON.stringify(records));
};

export const getInjectionRecords = (): InjectionRecord[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(KEYS.INJECTIONS);
  return data ? JSON.parse(data) : [];
};

export const getLastInjection = (): InjectionRecord | null => {
  const records = getInjectionRecords();
  return records.length > 0 ? records[records.length - 1] : null;
};

// Daily Goals
export const saveDailyGoals = (goals: DailyGoals): void => {
  localStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
};

export const getDailyGoals = (): DailyGoals => {
  if (typeof window === 'undefined') {
    return { protein: 80, fiber: 30, water: 2000 };
  }
  const data = localStorage.getItem(KEYS.GOALS);
  return data ? JSON.parse(data) : { protein: 80, fiber: 30, water: 2000 };
};
