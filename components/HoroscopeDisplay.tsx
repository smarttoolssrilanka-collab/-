
import React from 'react';
import type { HoroscopeOutput } from '../types';

interface HoroscopeDisplayProps {
  data: HoroscopeOutput;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode, icon: JSX.Element }> = ({ title, children, icon }) => (
    <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
        <h3 className="text-lg font-bold text-cyan-300 mb-2 flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        <p className="text-gray-300 text-base">{children}</p>
    </div>
);

const IconCareer = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconHealth = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const IconLove = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const IconWarning = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconStrength = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconWeakness = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>;


export const HoroscopeDisplay: React.FC<HoroscopeDisplayProps> = ({ data }) => {
  const confidencePercentage = (data.confidence * 100).toFixed(0);

  return (
    <div className="mt-8 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm animate-fade-in">
        <div className="text-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-3xl font-bold text-white">{data.name} | {data.date}</h2>
            <p className="text-cyan-300 mt-2 text-lg">{data.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <InfoCard title="වෘත්තිය සහ මුදල්" icon={<IconCareer/>}>{data.career_money}</InfoCard>
            <InfoCard title="සෞඛ්‍යය සහ යහපැවැත්ම" icon={<IconHealth/>}>{data.health_wellbeing}</InfoCard>
            <InfoCard title="ආදරය සහ සබඳතා" icon={<IconLove/>}>{data.love_relationships}</InfoCard>

            <div className="md:col-span-2 lg:col-span-3 bg-yellow-900/40 p-4 rounded-xl border border-yellow-700">
                <h3 className="text-lg font-bold text-yellow-300 mb-2 flex items-center">
                    <IconWarning/>
                    <span className="ml-2">අවදානම් සහ ප්‍රවේශම් විය යුතු කරුණු</span>
                </h3>
                <p className="text-yellow-200">{data.emergencies_and_cautions}</p>
            </div>

            <InfoCard title="ශක්තීන්" icon={<IconStrength/>}>{data.strengths}</InfoCard>
            <InfoCard title="දුර්වලතා" icon={<IconWeakness/>}>{data.weaknesses}</InfoCard>
            <InfoCard title="ග්‍රහ බලපෑම්" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>{data.planetary_influences}</InfoCard>

            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">ජය අංක</h3>
                <div className="flex space-x-3">
                    {data.lucky_numbers.map((num, i) => (
                        <span key={i} className="flex items-center justify-center h-10 w-10 bg-cyan-800/50 text-cyan-200 font-bold rounded-full text-lg">{num}</span>
                    ))}
                </div>
            </div>
            <InfoCard title="ජයග්‍රාහී වේලාව" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>{data.lucky_time}</InfoCard>
            <InfoCard title="සුබ වර්ණය" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}>{data.outfit_color}</InfoCard>
            
            <div className="md:col-span-2 lg:col-span-3">
                <InfoCard title="අනාගතය සඳහා උපදෙස්" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}>
                    {data.future_advice}
                </InfoCard>
            </div>
        </div>

        {data.notes && (
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-gray-400">සටහන:</h4>
                <p className="text-gray-400 italic text-sm">{data.notes}</p>
            </div>
        )}

        <div className="mt-6">
            <h4 className="text-gray-400 text-sm text-center">විශ්වාසනීයත්වය</h4>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full" style={{ width: `${confidencePercentage}%` }}></div>
            </div>
            <p className="text-center text-sm font-bold mt-1 text-cyan-300">{confidencePercentage}%</p>
        </div>
    </div>
  );
};
