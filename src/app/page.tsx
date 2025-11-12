'use client';

import { useState, useEffect } from 'react';
import NutritionCard from '@/components/custom/nutrition-card';
import InjectionTracker from '@/components/custom/injection-tracker';
import PhotoAnalyzer from '@/components/custom/photo-analyzer';
import OnboardingQuiz from '@/components/custom/onboarding-quiz';
import { Activity, Heart, Syringe } from 'lucide-react';
import { hasCompletedOnboarding, saveUserProfile, getUserProfile } from '@/lib/storage';
import { UserProfile } from '@/lib/types';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = hasCompletedOnboarding();
    const profile = getUserProfile();
    setShowOnboarding(!completed);
    setUserProfile(profile);
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: Omit<UserProfile, 'completedOnboarding'>) => {
    const fullProfile: UserProfile = {
      ...profile,
      completedOnboarding: true,
    };
    saveUserProfile(fullProfile);
    setUserProfile(fullProfile);
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg animate-pulse">
            <Syringe className="w-12 h-12 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingQuiz onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Syringe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  OzemPro
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Seu acompanhamento diário
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 rounded-full">
              <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userProfile?.medication || 'Cuidando de você'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Bem-vindo ao OzemPro! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Acompanhe sua jornada com {userProfile?.medication || 'sua medicação'} de forma simples e eficiente. 
            Registre suas refeições, controle suas injeções e monitore seus nutrientes diários.
          </p>
        </div>

        {/* User Stats Card */}
        {userProfile && (
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex flex-wrap gap-4 justify-center text-center">
              <div className="flex-1 min-w-[100px]">
                <p className="text-sm text-gray-600 dark:text-gray-400">Idade</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{userProfile.age}</p>
              </div>
              <div className="flex-1 min-w-[100px]">
                <p className="text-sm text-gray-600 dark:text-gray-400">Altura</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{userProfile.height} cm</p>
              </div>
              <div className="flex-1 min-w-[100px]">
                <p className="text-sm text-gray-600 dark:text-gray-400">Peso</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{userProfile.weight} kg</p>
              </div>
              <div className="flex-1 min-w-[100px]">
                <p className="text-sm text-gray-600 dark:text-gray-400">Medicação</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{userProfile.medication}</p>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Nutrition Card */}
          <div className="lg:col-span-1">
            <NutritionCard />
          </div>

          {/* Injection Tracker */}
          <div className="lg:col-span-1">
            <InjectionTracker />
          </div>
        </div>

        {/* Photo Analyzer - Full Width */}
        <div className="mb-6">
          <PhotoAnalyzer />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Proteínas</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Essenciais para manutenção muscular durante o tratamento
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Fibras</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ajudam na digestão e saciedade prolongada
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Hidratação</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fundamental para o bom funcionamento do organismo
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full">
              <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                Dicas para o seu tratamento
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>✓ Mantenha uma rotina regular de aplicação das injeções</li>
                <li>✓ Priorize alimentos ricos em proteínas e fibras</li>
                <li>✓ Beba pelo menos 2 litros de água por dia</li>
                <li>✓ Registre suas refeições para melhor acompanhamento</li>
                <li>✓ Consulte seu médico regularmente</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💚 Feito com carinho para sua saúde e bem-estar
          </p>
        </div>
      </footer>
    </div>
  );
}
