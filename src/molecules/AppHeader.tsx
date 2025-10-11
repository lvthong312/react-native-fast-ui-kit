import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { ImageBase } from '../shared/images/ImageBase';
import Text from '../atoms/Text';

export interface AppHeaderProps {
  title?: string;
  onBackPress?: () => void;
  rightIcon?: React.ReactNode;
  rightText?: string;
  onRightPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  showBottomBorder?: boolean;
  insets?: any;
  backIconSize?: number;
  backIconColor?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onBackPress,
  rightIcon,
  rightText,
  onRightPress,
  style,
  titleStyle,
  showBottomBorder = true,
  insets,
  backIconSize = 24,
  backIconColor = '#222 ',
}) => {
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets?.top || 0 },
        showBottomBorder && styles.bottomBorder,
        style,
      ]}
    >
      <View style={styles.inner}>
        {/* Left (Back Button) */}
        <View style={styles.left}>
          {onBackPress ? (
            <TouchableOpacity onPress={onBackPress} hitSlop={hitSlop}>
              <ImageBase
                name="ic_arrow_left"
                size={backIconSize}
                color={backIconColor}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Center (Title) */}
        <View style={styles.center}>
          {title ? (
            <Text numberOfLines={1} style={[styles.title, titleStyle]}>
              {title}
            </Text>
          ) : null}
        </View>

        {/* Right (Action) */}
        <View style={styles.right}>
          {rightText ? (
            <TouchableOpacity onPress={onRightPress} hitSlop={hitSlop}>
              <Text style={styles.rightText}>{rightText}</Text>
            </TouchableOpacity>
          ) : rightIcon ? (
            <TouchableOpacity onPress={onRightPress} hitSlop={hitSlop}>
              {rightIcon}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  rightText: {
    fontSize: 16,
    color: '#007AFF',
  },
  bottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
});

export default AppHeader;
