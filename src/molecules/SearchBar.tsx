import React, { useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../atoms/Text';
import { ImageBase } from '../shared/images/ImageBase';
interface IProps {
  leftComponent?: React.ReactNode | string;
  hideSearch?: boolean;
  containerStyle?: ViewStyle;
  iconSize?: number;
  showBackButton?: boolean;
  onPressBack?: () => void;
  onChangeTextSearch?: (text: string) => void;
  isSearchAnimation?: boolean; // ✅ NEW PROP
  defaultSearching?: boolean;
  onSubmitEditing?: () => void;
}

const screenWidth = Dimensions.get('window').width;

const SearchBar: React.FC<IProps> = ({
  leftComponent,
  containerStyle,
  hideSearch = false,
  iconSize = 24,
  showBackButton = true,
  onPressBack,
  onChangeTextSearch,
  isSearchAnimation = true,
  defaultSearching = false,
  onSubmitEditing = () => {},
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current; // start off-screen
  useEffect(() => {
    if (defaultSearching) {
      startSearch();
    }
  }, [defaultSearching]);
  const startSearch = () => {
    setIsSearching(true);
    if (isSearchAnimation) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(0);
    }
  };

  const cancelSearch = () => {
    if (isSearchAnimation) {
      Animated.timing(slideAnim, {
        toValue: screenWidth,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsSearching(false);
        onChangeTextSearch?.('');
      });
    } else {
      setIsSearching(false);
      onChangeTextSearch?.('');
    }
  };

  const renderLeftComponent = () => {
    if (isSearching) {
      return (
        <Animated.View
          style={[{ flex: 1, transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              onChangeText={onChangeTextSearch}
              placeholder="Tìm kiếm..."
              placeholderTextColor="#999"
              autoFocus
              onSubmitEditing={onSubmitEditing}
            />
            <TouchableOpacity onPress={cancelSearch}>
              <Text style={styles.cancelText}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }

    if (typeof leftComponent === 'string') {
      return <Text style={styles.titleText}>{leftComponent}</Text>;
    }

    return leftComponent;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftWrapper}>
        {showBackButton && !isSearching && (
          <TouchableOpacity onPress={onPressBack}>
            <ImageBase name="ic_arrow_left" size={iconSize} color="black" />
          </TouchableOpacity>
        )}
        {renderLeftComponent()}
      </View>

      <View style={styles.rightWrapper}>
        {!isSearching && !hideSearch && (
          <TouchableOpacity style={styles.button} onPress={startSearch}>
            <ImageBase name="ic_search" size={iconSize} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  button: {
    padding: 6,
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 14,
    color: 'black',
  },
  cancelText: {
    color: '#0050ff',
    fontSize: 14,
    marginLeft: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});
