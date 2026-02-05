
import React from 'react';
import { COLORS } from '../constants';

const Header: React.FC = () => {
  const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Thales_Group_Logo.svg/1280px-Thales_Group_Logo.svg.png";

  return (
    <div className="text-center mb-10 w-full opacity-100">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white rounded-2xl shadow-xl border border-white/20 flex items-center justify-center overflow-hidden">
          <img 
            src={logoUrl} 
            alt="Thalès Informatique" 
            className="max-h-12 w-auto object-contain"
          />
        </div>
      </div>
      <h1 className="text-4xl font-black text-white mb-4 tracking-tight drop-shadow-lg">Votre avis compte</h1>
      <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed text-lg font-medium opacity-100">
        Merci d’avoir participé à notre Journée Portes Ouvertes. Votre retour nous aidera à améliorer nos futurs événements.
      </p>
    </div>
  );
};

export default Header;
