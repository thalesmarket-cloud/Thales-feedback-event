
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
        <div className="p-2.5 bg-blue-50 text-[#0075B8] rounded-xl">
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
            <Star className={`w-8 h-8 ${s <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-200 group-hover:text-slate-300'}`} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl pb-24 block">
      <Header />

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-14 border border-slate-100 block">
        
        {error && (
          <div className="mb-10 p-5 bg-red-50 border border-red-100 text-red-600 rounded-3xl flex items-start space-x-3">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        <SectionTitle icon={User} sub="Ces informations nous permettent de mieux vous connaître (facultatif)">Informations générales</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nom & Prénom</label>
            <div className="relative group">
              <User className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
              <input 
                type="text" placeholder="Ex: Marc Lefebvre"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#0075B8] focus:bg-white outline-none transition-all font-medium"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Entreprise</label>
            <div className="relative group">
              <Building className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
              <input 
                type="text" placeholder="Thales, etc."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#0075B8] focus:bg-white outline-none transition-all font-medium"
                value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>
        </div>

        <SectionTitle icon={Heart}>Satisfaction globale</SectionTitle>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-12 text-center">
          <p className="text-slate-800 font-bold text-lg mb-6">Quel est votre niveau de satisfaction global concernant la JPO ?</p>
          <div className="flex justify-center space-x-4">
            {[1, 2, 3, 4, 5].map(s => (
              <button 
                key={s} type="button" onClick={() => handleStarClick('globalSatisfaction', s)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star className={`w-12 h-12 ${s <= formData.globalSatisfaction ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>

        <SectionTitle icon={Settings}>Déroulement</SectionTitle>
        <div className="bg-slate-50 px-8 rounded-3xl border border-slate-100 mb-12">
          <StarRow label="Organisation générale" value={formData.orgRating} onSet={(v:any) => handleStarClick('orgRating', v)} />
          <StarRow label="Accueil & logistique" value={formData.logisticsRating} onSet={(v:any) => handleStarClick('logisticsRating', v)} />
          <StarRow label="Respect du programme" value={formData.timingRating} onSet={(v:any) => handleStarClick('timingRating', v)} />
        </div>

        <SectionTitle icon={CheckCircle}>Contenu</SectionTitle>
        <div className="bg-slate-50 px-8 rounded-3xl border border-slate-100 mb-12">
          <StarRow label="Pertinence des sujets" value={formData.relevanceRating} onSet={(v:any) => handleStarClick('relevanceRating', v)} />
          <StarRow label="Clarté des présentations" value={formData.clarityRating} onSet={(v:any) => handleStarClick('clarityRating', v)} />
          <StarRow label="Intérêt des démonstrations" value={formData.interestRating} onSet={(v:any) => handleStarClick('interestRating', v)} />
        </div>

        <SectionTitle icon={MessageCircle}>Expérience</SectionTitle>
        <div className="space-y-8 mb-12">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600">Le plus apprécié ?</label>
            <textarea 
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#0075B8] outline-none h-32 resize-none font-medium"
              value={formData.mostAppreciated} onChange={e => setFormData({...formData, mostAppreciated: e.target.value})}
            />
          </div>
        </div>

        <SectionTitle icon={Target}>Recommandation</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {(['Oui', 'Peut-être', 'Non'] as Recommendation[]).map(opt => (
            <button
              key={opt} type="button"
              onClick={() => setFormData({...formData, recommendation: opt})}
              className={`py-4 rounded-xl font-bold border-2 transition-all ${
                formData.recommendation === opt 
                ? 'border-[#0075B8] bg-blue-50 text-[#0075B8]' 
                : 'border-slate-100 bg-white text-slate-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-6 rounded-3xl font-black text-white text-xl uppercase tracking-widest shadow-xl flex items-center justify-center space-x-4"
          style={{ backgroundColor: COLORS.primary }}
        >
          <span>Envoyer</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
