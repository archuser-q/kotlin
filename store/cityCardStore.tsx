import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const CARDS_STORAGE_KEY = '@saved_cards';

interface CardState {
  cards: Array<{
    cityName: string;
    longitude: number;
    latitude: number;
  }>;
  addCard: (
    cityName: string,
    longitude: number,
    latitude: number
  ) => Promise<void>;
  loadCards: () => Promise<void>;
  removeCards: (index: number) => Promise<void>
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  addCard: async (cityName, longitude, latitude) => {
    const exist = get().cards.some(
      card => card.cityName === cityName && card.latitude === latitude && card.longitude === longitude
    );
    const newCard = {cityName, longitude, latitude};
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
