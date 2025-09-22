import { Text as RNText, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface BadgeProps {
  text: string | number;
  color?: string;
  style?: object;
}

const Badge = ({ text, color = colors.primary, style }: BadgeProps) => {
  return (
    <View style={[styles.container, { backgroundColor: color }, style]}>
      <RNText style={styles.text}>{text}</RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
