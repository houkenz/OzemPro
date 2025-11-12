'use client';

import { useState, useEffect } from 'react';
import { Syringe, Calendar, Clock, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InjectionRecord } from '@/lib/types';
import { saveInjectionRecord, getInjectionRecords, getLastInjection } from '@/lib/storage';

export default function InjectionTracker() {
  const [records, setRecords] = useState<InjectionRecord[]>([]);
  const [lastInjection, setLastInjection] = useState<InjectionRecord | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    dosage: '',
    notes: '',
  });

  useEffect(() => {
    setRecords(getInjectionRecords());
    setLastInjection(getLastInjection());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: InjectionRecord = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      dosage: formData.dosage,
      notes: formData.notes,
      timestamp: Date.now(),
    };

    saveInjectionRecord(newRecord);
    setRecords([...records, newRecord]);
    setLastInjection(newRecord);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      dosage: '',
      notes: '',
    });
    setShowForm(false);
  };

  const getDaysSinceLastInjection = () => {
    if (!lastInjection) return null;
    const lastDate = new Date(lastInjection.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSince = getDaysSinceLastInjection();

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Controle de Injeções
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="mt-1"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dosagem</label>
            <Input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              placeholder="Ex: 0.5mg"
              className="mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Observações</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Local da aplicação, reações, etc."
              className="mt-1"
              rows={2}
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Salvar Registro
          </Button>
        </form>
      )}

      {lastInjection ? (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Syringe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Última Injeção</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {daysSince === 0 ? 'Hoje' : `${daysSince} ${daysSince === 1 ? 'dia' : 'dias'} atrás`}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(lastInjection.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{lastInjection.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Syringe className="w-4 h-4" />
                <span>Dosagem: {lastInjection.dosage}</span>
              </div>
            </div>
          </div>

          {records.length > 1 && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Histórico Recente</h3>
              <div className="space-y-2">
                {records.slice(-3).reverse().map((record) => (
                  <div key={record.id} className="flex justify-between items-center text-sm py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <span className="text-gray-600 dark:text-gray-400">
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">{record.dosage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Syringe className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhuma injeção registrada ainda</p>
          <p className="text-sm mt-1">Clique em "Registrar" para adicionar</p>
        </div>
      )}
    </Card>
  );
}
