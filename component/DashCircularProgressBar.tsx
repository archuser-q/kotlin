import React from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type CircularProgressBarProps = {
  fill?: number;
  tintColor?: string;
  backgroundColor?: string;
  children?: (fill: number) => React.ReactNode;
};

export default function DashCircularProgressBar({
  fill =50,
  tintColor = "white",
  backgroundColor = "white",
  children,
}: CircularProgressBarProps) {
  return (
    <AnimatedCircularProgress
      size={120}
      width={6}
      fill={fill}
      tintColor={tintColor}
      backgroundColor={backgroundColor}
      lineCap="round"
    >
      {(currentFill: number) => (
        <View style={styles.compassContainer}>
          <View
            style={[
              styles.needle,
              {
                transform: [{ rotate: `${(currentFill / 100) * 360 - 90}deg` }],
              },
            ]}
          >
            <View style={styles.needleHead} />
            <View style={styles.needleTail} />
          </View>
          <View style={styles.centerDot} />
          {children && children(currentFill)}
        </View>
      )}
    </AnimatedCircularProgress>
  );
}

const styles = StyleSheet.create({
  compassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  needle: {
    position: "absolute",
    width: 4,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  needleHead: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ef4444", 
  },
  needleTail: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#9ca3af",
  },
  centerDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1f2937",
    zIndex: 10,
  },
});