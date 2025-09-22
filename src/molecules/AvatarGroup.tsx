import { take } from 'lodash';
import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
interface ListAvatarsProps {
  avatar: string;
  fullName: string;
}

interface AvatarGroupProps {
  listAvatars?: ListAvatarsProps[];
  showNums?: number;
  reverse?: boolean;
  gap?: number;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  listAvatars = [],
  showNums = 2,
  reverse = false,
  gap = -10,
  textStyle,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {take(listAvatars, showNums)?.map((item, index) => (
        <Image
          key={`participant-avatar-${index}`}
          source={{ uri: item.avatar }}
          style={[
            styles.avatar,
            {
              zIndex: reverse ? index : showNums - index,
              left: gap * index,
            },
          ]}
        />
      ))}

      {/* Nếu chỉ có 1 người, show tên */}
      {listAvatars?.length === 1 && (
        <Text style={[styles.singleText, textStyle]} numberOfLines={1}>
          {listAvatars[0]?.fullName}
        </Text>
      )}

      {/* Nếu nhiều hơn showNums, show "+N người đăng ký" */}
      {listAvatars?.length > showNums && (
        <Text style={[styles.moreText, textStyle]} numberOfLines={1}>
          {`+${listAvatars.length - showNums} người đăng ký`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#919EAB33',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  singleText: {
    marginLeft: 4,
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    flex: 1,
  },
  moreText: {
    marginLeft: 4,
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    flex: 1,
  },
});

export default AvatarGroup;
