import type { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-fast-size-matters';
import { ImageBase } from '../shared/images/ImageBase';
interface NotFoundScreenProps {
  renderNotFoundImage: () => ReactElement;
  onPressBack: () => void;
  title: string;
  subTitle: string;
}
const NotFoundScreen = ({
  renderNotFoundImage,
  onPressBack,
  title,
  subTitle,
}: NotFoundScreenProps) => {
  return (
    <View style={styles.container}>
      {renderNotFoundImage ? (
        renderNotFoundImage()
      ) : (
        <ImageBase name="not_found" style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.title}>
        {title || 'Oops! Không tìm thấy nội dung'}
      </Text>
      <Text style={styles.message}>
        {subTitle ||
          '  Rất tiếc! Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPressBack}>
        <Text style={styles.buttonText}>Quay về</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    backgroundColor: '#fff',
  },
  image: {
    width: scale(200),
    height: scale(200),
    marginBottom: moderateScale(24),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
    textAlign: 'center',
    color: '#111',
  },
  message: {
    fontSize: moderateScale(14),
    color: '#555',
    textAlign: 'center',
    marginBottom: moderateScale(24),
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(32),
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16),
  },
});
