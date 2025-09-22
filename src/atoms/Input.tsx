// components/Input.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
  Image,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  helpMessage?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiline?: boolean;
  showCounter?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  helpMessage,
  errorMessage,
  leftIcon,
  rightIcon,
  style,
  multiline = false,
  numberOfLines = 1,
  showCounter = false,
  maxLength,
  value = '',
  onChangeText,
  ...props
}) => {
  const hasError = !!errorMessage;
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (text: string) => {
    setInputValue(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          hasError ? styles.errorBorder : styles.normalBorder,
          multiline && styles.multilineWrapper,
        ]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, multiline && styles.multilineInput, style]}
          placeholderTextColor="#999"
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          value={inputValue}
          onChangeText={handleChange}
          // textAlignVertical={multiline ? 'top' : 'center'}
          {...props}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>

      {/* Help / Error / Counter messages */}
      <View style={styles.bottomRow}>
        <View style={{ flex: 1 }}>
          {helpMessage && !hasError && (
            <View style={styles.messageRow}>
              <Image
                source={require('../images/ic_info_fill.png')}
                style={{
                  width: 14,
                  height: 14,
                  tintColor: '#007BFF',
                }}
              />
              <Text style={styles.helpMessage}>{helpMessage}</Text>
            </View>
          )}
          {hasError && (
            <View style={styles.messageRow}>
              <Image
                source={require('../images/ic_alert_triangle_fill.png')}
                style={{
                  width: 14,
                  height: 14,
                  tintColor: '#D32F2F',
                }}
              />
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}
        </View>

        {showCounter && maxLength && (
          <Text
            style={[
              styles.counter,
              inputValue.length >= maxLength
                ? { color: '#D32F2F' }
                : { color: '#666' },
            ]}
          >
            {inputValue.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  multilineWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  normalBorder: {
    borderColor: '#E0E0E0',
  },
  errorBorder: {
    borderColor: '#D32F2F',
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#000',
  },
  multilineInput: {
    minHeight: 80,
  },
  icon: {
    marginHorizontal: 4,
    paddingTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpMessage: {
    marginLeft: 4,
    fontSize: 12,
    color: '#007BFF',
  },
  errorMessage: {
    marginLeft: 4,
    fontSize: 12,
    color: '#D32F2F',
  },
  counter: {
    fontSize: 12,
  },
});

export default Input;

// import React from 'react';
// import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
// import type { TextInputProps, StyleProp, ViewStyle } from 'react-native';
// import { colors, radius, spacing } from '../theme';

// type InputVariant = 'default' | 'outline' | 'filled' | 'error';

// interface InputProps extends TextInputProps {
//   containerStyle?: StyleProp<ViewStyle>;
//   variant?: InputVariant;
//   iconLeft?: React.ReactNode;
//   iconRight?: React.ReactNode;
// }

// const Input = ({
//   containerStyle,
//   style,
//   variant = 'default',
//   iconLeft,
//   iconRight,
//   ...props
// }: InputProps) => {
//   const getVariantStyle = () => {
//     switch (variant) {
//       case 'default':
//         return {
//           borderWidth: 1,
//           borderColor: colors.placeholder,
//           backgroundColor: colors.white,
//         };
//       case 'outline':
//         return {
//           borderWidth: 1,
//           borderColor: colors.primary,
//           backgroundColor: colors.white,
//         };
//       case 'filled':
//         return { borderWidth: 0, backgroundColor: colors.background };
//       case 'error':
//         return {
//           borderWidth: 1,
//           borderColor: colors.danger,
//           backgroundColor: colors.white,
//         };
//       default:
//         return {};
//     }
//   };

//   return (
//     <View style={[styles.container, containerStyle]}>
//       {iconLeft && <View style={{ marginRight: spacing.sm }}>{iconLeft}</View>}
//       <RNTextInput
//         style={[styles.input, getVariantStyle(), style]}
//         placeholderTextColor={colors.placeholder}
//         {...props}
//       />
//       {iconRight && <View style={{ marginLeft: spacing.sm }}>{iconRight}</View>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: spacing.sm,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//     borderRadius: radius.md,
//     fontSize: 14,
//   },
// });

// export default Input;
