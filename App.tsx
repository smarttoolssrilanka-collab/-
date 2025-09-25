
import React, { useState } from 'react';
import { HoroscopeForm } from './components/HoroscopeForm';
import { HoroscopeDisplay } from './components/HoroscopeDisplay';
import { generateHoroscope } from './services/geminiService';
import type { HoroscopeInput, HoroscopeOutput } from './types';
import { LAGNA_OPTIONS } from './constants';

function App() {
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<HoroscopeInput>({
    name: 'නිමල්',
    birth_date: '1990-07-15',
    birth_time: '14:30',
    birth_place: 'කොළඹ',
    lagna: LAGNA_OPTIONS[4], // සිංහ
    reference_date: getTodayDateString(),
  });
  
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setHoroscopeData(null);

    try {
      const result = await generateHoroscope(formData);
      setHoroscopeData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 pb-2">
            දෛනික ලග්න පලාපල
          </h1>
          <p className="text-lg text-gray-400 mt-2"> ප්‍රසිද්ද ජෝතිශ්‍යවේදී මද්දුම කලුආරච්චි ඔබගේ දෛනික ජ්‍යෝතිෂ මාර්ගෝපදේශය</p>
        </header>

        <div className="max-w-3xl mx-auto">
          <HoroscopeForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-center">
              <p className="font-bold">දෝෂයක් ඇතිවිය!</p>
              <p>{error}</p>
            </div>
          )}

          {horoscopeData && (
            <div className="animate-slide-up">
              <HoroscopeDisplay data={horoscopeData} />
            </div>
          )}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ප්‍රසිද්ද ජෝතිශ්‍යවේදී මද්දුම කලුආරච්චි ඔබගේ දෛනික ජ්‍යෝතිෂ මාර්ගෝපදේශය</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
