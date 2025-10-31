import { create } from 'zustand';

interface CardState {
  cityName: string;
  description: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  latitude: number;  
  longitude: number; 
  cards: Array<{
    cityName: string;
    description: string;
    currentTemp: number;
    maxTemp: number;
    minTemp: number;
  }>;
  addCard: (cityName: string, description: string, currentTemp: number, maxTemp: number, minTemp: number, latitude: number, longitude: number) => void;
}

export const useCardStore = create<CardState>((set) => ({
  cityName: '',
  description: '',
  currentTemp: 0,
  maxTemp: 0,
  minTemp: 0,
  longitude: 0,
  latitude: 0,
  cards: [],
  addCard: (cityName, description, currentTemp, maxTemp, minTemp, longitude,latitude) =>
    set((state) => ({
      cards: [...state.cards, { cityName, description, currentTemp, maxTemp, minTemp, longitude, latitude }]
    })),
}));
