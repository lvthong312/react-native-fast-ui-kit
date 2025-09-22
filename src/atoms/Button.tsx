import React from 'react';
import type {
    StyleProp,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import Text from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'disabled';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode; // icon component
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
}

const Button = ({
  title,
  variant = 'primary',
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  onPress,
  ...props
}: ButtonProps) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
      case 'disabled':
        return colors.white;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.white;
      case 'outline':
        return colors.primary;
      case 'disabled':
        return colors.placeholder;
      default:
        return colors.white;
    }
  };

  const getBorder = () => {
    switch (variant) {
      case 'outline':
        return { borderWidth: 1, borderColor: colors.primary };
      case 'disabled':
        return { borderWidth: 1, borderColor: colors.placeholder };
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getBorder(),
        style,
        variant === 'disabled' && { opacity: 0.6 },
      ]}
      onPress={variant === 'disabled' ? undefined : onPress}
      activeOpacity={0.8}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && iconPosition === 'left' && (
          <View style={{ marginRight: spacing.sm }}>{icon}</View>
        )}
        <Text
          style={[styles.buttonText, textStyle]}
          color={getTextColor()}
          weight="bold"
        >
          {title}
        </Text>
        {icon && iconPosition === 'right' && (
          <View style={{ marginLeft: spacing.sm }}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Button;
