// SearchBarButton.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type ImageStyle,
  type TextStyle,
  type ViewStyle
} from 'react-native';
import { moderateScale } from 'react-native-fast-size-matters';
import { ImageBase } from '../shared/images/ImageBase';

interface SearchBarButtonProps {
  placeholder?: string;
  onPress: () => void;
  style?: ViewStyle;
  placehoderStyle?: TextStyle;
  iconSearchStyle?: ImageStyle;
}

const SearchBarButton: React.FC<SearchBarButtonProps> = ({
  placeholder = 'Tìm kiếm...',
  onPress,
  style,
  placehoderStyle,
  iconSearchStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ImageBase
        name="ic_search" // Giả định đây là icon search của bạn
        size={moderateScale(20)}
        color="#007AFF" // Thay đổi màu icon thành màu xanh dương tươi sáng
        style={[styles.icon, iconSearchStyle]}
      />
      <Text style={[styles.placeholder, placehoderStyle]}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default SearchBarButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // Nền trắng tinh khiết hoặc trắng ngà nhạt để tạo sự "sáng"
    backgroundColor: '#FFFFFF', 
    borderRadius: moderateScale(25), // Tăng độ cong để trông hiện đại hơn
    paddingHorizontal: moderateScale(16), // Tăng padding ngang
    paddingVertical: moderateScale(12), // Tăng padding dọc
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
  },
  icon: {
    marginRight: moderateScale(10), // Tăng khoảng cách một chút
  },
  placeholder: {
    // Màu chữ xám đậm hơn một chút để dễ đọc
    color: '#666666', 
    fontSize: moderateScale(16),
    // Thêm font weight để chữ trông rõ ràng hơn (nếu font của bạn hỗ trợ)
    // fontWeight: '500', 
  },
});