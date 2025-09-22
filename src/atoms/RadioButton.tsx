import type { StyleProp, ViewStyle } from 'react-native';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';

interface RadioButtonProps {
  selected: boolean;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const RadioButton = ({
  selected,
  onPress,
  disabled,
  loading,
  style,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && { opacity: 0.5 }]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.8}
    >
      <View style={styles.outer}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : selected ? (
          <View style={styles.inner} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: spacing.sm },
  outer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
});

export default RadioButton;
