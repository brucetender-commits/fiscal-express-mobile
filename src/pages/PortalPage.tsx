import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { 
  ArrowLeft, 
  ExternalLink, 
  FileCheck,
  Globe,
  Sparkles
} from 'lucide-react';

const portals = {
  dfmt: {
    name: 'DFMT Cereri',
    url: 'https://dfmt.ro',
    description: 'Portalul pentru cereri certificate fiscale',
    color: 'from-blue-500 to-blue-700',
    icon: FileCheck,
  },
  atlas: {
    name: 'Atlas Plăți',
    url: 'https://plata.dfmt.ro',
    description: 'Platformă plăți taxe și impozite',
    color: 'from-emerald-500 to-emerald-700',
    icon: Globe,
  },
  websign: {
    name: 'WebSign',
    url: 'https://websign.ro',
    description: 'Semnare electronică documente',
    color: 'from-purple-500 to-purple-700',
    icon: Sparkles,
  },
};

export default function PortalPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const portal = portals[type as keyof typeof portals] || portals.dfmt;
  const Icon = portal.icon;

  const openInBrowser = async () => {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ 
        url: portal.url,
        presentationStyle: 'fullscreen',
        toolbarColor: '#0f172a',
      });
    } else {
      window.open(portal.url, '_blank');
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <motion.button
          className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} className="text-surface-400" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-surface-100">{portal.name}</h1>
          <p className="text-xs text-surface-400">{portal.url}</p>
        </div>
        <motion.button
          className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center"
          whileTap={{ scale: 0.95, rotate: 180 }}
          onClick={openInBrowser}
        >
          <ExternalLink size={18} className="text-surface-400" />
        </motion.button>
      </div>

      {/* Portal Card */}
      <div className="flex-1 p-4 flex flex-col">
        <motion.div 
          className="card-mobile p-6 flex-1 flex flex-col items-center justify-center text-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-2xl mb-6`}>
            <Icon size={40} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-surface-100 mb-2">
            {portal.name}
          </h2>
          
          <p className="text-surface-400 mb-6 max-w-xs">
            {portal.description}
          </p>

          <motion.button
            className="btn-primary flex items-center gap-3 px-8"
            whileTap={{ scale: 0.98 }}
            onClick={openInBrowser}
          >
            <Globe size={20} />
            <span>Deschide Portalul</span>
          </motion.button>

          <p className="text-xs text-surface-500 mt-4">
            Se va deschide în browser-ul dispozitivului
          </p>
        </motion.div>

        {/* Quick Links */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {Object.entries(portals).map(([key, p]) => {
            const PortalIcon = p.icon;
            const isActive = key === type;
            
            return (
              <motion.button
                key={key}
                className={`p-3 rounded-xl text-center ${
                  isActive 
                    ? 'bg-primary-500/20 border border-primary-500/30' 
                    : 'bg-surface-800/50 border border-surface-700/50'
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/portal/${key}`)}
              >
                <PortalIcon 
                  size={18} 
                  className={`mx-auto mb-1 ${isActive ? 'text-primary-400' : 'text-surface-500'}`} 
                />
                <span className={`text-[10px] ${isActive ? 'text-primary-300' : 'text-surface-500'}`}>
                  {p.name.split(' ')[0]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
