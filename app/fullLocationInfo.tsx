import CircularProgressBar from "@/component/CircularProgressBar";
import { ScrollView, Text, View } from "react-native";

export default function fullLocationInfo(){
    return(
        <ScrollView className="bg-white">
            <View className="pt-36 pl-7 gap-5">
                <Text className="text-xl">Hanoi</Text>
                <Text className="text-9xl">26°</Text>
                <Text className="text-xl">Clear 28°/21°</Text>
            </View>
            <View className="flex-row flex-wrap justify-between px-6 pt-10 pb-10">
                <View className="w-[49%] h-38 bg-blue-100 rounded-2xl mb-5 pt-5 pl-5">
                    <View className="pb-20">
                        <Text>UV</Text>
                        <Text className="text-2xl font-medium">Weak</Text>
                    </View>
                </View>
                <View className="w-[49%] h-38 bg-blue-100 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                    <View className="pb-20">
                        <Text>Humidity</Text>
                        <Text className="text-2xl font-medium">61%</Text>
                    </View>
                    <View className="pt-10">
                        <CircularProgressBar />
                    </View>
                </View>
                <View className="w-[49%] h-38 bg-blue-100 rounded-2xl mb-5 pt-5 pl-5">
                    <View className="pb-20">
                        <Text>Dew point</Text>
                        <Text className="text-2xl font-medium">26.5%</Text>
                    </View>
                </View>
                <View className="w-[49%] h-38 bg-blue-100 rounded-2xl mb-5 pt-5 pl-5">
                    <View className="pb-20">
                        <Text>Northeast</Text>
                        <Text className="text-2xl font-medium">Force 2</Text>
                    </View>
                </View>
                <View className="w-[49%] h-32 bg-blue-100 rounded-2xl mb-5 pt-5 pl-5">
                    <Text>Sunrise</Text>
                    <Text className="text-2xl font-medium">05:56</Text>
                </View>
                <View className="w-[49%] h-32 bg-blue-100 rounded-2xl mb-5 pt-5 pl-5">
                    <Text>Pressure</Text>
                    <Text className="text-2xl font-medium">1016</Text>
                </View>
            </View>
        </ScrollView>
    );
}