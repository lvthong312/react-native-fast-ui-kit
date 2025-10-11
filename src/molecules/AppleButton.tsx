import { StyleSheet } from 'react-native';
import Button, { type ButtonProps } from '../atoms/Button';
import { ImageBase } from '../shared/images/ImageBase';
interface AppleButtonProps extends ButtonProps {}
const AppleButton = ({
  onPress,
  title,
  titleStyle,
  style,
  ...restProps
}: AppleButtonProps) => {
  return (
    <Button
      title={title || 'Sign in with Apple'}
      leftIcon={<ImageBase name="ic_apple_logo" size={18} color='white' />}
      style={[styles.button, style]}
      titleStyle={[styles.title, titleStyle]}
      onPress={onPress}
      {...restProps}
    />
  );
};

export default AppleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1A1C1E',
    borderRadius: 100,
    minHeight: 40,
    shadowOpacity: 0,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
});
