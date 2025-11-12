'use client';

import { useState, useEffect } from 'react';
import { Beef, Wheat, Droplets, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { NutritionEntry } from '@/lib/types';
import { saveNutritionEntry, getTodayNutrition, getDailyGoals } from '@/lib/storage';

export default function NutritionCard() {
  const [todayData, setTodayData] = useState<NutritionEntry | null>(null);
  const [goals] = useState(getDailyGoals());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ protein: '', fiber: '', water: '' });

  useEffect(() => {
    setTodayData(getTodayNutrition());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    
    const newEntry: NutritionEntry = {
      id: Date.now().toString(),
      date: today,
      protein: (todayData?.protein || 0) + Number(formData.protein || 0),
      fiber: (todayData?.fiber || 0) + Number(formData.fiber || 0),
      water: (todayData?.water || 0) + Number(formData.water || 0),
      timestamp: Date.now(),
    };

    saveNutritionEntry(newEntry);
    setTodayData(newEntry);
    setFormData({ protein: '', fiber: '', water: '' });
    setShowForm(false);
  };

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Nutrição Diária
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Proteína (g)</label>
            <Input
              type="number"
              value={formData.protein}
              onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fibra (g)</label>
            <Input
              type="number"
              value={formData.fiber}
              onChange={(e) => setFormData({ ...formData, fiber: e.target.value })}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Água (ml)</label>
            <Input
              type="number"
              value={formData.water}
              onChange={(e) => setFormData({ ...formData, water: e.target.value })}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
            Salvar
          </Button>
        </form>
      )}

      <div className="space-y-6">
        {/* Proteína */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Beef className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800 dark:text-gray-100">Proteína</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {todayData?.protein || 0}g / {goals.protein}g
            </span>
          </div>
          <Progress value={getPercentage(todayData?.protein || 0, goals.protein)} className="h-3" />
        </div>

        {/* Fibra */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wheat className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-gray-800 dark:text-gray-100">Fibra</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {todayData?.fiber || 0}g / {goals.fiber}g
            </span>
          </div>
          <Progress value={getPercentage(todayData?.fiber || 0, goals.fiber)} className="h-3" />
        </div>

        {/* Água */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800 dark:text-gray-100">Água</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {todayData?.water || 0}ml / {goals.water}ml
            </span>
          </div>
          <Progress value={getPercentage(todayData?.water || 0, goals.water)} className="h-3" />
        </div>
      </div>
    </Card>
  );
}
