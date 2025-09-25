
export interface HoroscopeInput {
  name: string;
  birth_date: string;
  birth_time: string;
  birth_place: string;
  lagna: string;
  reference_date: string;
}

export interface HoroscopeOutput {
  date: string;
  name: string;
  summary: string;
  career_money: string;
  emergencies_and_cautions: string;
  travel_direction: string;
  outfit_color: string;
  planetary_influences: string;
  strengths: string;
  weaknesses: string;
  love_relationships: string;
  health_wellbeing: string;
  future_advice: string;
  lucky_numbers: number[];
  lucky_time: string;
  rituals_recommendations: string;
  compatibility_tip: string;
  confidence: number;
  notes: string;
}
