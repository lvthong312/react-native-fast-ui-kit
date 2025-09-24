import {
  Text as RNText,
  StyleSheet,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, radius, spacing } from '../theme';

interface BadgeProps {
  text: string | number;
  color?: string;
  textColor?: string;
  borderRadius?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge = ({
  text,
  color = colors.primary,
  textColor = colors.white,
  borderRadius = radius.lg,
  style,
  textStyle,
}: BadgeProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color, borderRadius },
        style,
      ]}
    >
      <RNText style={[styles.text, { color: textColor }, textStyle]}>
        {text}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
