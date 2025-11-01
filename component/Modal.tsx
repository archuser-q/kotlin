import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GeneralLineChart from './GeneralLineChart';

interface UVModalProps {
  visible: boolean;
  title: string;
  type: string;
  weather: any;
  airQuality: any;
  onClose: () => void;
}

export default function Modal({ visible, title, type, weather, airQuality, onClose }: UVModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);

  const getChartConfig = () => {
    if (!weather) return null;
    
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

        case 'airquality':
            return{
                data: airQuality.hourly.time.slice(0,24).map((time: string, i: number)=>({
                    hour: new Date(time).getHours(),
                    value: airQuality.hourly.european_aqi[i],
                    label: formatLabelTime(time)
                })),
                xKey: 'hour',
                yKey: 'value',
                color: '#6b7280'
            }
      
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
      backgroundStyle={{ backgroundColor: '#fff' }}
    >
      <BottomSheetView className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold">{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-1">
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
      </BottomSheetView>
    </BottomSheet>
  );
}

function formatLabelTime(isoString: string): string {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${hours}:${minutes}`;
}
