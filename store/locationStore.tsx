// src/store/locationStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Location {
  cityName: string;
  weather: any;               
  airQuality: any;            
  windDirectionPercent: number;
  data: any[];                
  gif: any;                   
}

interface LocationStore {
  savedLocations: Location[];
  addLocation: (location: Location) => void;
  removeLocation: (cityName: string) => void;
  getLocation: (cityName: string) => Location | undefined;
  isLocationSaved: (cityName: string) => boolean;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set, get) => ({
      savedLocations: [],

      addLocation: (location) =>
        set((state) => ({
          savedLocations: [
            ...state.savedLocations.filter(
              (loc) => loc.cityName !== location.cityName
            ),
            location,
          ],
        })),

      removeLocation: (cityName) =>
        set((state) => ({
          savedLocations: state.savedLocations.filter(
            (loc) => loc.cityName !== cityName
          ),
        })),

      getLocation: (cityName) =>
        get().savedLocations.find((loc) => loc.cityName === cityName),

      isLocationSaved: (cityName) =>
        get().savedLocations.some((loc) => loc.cityName === cityName),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
