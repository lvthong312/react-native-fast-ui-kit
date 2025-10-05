import {
  Text as RNText,
  StyleSheet,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

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
  color = '#007AFF',
  textColor = 'white',
  borderRadius = 12,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
