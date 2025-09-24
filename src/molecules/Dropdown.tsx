import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

// Interface for each dropdown option
export interface DropdownOption {
  label: string;
  value: string | number;
}

// Props interface for Dropdown
export interface DropdownProps {
  options: DropdownOption[];
  selectedValue: DropdownOption | null;
  onValueChange: (item: DropdownOption) => void;
  placeholder?: string;
  maxHeight?: number; // new prop
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  selectedItemStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  label?: string;
}

export const Dropdown = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  maxHeight = 200, // default max height
  containerStyle,
  headerStyle,
  headerTextStyle,
  selectedItemStyle,
  itemStyle,
  itemTextStyle,
  labelTextStyle,
  labelStyle,
  label,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const handleSelect = (item: DropdownOption) => {
    onValueChange(item);
    setIsOpen(false);
  };

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(options.length * 50, maxHeight)],
  });

  const dropdownOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Dropdown header */}
      <Pressable
        style={({ pressed }) => [
          styles.header,
          headerStyle,
          isOpen && styles.headerOpen,
          pressed && { backgroundColor: '#f0f0f0' },
        ]}
        onPress={() => setIsOpen(!isOpen)}
      >
        {typeof label === 'string' ? (
          <View
            style={[
              {
                position: 'absolute',
                top: -10,
                backgroundColor: 'white',
                left: 10,
                paddingVertical: 2,
                paddingHorizontal: 4,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
              },
              labelStyle,
            ]}
          >
            <Text style={[labelTextStyle]}>{label}</Text>
          </View>
        ) : (
          label
        )}
        <Text style={[styles.headerText, headerTextStyle]}>
          {selectedValue ? selectedValue.label : placeholder}
        </Text>
        <Image
          source={
            isOpen
              ? require('../images/ic_up_arrow.png')
              : require('../images/ic_down_arrow.png')
          }
          style={{
            width: 20,
            height: 20,
            tintColor: '#555',
          }}
        />
      </Pressable>

      {/* Animated dropdown list */}
      <Animated.View
        style={[
          styles.listContainer,
          { height: dropdownHeight, opacity: dropdownOpacity },
        ]}
      >
        <FlatList
          data={options}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedValue?.value === item.value;
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  itemStyle,
                  pressed && { backgroundColor: '#f5f5f5' },
                  isSelected && selectedItemStyle,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.itemText,
                    itemTextStyle,
                    isSelected && { fontWeight: 'bold' },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerOpen: {
    borderColor: '#888',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
