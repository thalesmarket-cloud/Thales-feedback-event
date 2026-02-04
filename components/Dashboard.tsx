
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Feedback, Stats } from '../types';
import { COLORS } from '../constants';
import { Download, Users, Star, ArrowLeft, Heart, MessageSquare, Target } from 'lucide-react';

interface DashboardProps {
  feedbacks: Feedback[];
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ feedbacks, onBack }) => {
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

  const exportCSV = () => {
    const headers = "ID,Nom,Entreprise,Satisfaction,Moyenne Org,Moyenne Contenu,Recommandation,Remarque\n";
    const rows = feedbacks.map(f => `${f.id},${f.name || '-'},${f.company || '-'},${f.globalSatisfaction},${((f.orgRating+f.logisticsRating+f.timingRating)/3).toFixed(1)},${((f.relevanceRating+f.clarityRating+f.interestRating)/3).toFixed(1)},${f.recommendation},"${f.mostAppreciated.replace(/"/g, '""')}"`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Analytics_Thales_JPO.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="w-full max-w-6xl animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <button onClick={onBack} className="flex items-center text-blue-100 hover:text-white mb-2 transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour au formulaire
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics JPO Thales</h1>
          <p className="text-blue-100/80 font-medium">Bilan de l'amélioration continue</p>
        </div>
        <button 
          onClick={exportCSV}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all shadow-lg font-bold"
        >
          <Download className="w-5 h-5" />
          <span>Exporter Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <KPICard icon={<Users className="w-5 h-5 text-blue-600" />} label="Participations" value={stats.total.toString()} />
        <KPICard icon={<Star className="w-5 h-5 text-amber-500" />} label="Satisfaction" value={`${stats.avgSatisfaction.toFixed(1)}/5`} />
        <KPICard icon={<Target className="w-5 h-5 text-indigo-600" />} label="Pertinence Contenu" value={`${stats.avgContent.toFixed(1)}/5`} />
      </div>

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
              {feedbacks.slice().reverse().slice(0, 4).map(f => (
                <div key={f.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                  <Heart className="absolute top-4 right-4 w-4 h-4 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-4">"{f.mostAppreciated || "N/A"}"</p>
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

          <div className="bg-gradient-to-br from-[#0075B8] to-[#19B4E6] p-8 rounded-3xl shadow-xl text-white">
            <MessageSquare className="w-10 h-10 mb-6 text-white/50" />
            <h4 className="text-xl font-bold mb-2">Améliorations suggérées</h4>
            <p className="text-sm text-white/80 mb-6">Points de friction identifiés pour la prochaine édition.</p>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {feedbacks.filter(f => f.improvements).map(f => (
                <div key={f.id} className="text-xs bg-white/10 p-3 rounded-lg border border-white/5">
                  {f.improvements}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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

export default Dashboard;
