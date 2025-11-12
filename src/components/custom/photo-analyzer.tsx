'use client';

import { useState } from 'react';
import { Camera, Upload, Loader2, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PhotoAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simular análise (em produção, usar API de IA)
    setIsAnalyzing(true);
    
    // Simulação de análise com IA
    setTimeout(() => {
      setResult({
        foodName: 'Refeição detectada',
        protein: Math.floor(Math.random() * 30) + 10,
        fiber: Math.floor(Math.random() * 10) + 2,
        calories: Math.floor(Math.random() * 300) + 200,
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Análise por Foto
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tire uma foto da sua refeição
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {!preview ? (
          <label className="block">
            <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-3 text-blue-500" />
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                Clique para enviar foto
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ou arraste e solte aqui
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            </div>

            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">Analisando imagem...</span>
              </div>
            ) : result ? (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Análise Concluída</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Proteína</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{result.protein}g</p>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fibra</p>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{result.fiber}g</p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calorias estimadas</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.calories} kcal</p>
                </div>

                <Button
                  onClick={() => {
                    setPreview(null);
                    setResult(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Analisar Nova Foto
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Para melhores resultados, tire a foto com boa iluminação e mostre toda a refeição.
        </p>
      </div>
    </Card>
  );
}
