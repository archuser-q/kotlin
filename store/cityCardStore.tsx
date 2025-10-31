import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const CARDS_STORAGE_KEY = '@saved_cards';

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
    weatherParams: {
      isDay: number;
      weathercode: number;
    };
  }>;
  addCard: (
    cityName: string, 
    description: string, 
    currentTemp: number, 
    maxTemp: number, 
    minTemp: number, 
    latitude: number, 
    longitude: number, 
    weatherParams: {
      isDay: number;
      weathercode: number;
    }) => Promise<void>;
  loadCards: () => Promise<void>;
  removeCards: (index: number) => Promise<void>
}

export const useCardStore = create<CardState>((set, get) => ({
  cityName: '',
  description: '',
  currentTemp: 0,
  maxTemp: 0,
  minTemp: 0,
  longitude: 0,
  latitude: 0,
  cards: [],
  addCard: async (cityName, description, currentTemp, maxTemp, minTemp, longitude, latitude, weatherParams) => {
    const newCard = {
      cityName, description, currentTemp, maxTemp, minTemp, longitude, latitude, weatherParams
    };
    const updatedCards = [...get().cards,newCard];
    set({cards: updatedCards});

    try{
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
    } catch(error){
      console.error(error);
    }
  },
  loadCards: async () => {
    try{
      const savedCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
      if (savedCards){
        set({cards: JSON.parse(savedCards)});
      }
    } catch(error){
      console.log(error);
    }
  },
  removeCards: async(index)=>{
    const updatedCards = get().cards.filter((_,i) => i !== index);
    set({cards: updatedCards});
    
    try{
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
    } catch(error){
      console.log(error);
    }
  }
}));
