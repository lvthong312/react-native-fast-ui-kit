import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import { FastUIKit } from '../FastUIKit';

type Type = 'heading' | 'title' | 'subtitle' | 'normal';

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string | any;
  type?: Type;
  weight?: 'normal' | 'bold' | '600' | '500';
}

const Text = ({
  children,
  style,
  color,
  type = 'normal',
  weight,
}: TextProps) => {
  const getVariantStyle = (): TextStyle => {
    switch (type) {
      case 'heading':
        return {
          fontSize: 24,
          fontWeight: weight || 'bold',
          color: color || '#111827',
        };
      case 'title':
        return {
          fontSize: 16,
          fontWeight: weight || '600',
          color: color || '#111827',
        };
      case 'normal':
        return {
          fontSize: 14,
          fontWeight: weight || 'normal',
          color: color || '#111827',
        };
      case 'subtitle':
        return {
          fontSize: 12,
          fontWeight: weight || 'normal',
          color: color || '#999',
        };
      default:
        return {};
    }
  };

  return (
    <RNText
      style={[FastUIKit?.defaultStyle?.text?.style, getVariantStyle(), style]}
    >
      {children}
    </RNText>
  );
};

export default Text;
