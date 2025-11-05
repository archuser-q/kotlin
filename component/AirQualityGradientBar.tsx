import { GradientBarProps } from '@/type/GradientBarProps';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

export const AirQualityGradientBar: React.FC<GradientBarProps> = ({ value }) => {
  const position = Math.min((value / 100) * 100, 100);

  return (
    <View className="w-full mt-5 mb-[-25] h-2 bg-white/20 relative">
        <LinearGradient
            colors={['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444', '#991b1b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute w-full h-full"
        />

        <View
        className="absolute top-1/2 w-4 h-4 bg-white rounded-full border-2 border-white shadow-lg"
        style={{
            transform: [{ translateY: -7 }, { translateX: -8 }],
            left: `${position}%`,
        }}
        />
    </View>
  );
};

export default AirQualityGradientBar;
