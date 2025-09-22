import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
type AvatarWithOverlayProps = {
  source: ImageSourcePropType;
  size?: number; // kích thước avatar
  thickness?: number; // độ dày overlay viền
  overlayColor?: string;
};

const AvatarWithOverlay: React.FC<AvatarWithOverlayProps> = ({
  source,
  size = 80,
  thickness = 4,
  overlayColor = 'white',
}) => {
  const totalSize = size + thickness * 2;

  return (
    <View
      style={[
        styles.container,
        {
          width: totalSize,
          height: totalSize,
          borderRadius: totalSize / 2,
          backgroundColor: overlayColor,
        },
      ]}
    >
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AvatarWithOverlay;
