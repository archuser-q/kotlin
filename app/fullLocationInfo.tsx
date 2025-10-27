import CircularProgressBar from "@/component/CircularProgressBar";
import RGBCircularProgressBar from "@/component/RGBCIrcularProgressBar";
import { Wave } from "@/component/wave";
import { Droplet, Sun, Wind } from 'lucide-react-native';
import { ImageBackground, ScrollView, Text, View } from "react-native";

export default function fullLocationInfo(){
    const data = [
        { time: "06:00", temp: "22" },
        { time: "09:00", temp: "25" },
        { time: "12:00", temp: "28" },
        { time: "15:00", temp: "27" },
        { time: "18:00", temp: "24" },
        { time: "21:00", temp: "23" },
        { time: "00:00", temp: "22" },
    ];
    return(
        <ImageBackground
            source={require("../assets/clearSkyNight.gif")}
            resizeMode="cover"
        >
            <ScrollView className="">
                <View className="pt-36 pl-7 gap-5 pb-96">
                    <Text className="text-xl text-white">Hanoi</Text>
                    <Text className="text-9xl text-white">26°</Text>
                    <Text className="text-xl text-white">Clear 28°/21°</Text>
                </View>
                <View className="mt-8 px-6">
                    <View
                        className="bg-white/20 rounded-3xl p-5"
                    >
                        <Text className="text-xl font-medium mb-3 text-white">Hourly Forecast</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-row"
                        >
                            {data.map((item,index)=>(
                                <View
                                    key={index}
                                    className="items-center justify-center mr-4 gap-3"
                                >
                                    <Text className="font-medium text-white">{item.time}</Text>
                                    <Sun size={30} color="white" fill="white" />
                                    <Text className="font-medium text-center text-white">{item.temp}°</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View className="flex-row flex-wrap justify-between px-6 pt-5 pb-10">
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">UV</Text>
                            <Text className="text-2xl font-medium text-white">Weak</Text>
                        </View>
                        <View className="pt-10">
                            <RGBCircularProgressBar />
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Humidity</Text>
                            <Text className="text-2xl font-medium text-white">61%</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={61} tintColor="#3b82f6">
                                {(fill) => <Droplet size={24} color="#3b82f6" fill="#3b82f6" />}
                            </CircularProgressBar>
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row items-center pr-5">
                        <View className="pb-20 flex-1">
                            <Text className="text-white">Rainfall</Text>
                            <Text className="text-2xl font-medium text-white">50 mm</Text>
                        </View>
                        <View className="pt-10">
                            <Wave size={67} value={60}/>
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Northeast</Text>
                            <Text className="text-2xl font-medium text-white">Force 2</Text>
                        </View>
                        <View className="pt-10">
                            <Wind size={65} color="#3b82f6" />
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Sunrise</Text>
                            <Text className="text-2xl font-medium text-white">05:56</Text>
                        </View>
                        <View className="pt-10">
                            <Sun size={65} color="#3b82f6" fill="#3b82f6" />
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Pressure</Text>
                            <Text className="text-2xl font-medium text-white">1016</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={61} tintColor="#3b82f6">
                                {(fill) => (
                                    <Text className="text-blue-500 text-base font-bold pt-4">
                                        hPa
                                    </Text>
                                )}
                            </CircularProgressBar>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}