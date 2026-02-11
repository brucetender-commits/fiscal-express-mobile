import { motion } from 'framer-motion';
import { 
  Bell,
  Moon,
  Smartphone,
  Info,
  ChevronRight,
  Github
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <motion.div 
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-xl font-bold text-surface-100">Setări</h1>
        <p className="text-sm text-surface-400">Personalizează aplicația</p>
      </div>

      {/* Profile Section */}
      <div className="card-mobile p-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-xl font-bold text-white">G</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-surface-100">Grati</p>
            <p className="text-sm text-surface-400">Utilizator Premium</p>
          </div>
          <ChevronRight size={20} className="text-surface-600" />
        </div>
      </div>

      {/* Settings Groups */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider px-1">
          Preferințe
        </p>
        <div className="card-mobile divide-y divide-surface-700/50">
          <SettingItem icon={Bell} label="Notificări" value="Activate" />
          <SettingItem icon={Moon} label="Mod Întunecat" value="Activ" />
          <SettingItem icon={Smartphone} label="Haptic Feedback" value="Activat" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider px-1">
          Despre
        </p>
        <div className="card-mobile divide-y divide-surface-700/50">
          <SettingItem icon={Info} label="Versiune" value="1.0.0" />
          <SettingItem icon={Github} label="Dezvoltat de" value="Stefan" />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-surface-500">
          Fiscal Express © 2026
        </p>
        <p className="text-[10px] text-surface-600 mt-1">
          Cu ❤️ pentru Timișoara
        </p>
      </div>
    </motion.div>
  );
}

function SettingItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <motion.div 
      className="flex items-center gap-4 p-4"
      whileTap={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
    >
      <div className="w-9 h-9 rounded-lg bg-surface-700/50 flex items-center justify-center">
        <Icon size={18} className="text-surface-400" />
      </div>
      <span className="flex-1 text-surface-200">{label}</span>
      <span className="text-sm text-surface-500">{value}</span>
      <ChevronRight size={16} className="text-surface-600" />
    </motion.div>
  );
}
