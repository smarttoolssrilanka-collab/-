
import React from 'react';
import type { HoroscopeInput } from '../types';
import { LAGNA_OPTIONS } from '../constants';

interface HoroscopeFormProps {
  formData: HoroscopeInput;
  setFormData: React.Dispatch<React.SetStateAction<HoroscopeInput>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const HoroscopeForm: React.FC<HoroscopeFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm">
      <div className="md:col-span-2 text-center mb-2">
          <h2 className="text-2xl font-bold text-cyan-300">ඔබේ විස්තර ඇතුලත් කරන්න</h2>
          <p className="text-gray-400">හෙට දිනය සඳහා ඔබගේ පලාපල දැනගන්න.</p>
      </div>

      {/* Input Fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">නම</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
      </div>
      <div>
        <label htmlFor="birth_date" className="block text-sm font-medium text-gray-300 mb-1">උපන් දිනය</label>
        <input type="date" name="birth_date" id="birth_date" value={formData.birth_date} onChange={handleInputChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
      </div>
       <div>
        <label htmlFor="birth_time" className="block text-sm font-medium text-gray-300 mb-1">උපන් වේලාව</label>
        <input type="time" name="birth_time" id="birth_time" value={formData.birth_time} onChange={handleInputChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
      </div>
      <div>
        <label htmlFor="birth_place" className="block text-sm font-medium text-gray-300 mb-1">උපන් ස්ථානය</label>
        <input type="text" name="birth_place" id="birth_place" value={formData.birth_place} onChange={handleInputChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
      </div>
      <div>
        <label htmlFor="lagna" className="block text-sm font-medium text-gray-300 mb-1">ලග්නය</label>
        <select name="lagna" id="lagna" value={formData.lagna} onChange={handleInputChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition">
          {LAGNA_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
       <div>
        <label htmlFor="reference_date" className="block text-sm font-medium text-gray-300 mb-1">යොමු දිනය</label>
        <input type="date" name="reference_date" id="reference_date" value={formData.reference_date} onChange={handleInputChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
      </div>

      <div className="md:col-span-2 mt-4">
        <button type="submit" disabled={isLoading} className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed flex items-center justify-center">
          {isLoading ? (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : 'පලාපල ලබාගන්න'}
        </button>
      </div>
    </form>
  );
};
