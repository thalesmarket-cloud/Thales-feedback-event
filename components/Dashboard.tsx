
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Feedback, Stats } from '../types';
import { COLORS } from '../constants';
import { 
  Download, Users, Star, ArrowLeft, Heart, MessageSquare, Target, 
  Trash2, List, BarChart3, Clock, Calendar, Building, User
} from 'lucide-react';

interface DashboardProps {
  feedbacks: Feedback[];
  onBack: () => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ feedbacks, onBack, onReset }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'details'>('summary');

  const calculateStats = (): Stats => {
    const total = feedbacks.length;
    if (total === 0) return { 
      total: 0, avgSatisfaction: 0, avgOrg: 0, avgContent: 0, recommendationDistribution: []
    };

    const avg = (keys: (keyof Feedback)[]) => {
      let sum = 0;
      feedbacks.forEach(f => {
        keys.forEach(k => sum += (f[k] as number));
      });
      return sum / (total * (keys.length || 1));
    };

    const recCounts = feedbacks.reduce((acc, curr) => {
      acc[curr.recommendation] = (acc[curr.recommendation] || 0) + 1;
      return acc;
    }, {} as any);

    return { 
      total, 
      avgSatisfaction: feedbacks.reduce((acc, curr) => acc + curr.globalSatisfaction, 0) / total,
      avgOrg: avg(['orgRating', 'logisticsRating', 'timingRating']),
      avgContent: avg(['relevanceRating', 'clarityRating', 'interestRating']),
      recommendationDistribution: [
        { name: 'Oui', value: recCounts['Oui'] || 0 },
        { name: 'Peut-être', value: recCounts['Peut-être'] || 0 },
        { name: 'Non', value: recCounts['Non'] || 0 },
      ]
    };
  };

  const stats = calculateStats();

  const handleResetClick = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement TOUTES les statistiques ? Cette action est irréversible.")) {
      onReset();
    }
  };

  const exportCSV = () => {
    if (feedbacks.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }
    const headers = "ID,Date,Nom,Entreprise,Satisfaction,Moyenne Org,Moyenne Contenu,Recommandation,Plus Apprécié,Améliorations\n";
    const rows = feedbacks.map(f => {
      const date = new Date(f.timestamp).toLocaleString('fr-FR');
      const avgOrg = ((f.orgRating + f.logisticsRating + f.timingRating) / 3).toFixed(1);
      const avgCont = ((f.relevanceRating + f.clarityRating + f.interestRating) / 3).toFixed(1);
      return `${f.id},${date},${f.name || '-'},${f.company || '-'},${f.globalSatisfaction},${avgOrg},${avgCont},${f.recommendation},"${(f.mostAppreciated || '').replace(/"/g, '""')}","${(f.improvements || '').replace(/"/g, '""')}"`;
    }).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Analytics_Thales_JPO.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const RatingBadge = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100 min-w-[100px]">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{label}</span>
      <div className="flex items-center space-x-1">
        <span className="text-lg font-black" style={{ color }}>{value.toFixed(1)}</span>
        <Star className="w-3 h-3 fill-current" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl pb-20 opacity-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button onClick={onBack} className="flex items-center text-blue-100 hover:text-white mb-2 transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour au formulaire
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics JPO Thales</h1>
          <p className="text-blue-100/80 font-medium">Bilan de l'amélioration continue</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleResetClick}
            className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-100 px-5 py-2.5 rounded-2xl hover:bg-red-500/40 transition-all font-bold text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
          <button 
            onClick={exportCSV}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-2xl hover:bg-white/20 transition-all font-bold text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exporter Data</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-white/10 p-1.5 rounded-2xl border border-white/10 mb-10 w-fit">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm ${
            activeTab === 'summary' ? 'bg-white text-[#0075B8] shadow-lg' : 'text-white hover:bg-white/10'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Vue d'ensemble</span>
        </button>
        <button 
          onClick={() => setActiveTab('details')}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm ${
            activeTab === 'details' ? 'bg-white text-[#0075B8] shadow-lg' : 'text-white hover:bg-white/10'
          }`}
        >
          <List className="w-4 h-4" />
          <span>Détails des réponses</span>
        </button>
      </div>

      {activeTab === 'summary' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <KPICard icon={<Users className="w-5 h-5 text-blue-600" />} label="Participations" value={stats.total.toString()} />
            <KPICard icon={<Star className="w-5 h-5 text-amber-500" />} label="Satisfaction" value={`${stats.avgSatisfaction.toFixed(1)}/5`} />
            <KPICard icon={<Target className="w-5 h-5 text-indigo-600" />} label="Pertinence Contenu" value={`${stats.avgContent.toFixed(1)}/5`} />
          </div>

          {stats.total > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center">
                    <span className="w-1 h-6 bg-[#0075B8] rounded-full mr-3"></span>
                    Performance par Pôle
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Satisfaction', val: stats.avgSatisfaction },
                        { name: 'Organisation', val: stats.avgOrg },
                        { name: 'Contenu', val: stats.avgContent }
                      ]} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" domain={[0, 5]} hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#64748b' }} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }} 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="val" fill={COLORS.primary} radius={[0, 8, 8, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center">
                    <span className="w-1 h-6 bg-[#0075B8] rounded-full mr-3"></span>
                    Ce qu'ils ont le plus apprécié
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feedbacks.filter(f => f.mostAppreciated).slice().reverse().slice(0, 4).map(f => (
                      <div key={f.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                        <Heart className="absolute top-4 right-4 w-4 h-4 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm text-slate-700 italic leading-relaxed mb-4">"{f.mostAppreciated}"</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-[#0075B8] text-white flex items-center justify-center rounded-full text-[10px] font-bold uppercase">
                            {(f.name || "A")[0]}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            {f.name || "Participant Anonyme"} • {f.company || "Indépendant"}
                          </span>
                        </div>
                      </div>
                    ))}
                    {feedbacks.filter(f => f.mostAppreciated).length === 0 && (
                      <p className="text-slate-400 italic text-sm p-4">Aucun commentaire pour le moment.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-8">Recommandation</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.recommendationDistribution}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {[COLORS.primary, COLORS.secondary, '#cbd5e1'].map((c, i) => (
                            <Cell key={i} fill={c} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-8 rounded-3xl shadow-xl text-white" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                  <MessageSquare className="w-10 h-10 mb-6 text-white/50" />
                  <h4 className="text-xl font-bold mb-2">Améliorations suggérées</h4>
                  <p className="text-sm text-white/80 mb-6">Points de friction identifiés pour la prochaine édition.</p>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {feedbacks.filter(f => f.improvements).length > 0 ? (
                      feedbacks.filter(f => f.improvements).map(f => (
                        <div key={f.id} className="text-xs bg-white/10 p-3 rounded-lg border border-white/5">
                          {f.improvements}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-white/50 italic">Aucune suggestion reçue.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-20 text-center border-2 border-white/10">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Aucune donnée disponible</h2>
              <p className="text-blue-100">Les statistiques s'afficheront ici dès que les premiers avis seront envoyés.</p>
            </div>
          )}
        </>
      ) : (
        /* Detailed Responses List View */
        <div className="space-y-6">
          {feedbacks.length > 0 ? (
            feedbacks.slice().reverse().map((f) => {
              const dateObj = new Date(f.timestamp);
              const dateStr = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
              const timeStr = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
              
              const avgOrg = (f.orgRating + f.logisticsRating + f.timingRating) / 3;
              const avgContent = (f.relevanceRating + f.clarityRating + f.interestRating) / 3;

              return (
                <div key={f.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all">
                  <div className="p-8">
                    {/* Entry Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-blue-50 text-[#0075B8] flex items-center justify-center rounded-2xl text-xl font-black uppercase">
                          {(f.name || "A")[0]}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-bold text-slate-800">{f.name || "Participant Anonyme"}</h4>
                            {f.recommendation === 'Oui' && <div className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">Recommande</div>}
                          </div>
                          <div className="flex items-center space-x-3 mt-1 text-slate-400 text-sm font-medium">
                            <span className="flex items-center"><Building className="w-3.5 h-3.5 mr-1" /> {f.company || "Indépendant"}</span>
                            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {dateStr} à {timeStr}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Detailed Ratings Badges */}
                      <div className="flex space-x-2 self-stretch md:self-auto overflow-x-auto pb-2 md:pb-0">
                        <RatingBadge label="Global" value={f.globalSatisfaction} color="#f59e0b" />
                        <RatingBadge label="Organisation" value={avgOrg} color="#0075B8" />
                        <RatingBadge label="Contenu" value={avgContent} color="#6366f1" />
                      </div>
                    </div>

                    {/* Entry Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl relative overflow-hidden">
                          <Heart className="absolute -right-2 -top-2 w-12 h-12 text-rose-500/5 rotate-12" />
                          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                            <Heart className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
                            Le plus apprécié
                          </h5>
                          <p className="text-slate-700 leading-relaxed font-medium italic">
                            {f.mostAppreciated ? `"${f.mostAppreciated}"` : "Aucun commentaire positif spécifique."}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl relative overflow-hidden">
                          <MessageSquare className="absolute -right-2 -top-2 w-12 h-12 text-blue-500/5 -rotate-12" />
                          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                            <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                            Améliorations suggérées
                          </h5>
                          <p className="text-slate-700 leading-relaxed font-medium">
                            {f.improvements ? f.improvements : "Aucune suggestion d'amélioration."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Internal Detailed Breakdown Table (Mini) */}
                    <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-2 md:grid-cols-6 gap-4">
                       <MiniScore label="Logistique" score={f.logisticsRating} />
                       <MiniScore label="Programme" score={f.timingRating} />
                       <MiniScore label="Sujets" score={f.relevanceRating} />
                       <MiniScore label="Clarté" score={f.clarityRating} />
                       <MiniScore label="Démos" score={f.interestRating} />
                       <MiniScore label="Organisation" score={f.orgRating} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-20 text-center border-2 border-white/10">
              <Users className="w-12 h-12 text-white/50 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Aucune réponse individuelle</h2>
              <p className="text-blue-100">Dès qu'un participant remplira le formulaire, son profil complet apparaîtra ici.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const KPICard = ({ icon, label, value }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
    <p className="text-3xl font-black text-slate-800">{value}</p>
  </div>
);

const MiniScore = ({ label, score }: { label: string, score: number }) => (
  <div className="flex flex-col">
    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">{label}</span>
    <div className="flex space-x-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <div key={s} className={`w-2.5 h-1 rounded-full ${s <= score ? 'bg-blue-400' : 'bg-slate-100'}`} />
      ))}
    </div>
  </div>
);

export default Dashboard;
