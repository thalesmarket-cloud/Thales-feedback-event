
import React from 'react';

const Header: React.FC = () => {
  const logoUrl = "https://i.ibb.co/p6F8sRrQ/Logo-Thales-White.png";

  return (
    <div className="text-center mb-10 w-full block">
      <div className="flex justify-center mb-6">
        <div className="p-4 flex items-center justify-center overflow-hidden">
          <img 
            src={logoUrl} 
            alt="Thalès Informatique" 
            className="max-h-24 w-auto object-contain drop-shadow-lg"
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
