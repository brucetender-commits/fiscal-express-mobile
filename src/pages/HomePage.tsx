import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  FileCheck, 
  Globe,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

// Funcție pentru salut dinamic
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bună dimineața';
  if (hour >= 12 && hour < 18) return 'Bună ziua';
  if (hour >= 18 && hour < 22) return 'Bună seara';
  return 'Noapte bună';
}

function getGreetingEmoji(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return '☀️';
  if (hour >= 12 && hour < 18) return '🌤️';
  if (hour >= 18 && hour < 22) return '🌙';
  return '⭐';
}

const portals = [
  { 
    id: 'dfmt', 
    name: 'DFMT Cereri', 
    url: 'dfmt.ro',
    description: 'Cereri certificate fiscale',
    color: 'from-blue-500 to-blue-700',
    icon: FileCheck
  },
  { 
    id: 'atlas', 
    name: 'Atlas Plăți', 
    url: 'plata.dfmt.ro',
    description: 'Platformă plăți online',
    color: 'from-emerald-500 to-emerald-700',
    icon: Globe
  },
  { 
    id: 'websign', 
    name: 'WebSign', 
    url: 'websign.ro',
    description: 'Semnare electronică',
    color: 'from-purple-500 to-purple-700',
    icon: Sparkles
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="p-4 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-surface-100">
          {getGreeting()}, Grati {getGreetingEmoji()}
        </h1>
        <p className="text-surface-400 mt-1 text-sm">
          Bine ai venit în Fiscal Express
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          className="card-mobile p-4"
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/vehicles')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <Car size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-100">0</p>
              <p className="text-xs text-surface-400">Mașini</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card-mobile p-4"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <FileCheck size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-100">0</p>
              <p className="text-xs text-surface-400">Certificate</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Portals Section */}
      <div>
        <h2 className="text-lg font-semibold text-surface-100 mb-3">
          Portaluri Fiscale
        </h2>
        <div className="space-y-3">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.id}
              className="card-mobile p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/portal/${portal.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg`}>
                  <portal.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-surface-100">{portal.name}</p>
                  <p className="text-xs text-surface-400">{portal.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ExternalLink size={10} className="text-surface-500" />
                    <span className="text-[10px] text-surface-500">{portal.url}</span>
                  </div>
                </div>
                <ArrowRight size={20} className="text-surface-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <motion.button
        className="w-full btn-primary flex items-center justify-center gap-2"
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/vehicles')}
      >
        <Car size={18} />
        <span>Adaugă Prima Mașină</span>
      </motion.button>
    </motion.div>
  );
}
