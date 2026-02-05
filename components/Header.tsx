
import React from 'react';

const Header: React.FC = () => {
  const logoUrl = "https://thales.ma/wp-content/uploads/2019/12/logo-thales2020-1.png";

  return (
    <div className="text-center mb-10 w-full block">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white rounded-2xl shadow-xl border border-white/20 flex items-center justify-center overflow-hidden">
          <img 
            src={logoUrl} 
            alt="Thalès Informatique" 
            className="max-h-12 w-auto object-contain"
          />
        </div>
      </div>
      <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Votre avis compte</h1>
      <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
        Merci d’avoir participé à notre Journée Portes Ouvertes. Votre retour nous aidera à améliorer nos futurs événements.
      </p>
    </div>
  );
};

export default Header;
