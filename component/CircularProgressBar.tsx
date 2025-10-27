import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type CircularProgressBarProps = {
  fill?: number;
  tintColor?: string;
  backgroundColor?: string;
  children?: (fill: number) => React.ReactNode; 
};

export default function CircularProgressBar({
  fill = 70,
  tintColor = "#3b82f6",
  backgroundColor = "#d1d5db",
  children,
}: CircularProgressBarProps) {
  return (
    <AnimatedCircularProgress
      size={70}
      width={6}
      fill={fill}
      tintColor={tintColor}
      backgroundColor={backgroundColor}
      rotation={225}
      arcSweepAngle={270}
      lineCap="round"
    >
      {(currentFill: number) =>
        children ? children(currentFill) : null
      }
    </AnimatedCircularProgress>
  );
}
