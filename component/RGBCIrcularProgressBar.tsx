import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function RGBCircularProgressBar({ filled = 10 }: { filled?: number }) {
  const [color, setColor] = useState("#22c55e");
  const getColorFromFill = (fill: number) => {
    if (fill < 20) return "#22c55e";   
    if (fill < 40) return "#eab308";   
    if (fill < 60) return "#f97316";   
    if (fill < 80) return "#ef4444";   
    return "#8b5cf6";                  
  };
  useEffect(() => {
    setColor(getColorFromFill(filled));
  }, [filled]);
  return (
    <AnimatedCircularProgress
      size={70}
      width={6}
      fill={filled}
      tintColor={color}
      backgroundColor="#d1d5db"
      rotation={225}
      arcSweepAngle={270}
      lineCap="round"
    >
      {(fill: number) => {
        const newColor = getColorFromFill(fill);
        return (
          <Text
            className="text-2xl font-extrabold"
            style={{ color: newColor }}
          >
            {Math.round(fill)}
          </Text>
        );
      }}
    </AnimatedCircularProgress>
  );
}