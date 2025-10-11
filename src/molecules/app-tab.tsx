import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { moderateScale } from 'react-native-fast-size-matters';
type Tabs = {
  key: string;
  label: string;
};
const AppTab = ({
  tabs,
  selected,
  setSelected,
  style,
}: {
  tabs: Tabs[];
  selected: string;
  setSelected: any;
  style?: ViewStyle;
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: '#f3f4f6',
          borderRadius: 6,
          padding: moderateScale(4),
          marginBottom: moderateScale(20),
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
              backgroundColor: isActive ? 'white' : '',
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: '500',
                color: isActive ? '#000' : '#9ca3af',
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

export default AppTab;
