import { StyleSheet } from 'react-native';
import Button, { type ButtonProps } from '../atoms/Button';
import { ImageBase } from '../shared/images/ImageBase';
interface GoogleButtonProps extends ButtonProps {}
const GoogleButton = ({
  onPress,
  title,
  titleStyle,
  style,
  ...restProps
}: GoogleButtonProps) => {
  return (
    <Button
      title={title || 'Tiếp tục với Google'}
      leftIcon={<ImageBase name="ic_google" size={18} />}
      style={[styles.button, style]}
      titleStyle={[styles.title, titleStyle]}
      onPress={onPress}
      {...restProps}
    />
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EFF0F6',
    borderRadius: 100,
    minHeight: 40,
    shadowOpacity: 0,
  },
  title: {
    color: '#1A1C1E',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
});
