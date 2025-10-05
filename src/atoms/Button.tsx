import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { FastUIKit } from '../FastUIKit';
import Text from './Text';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'disabled' | 'clear';

export interface ButtonProps {
  title: string;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  disabled?: boolean;
  loading?: boolean;
  gap?: number;
}

const baseButton: ViewStyle = {
  minHeight: 44,
  paddingHorizontal: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

// 🎨 UI config cho từng type
const STYLES: Record<ButtonType, { button: ViewStyle; title: TextStyle }> = {
  primary: {
    button: {
      ...baseButton,
      backgroundColor: '#2563EB', // blue-600
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  },
  secondary: {
    button: {
      ...baseButton,
      backgroundColor: '#6B7280', // gray-500
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  },
  outline: {
    button: {
      ...baseButton,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#D1D5DB', // gray-300
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#111827', // gray-900
    },
  },
  disabled: {
    button: {
      ...baseButton,
      backgroundColor: '#E5E7EB', // gray-200
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#9CA3AF', // gray-400
    },
  },
  clear: {
    button: {
      ...baseButton,
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#2563EB', // blue-600
    },
  },
};

const Button = ({
  title,
  type = 'primary',
  style,
  titleStyle,
  leftIcon,
  rightIcon,
  backgroundColor,
  titleColor,
  onPress,
  disabled,
  loading,
  gap,
}: ButtonProps) => {
  const config = STYLES[type];
  return (
    <TouchableOpacity
      style={[
        config.button,
        FastUIKit?.defaultStyle?.button?.style,
        backgroundColor && { backgroundColor },
        disabled && STYLES.disabled.button,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={config.title.color} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap }}>
          {leftIcon}
          <Text
            style={[
              FastUIKit?.defaultStyle?.button?.titleStyle,
              config.title,
              titleStyle,
            ]}
            weight="bold"
            color={
              titleColor ||
              (disabled ? STYLES.disabled.title.color : config.title.color)
            }
          >
            {title}
          </Text>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
