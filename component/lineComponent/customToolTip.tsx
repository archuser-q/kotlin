import { Group, RoundedRect, Text as SkiaText } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

export default function ToolTip(
  { x, y, value, font, chartWidth, chartHeight, label }: 
  { x: SharedValue<number>; y: SharedValue<number>, value: SharedValue<number>, 
    font:any, chartWidth: number, chartHeight: number, label: string}) {
  
  const text = useDerivedValue(()=>{
    return `${value.value.toFixed(1)}`;
  })
  const boxWidth = 80;
  const boxHeight = 40;
  const padding = 8;
  const boxX = useDerivedValue(() => {
    const rawX = x.value - boxWidth / 2;
    if (rawX < padding) return padding;
    if (rawX + boxWidth > chartWidth - padding) return chartWidth - boxWidth - padding;
    return rawX;
  });

  const boxY = useDerivedValue(() => {
    const rawY = y.value - boxHeight - 15;
    if (rawY < padding) return padding;
    if (rawY + boxHeight > chartHeight - padding) return chartHeight - boxHeight - padding;
    return rawY;
  });

  if (!font){
    return null;
  }
  const valueText = useDerivedValue(() => `${value.value.toFixed(1)}`);
  return (
    <Group>
      <RoundedRect
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight}
        r={4}
        color='black'
        opacity={0.8}
      />
      <SkiaText 
        x={useDerivedValue(()=>x.value-16)}
        y={useDerivedValue(()=>boxY.value+16)}
        font={font}
        text={label}
        color="white"  
      />
      <SkiaText
        x={useDerivedValue(() => boxX.value + 24)}
        y={useDerivedValue(() => boxY.value + 30)}
        font={font}
        text={valueText}
        color="white"
      />
    </Group>
  );
}