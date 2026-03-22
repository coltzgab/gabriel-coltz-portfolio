import React, { useState } from 'react';
import { analyzeBrand } from '../services/geminiService';
import { AnalysisStatus, BrandAnalysisResult } from '../types';
import { Button } from './Button';
import { BrainCircuit, Loader2, Sparkles, Target, Zap, Hash } from 'lucide-react';

export const SmartBriefing: React.FC = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<BrandAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!description.trim()) return;

    setStatus(AnalysisStatus.LOADING);
    try {
      const analysis = await analyzeBrand(description);
      setResult(analysis);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <section id="ai-audit" className="py-24 bg-organic-gray relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-organic-cyan via-organic-purple to-organic-cyan"></div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-organic-cyan">Organic</span> Intelligence
            </h2>
            <p className="text-organic-white/70">
              Não sabe por onde começar? Descreva seu negócio e nossa IA (powered by Gemini) criará um conceito inicial da sua marca em segundos.
            </p>
          </div>

          <div className="bg-organic-black border border-organic-white/10 p-8 rounded-[60px] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-organic-purple/20 blur-[100px] pointer-events-none"></div>

            {status === AnalysisStatus.IDLE || status === AnalysisStatus.LOADING || status === AnalysisStatus.ERROR ? (
              <div className="relative z-10">
                <label className="block text-sm font-bold uppercase tracking-wider mb-4 text-organic-cyan">
                  Descreva seu negócio ou ideia
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Sou nutricionista focada em performance para mulheres empreendedoras que não têm tempo..."
                  className="w-full h-32 bg-organic-white/5 border border-organic-white/10 p-6 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors resize-none mb-6 rounded-[40px]"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-organic-white/40">*Isso é apenas uma demonstração. A estratégia real é feita por humanos.</p>
                  <Button
                    onClick={handleAnalyze}
                    disabled={status === AnalysisStatus.LOADING || !description}
                    className="flex items-center gap-2"
                  >
                    {status === AnalysisStatus.LOADING ? (
                      <><Loader2 className="animate-spin" size={20} /> Processando...</>
                    ) : (
                      <><BrainCircuit size={20} /> Gerar Conceito</>
                    )}
                  </Button>
                </div>
                {status === AnalysisStatus.ERROR && (
                  <p className="text-red-400 mt-4 text-sm">Ocorreu um erro ao conectar com a IA. Tente novamente.</p>
                )}
              </div>
            ) : (
              <div className="relative z-10 animate-fade-in">
                <div className="flex justify-between items-start mb-8 border-b border-organic-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-organic-white mb-2">Conceito Gerado</h3>
                    <p className="text-sm text-organic-white/50">Baseado na sua descrição</p>
                  </div>
                  <button
                    onClick={() => { setStatus(AnalysisStatus.IDLE); setResult(null); setDescription(''); }}
                    className="text-xs underline text-organic-white/50 hover:text-organic-cyan"
                  >
                    Tentar novamente
                  </button>
                </div>

                {result && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="col-span-2 bg-gradient-to-r from-organic-cyan/10 to-transparent p-6 border-l-4 border-organic-cyan rounded-r-[60px]">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={18} className="text-organic-cyan" />
                        <span className="text-xs uppercase tracking-widest font-bold text-organic-cyan">Sugestão de Tagline</span>
                      </div>
                      <p className="font-display text-2xl md:text-3xl font-bold text-organic-white">"{result.tagline}"</p>
                    </div>

                    <div className="bg-organic-white/5 p-6 rounded-[60px]">
                      <div className="flex items-center gap-2 mb-4">
                        <Target size={18} className="text-organic-purple" />
                        <span className="text-xs uppercase tracking-widest font-bold text-organic-purple">Pilares de Conteúdo</span>
                      </div>
                      <ul className="space-y-3 px-2">
                        {result.pillars.map((pillar, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 mt-2 bg-organic-purple rounded-full"></span>
                            <span className="text-organic-white/90">{pillar}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-organic-white/5 p-6 rounded-[60px] flex flex-col justify-center text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap size={18} className="text-yellow-400" />
                        <span className="text-xs uppercase tracking-widest font-bold text-yellow-400">Vibe Visual</span>
                      </div>
                      <p className="text-organic-white/90 italic px-4 py-2">
                        "{result.vibe}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 text-center">
                  <p className="mb-4 text-organic-white/70">Gostou da direção? Vamos transformar isso em um plano real.</p>
                  <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} fullWidth>
                    Agendar Reunião Estratégica
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};