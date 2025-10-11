import React, { useEffect, useRef, type ReactElement } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-fast-size-matters';

interface ProgressBarProps {
  progress: number; // value between 0 and 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  style?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  percentLabelStyle?: TextStyle;
  renderLabel?: () => ReactElement;
  position?: 'top' | 'bottom';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 10,
  backgroundColor = '#E0E0E0',
  fillColor = '#007AFF',
  style,
  label = '',
  labelStyle,
  percentLabelStyle,
  renderLabel,
  position = 'top',
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const progressPercent = Math.round(progress * 100);
  const isCompleted = progressPercent === 100;
  const Label = () => (
    <View style={styles.progressHeader}>
      <Text style={[styles.progressLabel, labelStyle]}>
        {label ? label : isCompleted ? 'Hoàn thành' : 'Tiến độ'}
      </Text>
      <Text
        style={[
          styles.progressPercent,
          { color: isCompleted ? '#10B981' : '#0050ff' },
          percentLabelStyle,
        ]}
      >
        {progressPercent > 100 ? 100 : progressPercent}%
      </Text>
    </View>
  );
  return (
    <View style={style}>
      {position === 'top' && (renderLabel ? renderLabel() : <Label />)}
      <View style={[styles.container, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: fillColor, width: widthInterpolated },
          ]}
        />
      </View>
      {position === 'bottom' && (renderLabel ? renderLabel() : <Label />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 20,
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    top: -22,
    fontWeight: '600',
  },
  progressWrapper: {
    marginTop: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: moderateScale(12),
    color: '#4B5563',
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 6,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 4,
  },
});

export default ProgressBar;
