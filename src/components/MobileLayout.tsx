import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Car, Globe, Settings } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', icon: Home, label: 'Acasă' },
  { path: '/vehicles', icon: Car, label: 'Mașini' },
  { path: '/portal/dfmt', icon: Globe, label: 'Portal' },
  { path: '/settings', icon: Settings, label: 'Setări' },
];

export default function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-900/95 backdrop-blur-xl border-t border-surface-700/50 pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path.includes('/portal') && location.pathname.includes('/portal'));
            const Icon = item.icon;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center w-16 h-full"
                whileTap={{ scale: 0.9 }}
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-500/20' 
                    : 'bg-transparent'
                }`}>
                  <Icon 
                    size={22} 
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-primary-400' : 'text-surface-500'
                    }`} 
                  />
                </div>
                <span className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary-400' : 'text-surface-500'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
