import { SharedValue } from "react-native-reanimated";

export interface ToolTipProps{ 
  x: SharedValue<number>; 
  y: SharedValue<number>, 
  value: SharedValue<number>, 
  font:any, 
  chartWidth: number, 
  chartHeight: number, 
  label: SharedValue<string>
}