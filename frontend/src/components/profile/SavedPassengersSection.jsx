import React, { useState } from 'react';
import { Users, Plus, Trash2, Edit2 } from 'lucide-react';
import Button from '../Button';
import toast from 'react-hot-toast';

const SavedPassengersSection = () => {
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'Alice Smith', age: 25, gender: 'Female', relation: 'Self' },
    { id: 2, name: 'Bob Smith', age: 26, gender: 'Male', relation: 'Spouse' }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newPassenger, setNewPassenger] = useState({ name: '', age: '', gender: 'Male', relation: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPassenger.name || !newPassenger.age || !newPassenger.relation) {
      toast.error('Please fill all fields');
      return;
    }
    
    setPassengers([...passengers, { ...newPassenger, id: Date.now() }]);
    setNewPassenger({ name: '', age: '', gender: 'Male', relation: '' });
    setIsAdding(false);
    toast.success('Passenger added successfully!');
  };

  const handleDelete = (id) => {
    setPassengers(passengers.filter(p => p.id !== id));
    toast.success('Passenger removed.');
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-500" />
          Saved Passengers
        </h2>
        {!isAdding && (
          <Button variant="primary" className="py-2 px-4 rounded-xl text-sm" onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 mb-6 animate-[fadeInDown_0.3s_ease-out]">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Add Passenger</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newPassenger.name}
              onChange={(e) => setNewPassenger({...newPassenger, name: e.target.value})}
              className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/50"
            />
            <input
              type="number"
              placeholder="Age"
              value={newPassenger.age}
              onChange={(e) => setNewPassenger({...newPassenger, age: e.target.value})}
              className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/50"
            />
            <select
              value={newPassenger.gender}
              onChange={(e) => setNewPassenger({...newPassenger, gender: e.target.value})}
              className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/50 appearance-none"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="text"
              placeholder="Relationship (e.g. Brother)"
              value={newPassenger.relation}
              onChange={(e) => setNewPassenger({...newPassenger, relation: e.target.value})}
              className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" className="py-2 px-4 rounded-xl text-sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="py-2 px-6 rounded-xl text-sm">
              Save Passenger
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {passengers.length === 0 ? (
          <p className="text-sm font-bold text-gray-500 text-center py-8">No saved passengers yet.</p>
        ) : (
          passengers.map(p => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white">{p.name}</h4>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-0.5">
                  {p.age} yrs • {p.gender} • <span className="text-indigo-500">{p.relation}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-indigo-500 flex items-center justify-center transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedPassengersSection;
