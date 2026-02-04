
import React, { useState } from 'react';
import { DASHBOARD_PASSWORD, COLORS } from '../constants';
import { Lock, AlertCircle } from 'lucide-react';

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="max-w-md w-full animate-fade-in mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Accès Sécurisé</h2>
        <p className="text-slate-500 mb-8 text-sm">
          Veuillez entrer le mot de passe administrateur pour accéder aux statistiques Thalès JPO.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Mot de passe"
              className={`w-full p-4 bg-slate-50 border-2 rounded-xl focus:outline-none transition-all ${
                error ? 'border-red-300' : 'border-slate-100 focus:border-[#0076B9]'
              }`}
            />
            {error && (
              <div className="flex items-center space-x-1 text-red-500 text-xs mt-2 font-medium">
                <AlertCircle className="w-3 h-3" />
                <span>Mot de passe incorrect</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-md"
            style={{ backgroundColor: COLORS.primary }}
          >
            Déverrouiller l'accès
          </button>
        </form>

        <p className="mt-8 text-xs text-slate-400 italic">
          Indice pour la démo: <code className="bg-slate-100 px-1 rounded">thales-jpo-stats</code>
        </p>
      </div>
    </div>
  );
};

export default PasswordGate;
