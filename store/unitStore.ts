import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type tempUnit = '°C' | '°F';
type windUnit = 'km/h' | 'm/s' | 'mph';

interface UnitState{
    tempUnit: string,
    windUnit: string,
    setTempUnit: (unit: tempUnit) => void;
    setWindUnit: (unit: windUnit) => void;
}

export const useUnitStore = create<UnitState>()(
    persist(
        (set) => ({
            tempUnit: '°C',
            windUnit: 'km/h',
            setTempUnit: (unit) => set({tempUnit: unit}),
            setWindUnit: (unit) => set({windUnit: unit})
        }),
        {
            name: 'unit-storage',
            storage: createJSONStorage(()=>AsyncStorage),
        }
    )
)