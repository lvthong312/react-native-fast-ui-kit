import { Switch as RNSwitch } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}

const Switch = ({ value, onValueChange, disabled }: SwitchProps) => {
  return (
    <RNSwitch value={value} onValueChange={onValueChange} disabled={disabled} />
  );
};

export default Switch;
