import { Canvas, Circle, Group, Skia } from "@shopify/react-native-skia";
import { area, scaleLinear } from "d3";
import { useEffect } from "react";
import {
    Easing,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type Props = {
  size: number;
  value: number;
};

export const Wave = ({ size, value }: Props) => {
  const radius = size * 0.5;
  const circleThickness = radius * 0.05;
  
  /* Inner Circle */
  const circleFillGap = 0.05 * radius;
  const fillCircleMargin = circleThickness + circleFillGap;
  const fillCircleRadius = radius - fillCircleMargin;
  
  /* Wave Configuration */
  const minValue = 0;
  const maxValue = 100;
  const fillPercent = Math.max(minValue, Math.min(maxValue, value)) / maxValue;
  
  const waveCount = 1;
  const waveClipCount = waveCount + 1;
  const waveLength = (fillCircleRadius * 2) / waveCount;
  const waveClipWidth = waveLength * waveClipCount;
  const waveHeight = fillCircleRadius * 0.1;
  
  /* Generate Wave Data Points */
  const data: Array<[number, number]> = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    data.push([i / (40 * waveClipCount), i / 40]);
  }
  
  /* Create Scales */
  const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
  const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);
  
  /* Create Wave Path */
  const clipArea = area()
    .x(function (d) {
      return waveScaleX(d[0]);
    })
    .y0(function (d) {
      return waveScaleY(Math.sin(d[1] * 2 * Math.PI));
    })
    .y1(function (_d) {
      return fillCircleRadius * 2 + waveHeight;
    });
  
  const clipSvgPath = clipArea(data);
  
  /* Animation */
  const translateXAnimated = useSharedValue(0);
  const translateYPercent = useSharedValue(0);
  
  useEffect(() => {
    translateXAnimated.value = withRepeat(
      withTiming(1, {
        duration: 9000,
        easing: Easing.linear,
      }),
      -1
    );
  }, [translateXAnimated]);
  
  useEffect(() => {
    translateYPercent.value = withTiming(fillPercent, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [fillPercent, translateYPercent]);
  
  /* Create Animated Clip Path */
  const clipPath = useDerivedValue(() => {
    const path = Skia.Path.MakeFromSVGString(clipSvgPath);
    const transformMatrix = Skia.Matrix();
    
    transformMatrix.translate(
      fillCircleMargin - waveLength * translateXAnimated.value, // Horizontal animation
      fillCircleMargin + (1 - translateYPercent.value) * fillCircleRadius * 2 - waveHeight // Vertical animation
    );
    
    path.transform(transformMatrix);
    return path;
  }, [translateXAnimated, translateYPercent]);
  
  return (
    <Canvas style={{ width: size, height: size }}>
      {/* Outer Circle - Stroke */}
      <Circle
        cx={radius}
        cy={radius}
        r={radius - circleThickness * 0.5}
        color="#178BCA"
        style="stroke"
        strokeWidth={circleThickness}
      />
      
      {/* Inner Circle with Wave Effect */}
      <Group clip={clipPath}>
        <Circle
          cx={radius}
          cy={radius}
          r={fillCircleRadius}
          color="#178BCA"
        />
      </Group>
    </Canvas>
  );
};