export interface ModalProps {
  visible: boolean;
  title: string;
  type: string;
  weather: any;
  airQuality: any;
  onClose: () => void;
}