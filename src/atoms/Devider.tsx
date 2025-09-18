import { View } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';
type DividerProps = {
  color?: string;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
};

export const Divider = ({
  color = '#e0e0e0',
  thickness = 1,
  style,
  vertical = false,
}: DividerProps) => {
  const dividerStyle = vertical
    ? { width: thickness, backgroundColor: color }
    : { height: thickness, backgroundColor: color };

  return <View style={[dividerStyle, style]} />;
};

export default Divider;
