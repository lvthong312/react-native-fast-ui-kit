import React, {
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale } from 'react-native-fast-size-matters';
import { ImageBase } from '../shared/images/ImageBase';

type LoadingScreenProps = {
  message?: string;
  hideBack?: boolean;
  Logo?: ReactNode | ReactElement;
  onPressBack?: () => void;
};
export const LoadingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDot = (dot: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot, {
          toValue: -4,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot1 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot2 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: dot3 }] }]}
      />
    </View>
  );
};
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  hideBack = false,
  onPressBack,
  Logo,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <View style={styles.container}>
      {/* Back button */}
      {!hideBack && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            zIndex: 10,
            padding: 8,
            borderRadius: 20,
            backgroundColor: '#ffffffcc',
          }}
          onPress={onPressBack}
        >
          <ImageBase name="ic_arrow_left" width={28} height={28} />
        </TouchableOpacity>
      )}
      {/* Logo + animation */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
        }}
      >
        {Logo}
      </Animated.View>

      <LoadingDots />
      {message && (
        <Text style={[styles.message, { color: '#333' }]}>{message}</Text>
      )}
    </View>
  );
};

type LoadingWrapperProps = {
  loading: boolean;
  loadingMessage?: string;
  children: React.ReactNode;
  hideBack?: boolean;
};

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  loadingMessage,
  children,
  hideBack,
}) => {
  if (loading) {
    return (
      <LoadingScreen
        message={loadingMessage || 'Đang tải...'}
        hideBack={hideBack}
      />
    );
  }

  return <>{children}</>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  message: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(10),
    backgroundColor: '#0050ff',
    marginHorizontal: moderateScale(4),
  },
});
