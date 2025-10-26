import { Droplet } from "lucide-react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function CircularProgressBar() {
  return (
    <AnimatedCircularProgress
      size={70}
      width={6}
      fill={70}
      tintColor="#3b82f6"
      backgroundColor="#d1d5db"
      rotation={225}
      arcSweepAngle={270}
      lineCap="round"
    >
      {(fill) => (
        <Droplet
          size={24}
          color="#3b82f6" 
          fill="#3b82f6"  
        />
      )}
    </AnimatedCircularProgress>
  );
}
