import {
  forwardRef,
  type ReactElement,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { images } from '../shared/images';
export interface AnimatedAppHeaderRef {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
interface AnimatedAppHeaderProps {
  title?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  onPressLeft?: () => void;
  topInsets?: number;
}

const AnimatedAppHeader = forwardRef<
  AnimatedAppHeaderRef,
  AnimatedAppHeaderProps
>(({ title, rightIcon, leftIcon, onPressLeft, topInsets = 0 }, ref) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  useImperativeHandle(ref, () => ({
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.setValue(e?.nativeEvent?.contentOffset?.y);
    },
  }));

  // Background header animate
  const headerBackgroundStyle = {
    backgroundColor: scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: ['transparent', 'white'],
      extrapolate: 'clamp',
    }),
  };

  // Icon màu animate
  const iconColor = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['black', 'black'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: topInsets + 40,
        },
        headerBackgroundStyle,
      ]}
    >
      <TouchableOpacity
        onPress={onPressLeft}
        style={[
          styles.iconWrapper,
          {
            marginTop: topInsets + (Platform.OS === 'android' ? 16 : 0),
          },
        ]}
      >
        {leftIcon || (
          <Animated.Image
            source={images.ic_arrow_left}
            style={{
              width: 20,
              height: 20,
              tintColor: iconColor,
            }}
          />
        )}
      </TouchableOpacity>

      <Animated.Text
        style={[
          styles.title,
          {
            marginTop: topInsets + (Platform.OS === 'android' ? 16 : 0),
            color: iconColor as any,
          },
        ]}
      >
        {title}
      </Animated.Text>

      <View
        style={[
          styles.iconWrapper,
          {
            marginTop: topInsets + (Platform.OS === 'android' ? 16 : 0),
            alignItems: 'flex-end',
          },
        ]}
      >
        {rightIcon}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    zIndex: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});

export default AnimatedAppHeader;
