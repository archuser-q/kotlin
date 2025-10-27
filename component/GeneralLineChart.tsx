import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GeneralLineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [21, 23, 22, 25, 30, 28],
        strokeWidth: 2,
      },
    ],
  };
  const data2 = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [12, 13, 8, 20, 24, 22],
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "5",
      strokeWidth: "1",
      stroke: "#FFD700",
    },
  };

  return (
    <View className="relative">
      <LineChart
        data={data}
        width={screenWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withShadow={false}
        transparent={true}
      />
      <LineChart
        data={data2}
        width={screenWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={false}
        withShadow={false}
        transparent={true}
      />
    </View>
  );
}
