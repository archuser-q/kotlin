import { GeneralLineChartProps } from "@/type/GeneralLineChartProps";
import { useFont } from "@shopify/react-native-skia";
import { Dimensions, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import roboto from '../assets/fonts/Roboto-Regular.ttf';
import ToolTip from "./lineComponent/customToolTip";

export default function GeneralLineChart({ 
  data, 
  xKey, 
  yKey,
  lineColor = "red",
  height = 300
}: GeneralLineChartProps) {
  const font = useFont(roboto, 12);
  
  const { state, isActive } = useChartPressState({ 
    x: 0, 
    y: { [yKey]: 0 } 
  });

  const labelValue = useDerivedValue(() => {
    const currentHour = Math.round(state.x.value.value);
    const currentData = data.find(item => item.hour === currentHour);
    return currentData?.label || '';
  });
  
  if (!font) {
    return <View style={{ height, width: '100%' }} />;
  }
  
  return (
    <View style={{ height, width: '100%' }}
    className="pt-10">
      <CartesianChart 
        data={data} 
        xKey={xKey} 
        yKeys={[yKey]}
        axisOptions={{ 
          font,
          lineColor: '#ffffff',
          labelColor: '#ffffff' 
        }}
        chartPressState={state}
      >
        {({ points }) => {
          return (
            <>
              <Line 
                points={points[yKey]} 
                color={lineColor} 
                strokeWidth={3} 
                curveType="basis"
              />
              {isActive ? (
                <ToolTip 
                  x={state.x.position} 
                  y={state.y[yKey].position}
                  value={state.y[yKey].value}
                  font={font}
                  chartWidth={Dimensions.get('window').width}
                  chartHeight={height}
                  label={labelValue}
                />
              ) : null}
            </>
          );
        }}
      </CartesianChart>
    </View>
  );
}