import { create } from 'zustand';

interface LocationState {
  cityName: string;
  latitude: number;
  longitude: number;
  description: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  setSavedLocation: (cityName: string, latitude: number, longitude: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  cityName: '',
  latitude: 0,
  longitude: 0,
  description: '',
  currentTemp: 0,
  maxTemp: 0,
  minTemp: 0,
  setSavedLocation: (cityName, latitude, longitude) =>
    set({ cityName, latitude, longitude }),
}));
