import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MobileLayout from './components/MobileLayout';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import PortalPage from './pages/PortalPage';
import SettingsPage from './pages/SettingsPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/portal/:type" element={<PortalPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <MobileLayout>
        <AnimatedRoutes />
      </MobileLayout>
    </HashRouter>
  );
}

export default App;
