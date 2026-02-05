
import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';
import PasswordGate from './components/PasswordGate';
import { Feedback } from './types';
import { ShieldCheck } from 'lucide-react';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'success' | 'admin'>('form');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('thales_jpo_v2_feedbacks');
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    } else {
      const dummy: Feedback[] = [
        { 
          id: '1', timestamp: new Date().toISOString(), 
          name: 'Jean Dupont', company: 'Tech Solutions', 
          globalSatisfaction: 5, orgRating: 5, logisticsRating: 4, timingRating: 5,
          relevanceRating: 5, clarityRating: 5, interestRating: 4,
          mostAppreciated: 'Les démos de cybersécurité.', improvements: 'Le parking était un peu loin.',
          recommendation: 'Oui'
        },
        { 
          id: '2', timestamp: new Date().toISOString(), 
          globalSatisfaction: 4, orgRating: 4, logisticsRating: 5, timingRating: 3,
          relevanceRating: 4, clarityRating: 4, interestRating: 5,
          mostAppreciated: 'La clarté des intervenants.', improvements: 'Sessions un peu trop courtes.',
          recommendation: 'Peut-être'
        }
      ];
      setFeedbacks(dummy);
      localStorage.setItem('thales_jpo_v2_feedbacks', JSON.stringify(dummy));
    }
  }, []);

  const handleFeedbackSubmit = (newFeedback: Omit<Feedback, 'id' | 'timestamp'>) => {
    const feedback: Feedback = {
      ...newFeedback,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    const updated = [...feedbacks, feedback];
    setFeedbacks(updated);
    localStorage.setItem('thales_jpo_v2_feedbacks', JSON.stringify(updated));
    setView('success');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-4" style={{ backgroundColor: COLORS.primary }}>
      {/* Admin Quick Link */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setView(view === 'admin' ? 'form' : 'admin')}
          className="bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/30 text-white hover:bg-white/40 transition-all"
          title="Administration"
        >
          <ShieldCheck className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full flex justify-center items-start">
        {view === 'form' && <FeedbackForm onSubmit={handleFeedbackSubmit} />}

        {view === 'success' && (
          <div className="max-w-md w-full bg-white rounded-3xl p-12 shadow-2xl text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-[#0075B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Merci pour votre retour !</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Votre avis est précieux pour nous. Il nous permet d'améliorer continuellement l'expérience Thales Informatique.
            </p>
            <button 
              onClick={() => setView('form')}
              className="inline-flex items-center justify-center px-8 py-3 bg-[#0075B8] text-white rounded-xl font-semibold hover:bg-[#19B4E6] transition-all shadow-lg"
            >
              Fermer
            </button>
            <p className="mt-6 text-sm text-slate-400 font-medium">À très bientôt.</p>
          </div>
        )}

        {view === 'admin' && (
          <PasswordGate>
            <Dashboard feedbacks={feedbacks} onBack={() => setView('form')} />
          </PasswordGate>
        )}
      </div>
    </div>
  );
};

export default App;
