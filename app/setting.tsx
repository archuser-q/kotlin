import { useUnitStore } from '@/store/unitStore';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, ChevronsUpDown } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type TempUnit = '°C' | '°F';
type WindUnit = 'km/h' | 'm/s' | 'mph' | 'knots';

interface DropdownProps<T> {
  options: readonly T[];
  selectedValue: T;
  onSelect: (value: T) => void;
  visible: boolean;
  onClose: () => void;
}

export default function Setting() {
  const router = useRouter();
  const {tempUnit, windUnit, setTempUnit, setWindUnit} = useUnitStore();

  const [showTempDropdown, setShowTempDropdown] = useState<boolean>(false);
  const [showWindDropdown, setShowWindDropdown] = useState<boolean>(false);

  const tempOptions: readonly TempUnit[] = ['°C', '°F'] as const;
  const windOptions: readonly WindUnit[] = ['km/h', 'm/s', 'mph'] as const;

  const renderDropdown = <T extends string>({
    options,
    selectedValue,
    onSelect,
    visible,
    onClose
  }: DropdownProps<T>) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 bg-black/30"
        onPress={onClose}
      >
        <View className="flex-1 justify-center items-center px-4">
          <Pressable className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
            {options.map((option, index) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
                className={`flex-row justify-between items-center py-4 px-2 ${
                  index !== options.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                style={{ paddingRight: 4, paddingLeft: 7 }}
              >
                <Text className="text-black text-lg">{option}</Text>
                {selectedValue === option && <Check size={20} color="#000" />}
              </TouchableOpacity>
            ))}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <ScrollView className='bg-white/60'>
      <View className='pt-14 gap-8 pl-8'>
        <TouchableOpacity
            onPress={() => router.back()}
        >
            <ArrowLeft size={32} />
        </TouchableOpacity>
        <Text className='text-4xl h-12'>Settings</Text>
      </View>
      
      <Text className='mt-8 pl-9 mb-3 text-gray-400'>Units</Text>
      
      <View className="bg-white rounded-3xl mx-4 gap-8 p-5">
        <TouchableOpacity onPress={() => setShowTempDropdown(true)}>
          <View className="flex-row justify-between items-center">
            <Text className="text-black font-medium text-xl">Temperature units</Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-gray-400 text-xl">{tempUnit}</Text>
              <ChevronsUpDown color={'#9CA3AF'} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowWindDropdown(true)}>
          <View className="flex-row justify-between items-center">
            <Text className="text-black font-medium text-xl">Wind speed units</Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-gray-400 text-xl">{windUnit}</Text>
              <ChevronsUpDown color={'#9CA3AF'} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {renderDropdown<TempUnit>({
        options: tempOptions,
        selectedValue: tempUnit,
        onSelect: setTempUnit,
        visible: showTempDropdown,
        onClose: () => setShowTempDropdown(false)
      })}

      {renderDropdown<WindUnit>({
        options: windOptions,
        selectedValue: windUnit,
        onSelect: setWindUnit,
        visible: showWindDropdown,
        onClose: () => setShowWindDropdown(false)
      })}
    </ScrollView>
  );
}