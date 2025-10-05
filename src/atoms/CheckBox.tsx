import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { ImageBase } from '../shared/images/ImageBase';
import Text from './Text'; // thay bằng Text của bạn

export interface CheckBoxProps {
  label?: string;
  rightLabel?: string;
  checked?: boolean;
  onPress?: (checked: boolean) => void;
  checkedIcon?: any;
  uncheckedIcon?: any;
  size?: number; // 👈 thêm size
  checkedColor?: string;
  uncheckedColor?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  gap?: number;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  rightLabel,
  checked = false,
  onPress,
  checkedIcon,
  uncheckedIcon,
  size = 20, // 👈 default size
  checkedColor,
  uncheckedColor,
  labelStyle,
  containerStyle,
  gap = 0,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheck = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onPress?.(newValue);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { gap }, containerStyle]}
      onPress={toggleCheck}
      activeOpacity={0.7}
    >
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {isChecked && checkedIcon ? (
        checkedIcon
      ) : !isChecked && uncheckedIcon ? (
        uncheckedIcon
      ) : (
        <ImageBase
          name={isChecked ? 'ic_checkbox' : 'ic_unchecked'}
          size={size}
          color={isChecked ? checkedColor : uncheckedColor}
        />
      )}
      {rightLabel && (
        <Text style={[styles.label, labelStyle]}>{rightLabel}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
});
