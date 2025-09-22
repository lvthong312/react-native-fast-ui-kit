import React from 'react';
import { Text as RNText } from 'react-native';
import type { TextStyle, StyleProp } from 'react-native';
import { colors, fontSize } from '../theme';

type TextVariant = 'heading' | 'subtitle' | 'body' | 'caption';

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  variant?: TextVariant;
  weight?: 'normal' | 'bold' | '600' | '500';
}

const Text = ({
  children,
  style,
  color,
  variant = 'body',
  weight,
}: TextProps) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'heading':
        return {
          fontSize: fontSize.xxl,
          fontWeight: weight || 'bold',
          color: color || colors.text,
        };
      case 'subtitle':
        return {
          fontSize: fontSize.xl,
          fontWeight: weight || '600',
          color: color || colors.text,
        };
      case 'body':
        return {
          fontSize: fontSize.md,
          fontWeight: weight || 'normal',
          color: color || colors.text,
        };
      case 'caption':
        return {
          fontSize: fontSize.sm,
          fontWeight: weight || 'normal',
          color: color || colors.placeholder,
        };
      default:
        return {};
    }
  };

  return <RNText style={[getVariantStyle(), style]}>{children}</RNText>;
};

export default Text;
