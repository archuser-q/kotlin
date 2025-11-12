import { ModalProps } from '@/type/ModalProps';
import formatLabelTime from '@/utils/formatTimeLabel';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GeneralLineChart from './GeneralLineChart';
import { INFO_CARDS } from './InfoCard';
import { getCloudCoverAdvice, getHumidityAdvice, getPressureAdvice, getRealFeelAdvice, getUVAdvice } from './getComprehensiveAdvice';

export default function Modal({ visible, title, type, weather, airQuality, onClose }: ModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const currentAdvice = useMemo(() => {
    switch(type) {
      case 'uv':
        return getUVAdvice(weather.current.uv_index);
      case 'humidity':
        return getHumidityAdvice(weather.current.relative_humidity_2m);
      case 'realfeel':
        return getRealFeelAdvice(
          weather.hourly.apparent_temperature[0], 
          weather.current.temperature_2m
        );
      case 'pressure':
        return getPressureAdvice(weather.current.pressure_msl);
      case 'cloud':
        return getCloudCoverAdvice(weather.current.cloud_cover);
      default:
        return null;
    }
  }, [type, weather]);

  const getChartConfig = () => {
    switch(type) {
      case 'uv':
        return {
          data: weather.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            hour: new Date(time).getHours(),
            value: weather.hourly.uv_index[i],
            label: formatLabelTime(time)
          })),
          xKey: 'hour',
          yKey: 'value',
          color: '#f59e0b'
        };
      
      case 'humidity':
        return {
          data: weather.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            hour: new Date(time).getHours(),
            value: weather.hourly.relative_humidity_2m[i],
            label: formatLabelTime(time)
          })),
          xKey: 'hour',
          yKey: 'value',
          color: '#3b82f6'
        };
      
      case 'realfeel':
        return {
          data: weather.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            hour: new Date(time).getHours(),
            value: weather.hourly.apparent_temperature[i],
            label: formatLabelTime(time)
          })),
          xKey: 'hour',
          yKey: 'value',
          color: '#ef4444'
        };
      
      case 'pressure':
        return {
          data: weather.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            hour: new Date(time).getHours(),
            value: weather.hourly.pressure_msl[i],
            label: formatLabelTime(time)
          })),
          xKey: 'hour',
          yKey: 'value',
          color: '#8b5cf6'
        };
      
      case 'cloud':
        return {
          data: weather.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            hour: new Date(time).getHours(),
            value: weather.hourly.cloud_cover[i],
            label: formatLabelTime(time)
          })),
          xKey: 'hour',
          yKey: 'value',
          color: '#6b7280'
        };
      
      default:
        return null;
    }
  };
  
  const chartConfig = getChartConfig();

  React.useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={{ backgroundColor: '#1a1a1a' }}
    >
      <BottomSheetScrollView className="flex-1">
        <View className="p-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-white">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className='text-white'>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View className="h-64 mb-6">
            {chartConfig ? (
              <GeneralLineChart
                data={chartConfig.data}
                xKey={chartConfig.xKey}
                yKey={chartConfig.yKey}
                lineColor={chartConfig.color}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>

          {type && INFO_CARDS[type] && (
            <>
              {currentAdvice && (
                <View 
                  className="rounded-lg mt-20 p-4 mb-4" 
                  style={{ backgroundColor: currentAdvice.color + '20' }}
                >
                  <View className="flex-row items-center mb-2">
                    <Text className="text-2xl mr-2">{currentAdvice.icon}</Text>
                    <Text className="text-lg font-semibold text-white">
                      Current Status: {currentAdvice.level}
                    </Text>
                  </View>
                  <Text className="text-white">
                    {currentAdvice.advice}
                  </Text>
                </View>
              )}
              <View className="bg-black rounded-lg p-4 mt-4">
                <Text className="text-lg font-semibold mb-2 text-white">
                  {INFO_CARDS[type].title}
                </Text>
                <Text className="text-white mb-4">
                  {INFO_CARDS[type].description}
                </Text>
                
                {INFO_CARDS[type].ranges && (
                  <View>
                    <Text className="font-semibold mb-2 text-white">Index level:</Text>
                    {INFO_CARDS[type].ranges!.map((range, index) => (
                      <View key={index} className="flex-row items-center mb-2">
                        <View 
                          className="w-4 h-4 rounded mr-3" 
                          style={{ backgroundColor: range.color }}
                        />
                        <Text className="flex-1 text-white">{range.label}</Text>
                        <Text className="text-white">{range.range}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
