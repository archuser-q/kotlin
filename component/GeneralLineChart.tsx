import { useFont } from "@shopify/react-native-skia";
import { View } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import roboto from '../assets/fonts/Roboto-Regular.ttf';
import ToolTip from "./lineComponent/customToolTip";

export default function GeneralLineChart() {
  const font = useFont(roboto,12);
  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  return (
    <View style={{ height: 300 }}>
      <CartesianChart 
        data={DATA} 
        xKey="day" 
        yKeys={["highTmp"]}
        axisOptions={{ font }}
        chartPressState={state}
      >
        {({ points }) => (
          <>
            <Line points={points.highTmp} color="red" strokeWidth={3} curveType="basis"/>
            {isActive ? (
              <ToolTip 
                x={state.x.position} 
                y={state.y.highTmp.position}
                value={state.y.highTmp.value}
                font={font}
              />
            ) : null}
          </>
        )}
      </CartesianChart>
    </View>
  );
}
