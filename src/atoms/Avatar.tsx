import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';

interface AvatarProps {
  source?: { uri?: string };
  displayShortName?: string;
  size?: number;
  backgroundColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  shortNameColor?: string;
}

const Avatar = ({
  source,
  displayShortName,
  size = 48,
  backgroundColor = '#3b82f6',
  strokeWidth = 0,
  strokeColor = '#fff',
  shortNameColor = '#fff',
}: AvatarProps) => {
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
      {source?.uri ? (
        <Image
          source={{ uri: source.uri }}
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
          {displayShortName}
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
