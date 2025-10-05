import { ImageBase } from '../shared/images/ImageBase';
import CheckBox, { type CheckBoxProps } from './CheckBox';
interface RadioButtonProps extends CheckBoxProps {
  selected: boolean;
  onPress?: () => void;
  checkedColor?: string;
  unCheckedColor?: string;
}

const RadioButton = ({
  selected,
  onPress,
  checkedColor = 'blue',
  unCheckedColor = 'blue',
  ...rest
}: RadioButtonProps) => {
  return (
    <CheckBox
      checked={selected}
      onPress={onPress}
      checkedIcon={<ImageBase name="ic_radio" size={24} color={checkedColor} />}
      uncheckedIcon={
        <ImageBase name="ic_unradio" size={24} color={unCheckedColor} />
      }
      {...rest}
    />
  );
};

export default RadioButton;
