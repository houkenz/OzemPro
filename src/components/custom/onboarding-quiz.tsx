'use client';

import { useState } from 'react';
import { Syringe, User, Ruler, Weight, Check } from 'lucide-react';

interface UserProfile {
  age: string;
  height: string;
  weight: string;
  medication: string;
}

interface OnboardingQuizProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    height: '',
    weight: '',
    medication: '',
  });

  const medications = ['Ozempic', 'Wegovy', 'Mounjaro', 'Saxenda', 'Victoza', 'Zepbound', 'Trulicity', 'Byetta'];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.age !== '' && parseInt(profile.age) > 0;
      case 2:
        return profile.height !== '' && parseFloat(profile.height) > 0;
      case 3:
        return profile.weight !== '' && parseFloat(profile.weight) > 0;
      case 4:
        return profile.medication !== '';
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Syringe className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            OzemPro
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vamos conhecer você melhor
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-1/4 h-2 rounded-full mx-1 transition-all duration-300 ${
                  s <= step
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Passo {step} de 4
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Step 1: Age */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                  <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Qual é a sua idade?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Isso nos ajuda a personalizar sua experiência
                  </p>
                </div>
              </div>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                placeholder="Ex: 35"
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:bg-gray-700 dark:text-gray-100 transition-all"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: Height */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-xl">
                  <Ruler className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Qual é a sua altura?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Em centímetros (cm)
                  </p>
                </div>
              </div>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                placeholder="Ex: 170"
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:bg-gray-700 dark:text-gray-100 transition-all"
                autoFocus
              />
            </div>
          )}

          {/* Step 3: Weight */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-xl">
                  <Weight className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Qual é o seu peso?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Em quilogramas (kg)
                  </p>
                </div>
              </div>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                placeholder="Ex: 85"
                step="0.1"
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:bg-gray-700 dark:text-gray-100 transition-all"
                autoFocus
              />
            </div>
          )}

          {/* Step 4: Medication */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                  <Syringe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Qual caneta você está usando?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Selecione sua medicação
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {medications.map((med) => (
                  <button
                    key={med}
                    onClick={() => setProfile({ ...profile, medication: med })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      profile.medication === med
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {med}
                      </span>
                      {profile.medication === med && (
                        <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 4 ? 'Começar' : 'Próximo'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Seus dados são armazenados apenas no seu dispositivo
        </p>
      </div>
    </div>
  );
}
