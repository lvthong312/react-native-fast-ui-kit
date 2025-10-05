// import { Switch as RNSwitch } from 'react-native';

// interface SwitchProps {
//   value: boolean;
//   onValueChange?: (value: boolean) => void;
//   disabled?: boolean;
// }

// const Switch = ({ value, onValueChange, disabled }: SwitchProps) => {
//   return (
//     <RNSwitch value={value} onValueChange={onValueChange} disabled={disabled} />
//   );
// };

// export default Switch;
import React from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  height?: number; // 👈 thêm prop height
  width?: number;
  style?: ViewStyle;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  activeColor = '#007AFF',
  inactiveColor = '#ccc',
  height = 30, // default height
  width,
  style,
}) => {
  const thumbSize = height - 6; // padding 3 mỗi bên
  const switchWidth = width || height * 1.6; // tỷ lệ hợp lý
  const translateX = React.useRef(
    new Animated.Value(value ? switchWidth - height : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? switchWidth - height : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, switchWidth, height]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.container,
        {
          backgroundColor: value ? activeColor : inactiveColor,
          width: switchWidth,
          height,
          borderRadius: height / 2,
          padding: 3,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: '#fff',
    elevation: 2,
  },
});

export default Switch;
