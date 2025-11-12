'use client';

import { Syringe, Camera, Calendar, TrendingUp, Shield, Smartphone, Check, ArrowRight, Heart, Activity, Droplet } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: Camera,
      title: 'Análise por Foto',
      description: 'Tire uma foto da sua refeição e receba análise instantânea de proteínas, fibras e calorias',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Calendar,
      title: 'Controle de Injeções',
      description: 'Nunca mais esqueça suas aplicações com lembretes inteligentes e histórico completo',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento Nutricional',
      description: 'Monitore proteínas, fibras e hidratação diária de forma simples e visual',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Privacidade Total',
      description: 'Seus dados ficam apenas no seu dispositivo. Sem compartilhamento, sem riscos',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const medications = ['Ozempic', 'Wegovy', 'Mounjaro', 'Saxenda', 'Victoza', 'Zepbound', 'Trulicity', 'Byetta'];

  const benefits = [
    'Acompanhamento personalizado para seu tratamento',
    'Interface intuitiva e fácil de usar',
    'Análise nutricional com inteligência artificial',
    'Lembretes automáticos de aplicação',
    'Histórico completo de injeções',
    'Monitoramento de metas diárias',
    'Totalmente gratuito',
    'Funciona offline',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950">
      {/* Header/Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Syringe className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                OzemPro
              </h1>
            </div>
            <Link
              href="/"
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Acessar App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
            <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Seu companheiro de tratamento
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Acompanhe seu tratamento com{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              simplicidade
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            O aplicativo completo para quem usa canetas de GLP-1. Controle suas injeções, 
            monitore nutrição e alcance seus objetivos de saúde.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              Ver Demonstração
            </button>
          </div>

          {/* Medications Supported */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Compatível com:</span>
            {medications.map((med) => (
              <span
                key={med}
                className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {med}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tudo que você precisa em um só lugar
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Funcionalidades pensadas especialmente para quem está em tratamento com GLP-1
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Por que escolher o OzemPro?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-white/20 rounded-full mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Proteínas</h4>
                    <p className="text-white/80">Acompanhamento diário</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Fibras</h4>
                    <p className="text-white/80">Metas personalizadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Droplet className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Hidratação</h4>
                    <p className="text-white/80">Controle de água</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Como funciona?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Simples, rápido e eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white text-2xl font-bold mb-4">
              1
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Cadastre-se
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Informe seus dados básicos e qual medicação você está usando
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white text-2xl font-bold mb-4">
              2
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Registre suas refeições
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Tire fotos ou adicione manualmente seus alimentos
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white text-2xl font-bold mb-4">
              3
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Acompanhe seu progresso
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Veja suas estatísticas e alcance seus objetivos
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-3xl p-8 md:p-12 text-center border border-purple-200 dark:border-purple-800">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pronto para começar sua jornada?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão transformando sua saúde com o OzemPro
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Começar Gratuitamente
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Sem cadastro. Sem cartão de crédito. Totalmente gratuito.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Syringe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                OzemPro
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              💚 Feito com carinho para sua saúde e bem-estar
            </p>
            <div className="flex gap-4">
              <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Acessar App
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
