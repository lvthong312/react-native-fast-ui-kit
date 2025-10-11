import { Image, StyleSheet, View, type ImageSource } from 'react-native';
import Text from './Text';
import { useMemo } from 'react';

interface AvatarProps {
  source?: ImageSource | undefined;
  fullName?: string;
  size?: number;
  backgroundColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  shortNameColor?: string;
  showShortName?: boolean;
}

const Avatar = ({
  source,
  showShortName,
  fullName,
  size = 48,
  backgroundColor = '#3b82f6',
  strokeWidth = 0,
  strokeColor = '#fff',
  shortNameColor = '#fff',
}: AvatarProps) => {
  const displayName = useMemo(() => {
    if (showShortName) {
      return fullName
        ? fullName
            ?.split?.(' ')
            .map((word: string) => word[0]) // lấy ký tự đầu => ["T", "L"]
            .join('')
        : '';
    }
    return fullName;
  }, [fullName]);
  return (
    <View
      style={[
        styles.wrapper,
        {
          width: size + strokeWidth * 2,
          height: size + strokeWidth * 2,
          borderRadius: (size + strokeWidth * 2) / 2,
          backgroundColor: backgroundColor,
          borderWidth: strokeWidth,
          borderColor: strokeColor,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Text
          style={[
            styles.shortName,
            {
              fontSize: size / 2.5,
              color: shortNameColor,
            },
          ]}
        >
          {displayName}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shortName: {
    fontWeight: '600',
  },
});

export default Avatar;
