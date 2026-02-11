import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Plus, 
  Search, 
  X,
  Edit3,
  Trash2,
  Package
} from 'lucide-react';

interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  status: 'active' | 'pending' | 'expired';
}

const STORAGE_KEY = 'fiscal-express-vehicles';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    plate: '',
    brand: '',
    model: '',
    year: '',
  });

  // Load vehicles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setVehicles(JSON.parse(saved));
    }
  }, []);

  // Save vehicles to localStorage
  const saveVehicles = (newVehicles: Vehicle[]) => {
    setVehicles(newVehicles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
  };

  const filteredVehicles = vehicles.filter(v => 
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({ plate: '', brand: '', model: '', year: '' });
    setShowModal(true);
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      plate: vehicle.plate,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.plate.trim()) return;

    if (editingVehicle) {
      const updated = vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...v, ...formData }
          : v
      );
      saveVehicles(updated);
    } else {
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
      };
      saveVehicles([...vehicles, newVehicle]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    saveVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <motion.div 
      className="p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-xl font-bold text-surface-100">Mașinile Mele</h1>
          <p className="text-sm text-surface-400">{vehicles.length} înregistrate</p>
        </div>
        <motion.button
          className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={openAddModal}
        >
          <Plus size={20} className="text-white" />
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500" />
        <input
          type="text"
          placeholder="Caută după număr..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-mobile pl-11"
        />
      </div>

      {/* Vehicles List */}
      {filteredVehicles.length === 0 ? (
        <motion.div 
          className="card-mobile p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-surface-700/50 flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-surface-500" />
          </div>
          <h3 className="text-lg font-semibold text-surface-300 mb-2">
            {searchQuery ? 'Nicio mașină găsită' : 'Nicio mașină încă'}
          </h3>
          <p className="text-sm text-surface-500 mb-4">
            {searchQuery 
              ? 'Încearcă alt termen de căutare'
              : 'Adaugă prima ta mașină pentru a începe'
            }
          </p>
          {!searchQuery && (
            <motion.button
              className="btn-primary"
              whileTap={{ scale: 0.98 }}
              onClick={openAddModal}
            >
              <Plus size={18} className="inline mr-2" />
              Adaugă Mașină
            </motion.button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className="card-mobile p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-700 flex items-center justify-center">
                  <Car size={24} className="text-surface-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-surface-100 font-mono text-lg">
                    {vehicle.plate}
                  </p>
                  <p className="text-sm text-surface-400 truncate">
                    {vehicle.brand} {vehicle.model} {vehicle.year && `• ${vehicle.year}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    className="w-9 h-9 rounded-lg bg-surface-700 flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openEditModal(vehicle)}
                  >
                    <Edit3 size={16} className="text-surface-400" />
                  </motion.button>
                  <motion.button
                    className="w-9 h-9 rounded-lg bg-rose-500/20 flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    <Trash2 size={16} className="text-rose-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-surface-900 rounded-t-3xl p-6 pb-safe"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-surface-100">
                  {editingVehicle ? 'Editează Mașina' : 'Adaugă Mașină'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-surface-800 flex items-center justify-center"
                >
                  <X size={18} className="text-surface-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-surface-400 mb-1.5 block">Număr de înmatriculare *</label>
                  <input
                    type="text"
                    placeholder="TM-99-ABC"
                    value={formData.plate}
                    onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                    className="input-mobile font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-surface-400 mb-1.5 block">Marcă</label>
                    <input
                      type="text"
                      placeholder="BMW"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="input-mobile"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-surface-400 mb-1.5 block">Model</label>
                    <input
                      type="text"
                      placeholder="X5"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="input-mobile"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-surface-400 mb-1.5 block">An fabricație</label>
                  <input
                    type="text"
                    placeholder="2023"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="input-mobile"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Anulează
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 btn-primary"
                  disabled={!formData.plate.trim()}
                >
                  {editingVehicle ? 'Salvează' : 'Adaugă'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
