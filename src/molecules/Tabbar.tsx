import { Pressable, Text, View, type ViewStyle } from 'react-native';
// Giả định bạn có một hàm moderateScale hoạt động
import { moderateScale } from 'react-native-fast-size-matters';

// Màu sắc tươi sáng

type Tabs = {
  key: string;
  label: string;
};

const Tabbar = ({
  tabs,
  selected,
  setSelected,
  style,
  activeColor = '#007AFF',
  inActiveTextColor = '#6b7280',
  containerBgColor = '#ffffff',
}: {
  tabs: Tabs[];
  selected: string;
  setSelected: any;
  style?: ViewStyle;
  activeColor?: string;
  inActiveTextColor?: string;
  containerBgColor?: string;
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: containerBgColor, // Màu trắng tinh khiết
          borderRadius: moderateScale(10), // Bo tròn góc đẹp hơn
          padding: moderateScale(4),
          marginBottom: moderateScale(20),

          // Hiệu ứng nổi (Shadow/Elevation)
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08, // Độ mờ vừa phải
          shadowRadius: 4, // Độ lan rộng bóng
          elevation: 4, // Android
        },
        style,
      ]}
    >
      {tabs?.map?.((tab) => {
        const isActive = selected === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => setSelected(tab.key)}
            style={{
              flex: 1,
              paddingVertical: moderateScale(8),
              alignItems: 'center',
              justifyContent: 'center',
              // Màu nền của Tab hoạt động
              backgroundColor: isActive ? activeColor + '10' : 'transparent', // Thêm độ mờ (opacity) cho màu nền active
              borderRadius: moderateScale(8), // Bo tròn góc cho tab đang active
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: isActive ? '700' : '500', // Tăng độ đậm cho tab hoạt động
                // Màu text của Tab hoạt động
                color: isActive ? activeColor : inActiveTextColor,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Tabbar;
