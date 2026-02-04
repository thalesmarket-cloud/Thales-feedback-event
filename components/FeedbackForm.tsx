
import React, { useState } from 'react';
import Header from './Header';
import { COLORS } from '../constants';
import { Recommendation } from '../types';
import { Star, ChevronRight, User, Building, CheckCircle, Info, Settings, Heart, MessageCircle, ShieldCheck, Target } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (feedback: any) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '',
    globalSatisfaction: 0,
    orgRating: 0, logisticsRating: 0, timingRating: 0,
    relevanceRating: 0, clarityRating: 0, interestRating: 0,
    mostAppreciated: '', improvements: '',
    recommendation: '' as Recommendation
  });

  const [error, setError] = useState('');

  const handleStarClick = (key: string, val: number) => {
    setFormData(prev => ({ ...prev, [key]: val }));
    setError('');
  };

  const validate = () => {
    if (formData.globalSatisfaction === 0) return "Veuillez évaluer votre satisfaction globale.";
    if (!formData.orgRating || !formData.logisticsRating || !formData.timingRating) return "L'évaluation de l'organisation est incomplète.";
    if (!formData.relevanceRating || !formData.clarityRating || !formData.interestRating) return "L'évaluation du contenu est incomplète.";
    if (!formData.recommendation) return "Veuillez indiquer si vous recommanderiez nos événements.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onSubmit(formData);
  };

  const SectionTitle = ({ children, icon: Icon, sub }: any) => (
    <div className="mb-8 mt-12 first:mt-0">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2.5 bg-blue-50 text-[#0076B9] rounded-xl">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{children}</h3>
      </div>
      {sub && <p className="text-sm text-slate-400 font-medium ml-[44px]">{sub}</p>}
    </div>
  );

  const StarRow = ({ label, value, onSet }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-50 last:border-0 group">
      <span className="text-slate-600 font-semibold mb-3 sm:mb-0 group-hover:text-slate-900 transition-colors">{label}</span>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map(s => (
          <button 
            key={s} type="button" onClick={() => onSet(s)}
            className="focus:outline-none transition-all hover:scale-125 transform active:scale-90"
          >
            <Star className={`w-8 h-8 ${s <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-100 group-hover:text-slate-200'}`} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24">
      <Header />

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-14 border border-slate-100">
        
        {error && (
          <div className="mb-10 p-5 bg-red-50 border border-red-100 text-red-600 rounded-3xl flex items-start space-x-3 animate-in slide-in-from-top-4">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        {/* Section A : Infos Générales */}
        <SectionTitle icon={User} sub="Ces informations nous permettent de mieux vous connaître (facultatif)">Informations générales</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nom & Prénom</label>
            <div className="relative group">
              <User className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-[#0076B9] transition-colors" />
              <input 
                type="text" placeholder="Ex: Marc Lefebvre"
                className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-[#0076B9] focus:bg-white outline-none transition-all font-medium"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Entreprise</label>
            <div className="relative group">
              <Building className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-[#0076B9] transition-colors" />
              <input 
                type="text" placeholder="Thales, etc."
                className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-[#0076B9] focus:bg-white outline-none transition-all font-medium"
                value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Section B : Satisfaction Globale */}
        <SectionTitle icon={Heart}>Satisfaction globale</SectionTitle>
        <div className="bg-gradient-to-br from-blue-50/50 to-white p-8 rounded-3xl border border-slate-100 mb-12 text-center">
          <p className="text-slate-800 font-bold text-lg mb-6">Quel est votre niveau de satisfaction global concernant la Journée Portes Ouvertes ?</p>
          <div className="flex justify-center space-x-4">
            {[1, 2, 3, 4, 5].map(s => (
              <button 
                key={s} type="button" onClick={() => handleStarClick('globalSatisfaction', s)}
                className="focus:outline-none transition-all hover:scale-125 transform active:scale-95"
              >
                <Star className={`w-14 h-14 ${s <= formData.globalSatisfaction ? 'fill-amber-400 text-amber-400 drop-shadow-md' : 'text-slate-200'}`} />
              </button>
            ))}
          </div>
          <div className="flex justify-between max-w-[320px] mx-auto mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <span>Pas du tout satisfait</span>
            <span>Très satisfait</span>
          </div>
        </div>

        {/* Section C : Déroulement */}
        <SectionTitle icon={Settings}>Déroulement de l’événement</SectionTitle>
        <div className="bg-slate-50/30 px-8 rounded-3xl border border-slate-50 mb-12">
          <StarRow label="Organisation générale" value={formData.orgRating} onSet={(v:any) => handleStarClick('orgRating', v)} />
          <StarRow label="Accueil & logistique" value={formData.logisticsRating} onSet={(v:any) => handleStarClick('logisticsRating', v)} />
          <StarRow label="Respect du programme et du timing" value={formData.timingRating} onSet={(v:any) => handleStarClick('timingRating', v)} />
        </div>

        {/* Section D : Contenu */}
        <SectionTitle icon={CheckCircle}>Contenu & interventions</SectionTitle>
        <div className="bg-slate-50/30 px-8 rounded-3xl border border-slate-50 mb-12">
          <StarRow label="Pertinence des sujets abordés" value={formData.relevanceRating} onSet={(v:any) => handleStarClick('relevanceRating', v)} />
          <StarRow label="Clarté des présentations" value={formData.clarityRating} onSet={(v:any) => handleStarClick('clarityRating', v)} />
          <StarRow label="Intérêt des démonstrations / échanges" value={formData.interestRating} onSet={(v:any) => handleStarClick('interestRating', v)} />
        </div>

        {/* Section E : Expérience Globale */}
        <SectionTitle icon={MessageCircle}>Expérience globale</SectionTitle>
        <div className="space-y-8 mb-12">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600 ml-1">Qu’avez-vous le plus apprécié lors de cet événement ?</label>
            <textarea 
              className="w-full p-5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-[#0076B9] focus:bg-white outline-none transition-all h-32 resize-none font-medium placeholder-slate-300"
              placeholder="Ex: La démonstration de l'IA embarquée..."
              value={formData.mostAppreciated} onChange={e => setFormData({...formData, mostAppreciated: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600 ml-1">Quels points pourraient être améliorés selon vous ?</label>
            <textarea 
              className="w-full p-5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-[#0076B9] focus:bg-white outline-none transition-all h-32 resize-none font-medium placeholder-slate-300"
              placeholder="Ex: Plus de temps pour les questions-réponses..."
              value={formData.improvements} onChange={e => setFormData({...formData, improvements: e.target.value})}
            />
          </div>
        </div>

        {/* Section F : Recommandation */}
        <SectionTitle icon={Target}>Recommandation</SectionTitle>
        <p className="text-slate-600 font-bold mb-6">Recommanderiez-vous les événements Thalès Informatique à votre entourage professionnel ?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {(['Oui', 'Peut-être', 'Non'] as Recommendation[]).map(opt => (
            <button
              key={opt} type="button"
              onClick={() => setFormData({...formData, recommendation: opt})}
              className={`py-5 rounded-2xl font-black text-sm uppercase tracking-widest border-2 transition-all ${
                formData.recommendation === opt 
                ? 'border-[#0076B9] bg-blue-50 text-[#0076B9] shadow-inner' 
                : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-6 rounded-3xl font-black text-white text-xl uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-2xl flex items-center justify-center space-x-4 group"
          style={{ backgroundColor: COLORS.primary }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.secondary}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.primary}
        >
          <span>Envoyer mon feedback</span>
          <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex flex-col items-center space-y-2 mt-10">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Thales Informatique • Journée Portes Ouvertes
          </p>
          <div className="flex items-center space-x-2 text-[10px] text-slate-300 font-medium">
            <ShieldCheck className="w-3 h-3" />
            <span>Réponses confidentielles et sécurisées</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
