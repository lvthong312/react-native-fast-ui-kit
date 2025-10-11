import React, { useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  AnimatedAppHeader,
  AppHeader,
  Avatar,
  AvatarGroup,
  AvatarWithOverlay,
  Badge,
  Button,
  Card,
  CheckBox,
  Divider,
  Dropdown,
  FastUIKit,
  GoogleButton,
  Input,
  MonthCalendar,
  ProgressBar,
  RadioButton,
  SearchBar,
  Switch,
  Text,
  Ticket,
  WeekCalendar,
  type AnimatedAppHeaderRef
} from '../../src/index';
FastUIKit.init({
  defaultStyle: {
    text: {
      style: {
        fontFamily: 'YOUR_FONT',
      },
    },
    button: {
      style: {},
      titleStyle: {},
    },
  },
});
export default function App() {
  const [selected, setSelected] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [password, setPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dropdownSelected, setDropdownSelected] = useState<any>(null);

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionTitle}>
        {title}
      </Text>
      {children}
    </View>
  );
  const animatedAppHeaderRef = useRef<AnimatedAppHeaderRef>(null);
  // return (
  //   <LoadingScreen
  //     Logo={
  //       <ImageBase
  //         name='ic_checkbox'
  //         size={80}
  //         style={{ marginBottom: 20 }}
  //       />
  //     }
  //   />
  // );
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedAppHeader
        ref={animatedAppHeaderRef}
        onPressLeft={() => {}}
        title="Danh sách khóa học"
        topInsets={80}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={animatedAppHeaderRef.current?.onScroll}
      >
        {renderSection(
          'ProgressBar:',
          <>
            <ProgressBar progress={0.3} height={4} fillColor="#4CAF50" />
          </>
        )}
        {renderSection(
          'Header:',
          <>
            <AppHeader
              onBackPress={() => {}}
              title="Header"
              rightText="right"
            />
          </>
        )}
        {renderSection(
          'CheckBox:',
          <>
            <CheckBox label="Default" />
          </>
        )}
        {renderSection(
          'Dropdown:',
          <Dropdown
            options={[
              { label: 'Option 1', value: 1 },
              { label: 'Option 2', value: 2 },
              { label: 'Option 3', value: 3 },
              { label: 'Option 4', value: 4 },
              { label: 'Option 5', value: 5 },
            ]}
            selectedValue={dropdownSelected}
            onValueChange={(item) => {
              setDropdownSelected(item);
            }}
          />
        )}

        {renderSection(
          'Ticket:',
          <Card
            style={{
              padding: 12,
              alignItems: 'center',
              backgroundColor: 'blue',
            }}
          >
            <Ticket
              header={
                <View style={{ padding: 8 }}>
                  <Text
                    style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
                  >
                    Movie Ticket
                  </Text>
                  <Text style={{ color: 'black' }}>Seat A12</Text>
                </View>
              }
              footer={
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'black' }}>Scan at entrance</Text>
                </View>
              }
              bgColor="white" // main background
              dotColor="blue" // different dot color
              dividerColor="#919EAB" // white dashed line
              containerStyle={{ width: 320, height: 300, borderRadius: 12 }} // override base style
            />
          </Card>
        )}
        {/* SearchBar Example */}

        {renderSection(
          'SearchBar:',
          <View>
            <SearchBar
              leftComponent="Trang chủ"
              onPressBack={() => console.log('Back pressed')}
              onChangeTextSearch={(text) => setSearchText(text)}
              isSearchAnimation={true} // thử tắt animation = false
              showBackButton={true}
            />

            {/* Nội dung hiển thị search text */}
            <View style={{ marginTop: 20 }}>
              <Text style={styles.resultText}>
                Kết quả tìm kiếm: {searchText || 'Chưa nhập gì...'}
              </Text>
            </View>
          </View>
        )}
        {renderSection('Divider:', <Divider />)}

        {renderSection('MonthCalendar:', <MonthCalendar />)}

        {renderSection('WeekCalendar:', <WeekCalendar itemGap={6} />)}

        {renderSection(
          'Text Variants:',
          <>
            <Text type="heading">Heading Text</Text>
            <Text type="title">Subtitle Text</Text>
            <Text type="normal">Normal Text</Text>
            <Text type="subtitle">Subtitle Text</Text>
          </>
        )}

        {renderSection(
          'Inputs:',
          <>
            <Input placeholder="Default" />
            <Input placeholder="Outline" multiline />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <Input placeholder="Error" />
          </>
        )}

        {renderSection(
          'Buttons:',
          <>
            <Button
              title="Primary"
              type="primary"
              onPress={() => Alert.alert('Primary clicked')}
            />
            <Button title="Secondary" type="secondary" />
            <Button title="Outline" type="outline" />
            <Button title="Disabled" type="disabled" />
            <Button title="Clear" type="clear" />
            <Button title="Button" loading />

            <GoogleButton onPress={() => {}} title={''} />
          </>
        )}

        {renderSection(
          'Radio / Switch:',
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <RadioButton
              selected={selected}
              onPress={() => setSelected(!selected)}
              gap={10}
            />
            <Switch value={switchOn} onValueChange={setSwitchOn} />
          </View>
        )}

        {renderSection(
          'Avatar / Badge:',
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Avatar size={50} source={{ uri: '' }} fullName="Good Morning" />
            <Badge text="New" />
          </View>
        )}

        {renderSection(
          'Avatar Group:',
          <AvatarGroup
            listAvatars={[
              {
                avatar: '',
                fullName: 'Alice',
              },
              {
                avatar: '',
                fullName: 'Bob',
              },
              {
                avatar: '',
                fullName: 'Charlie',
              },
            ]}
            showNums={2}
            textStyle={{
              color: 'black',
            }}
          />
        )}

        {renderSection(
          'Avatar With Overlay:',
          <AvatarWithOverlay size={70} thickness={6} source={{ uri: '' }} />
        )}

        {renderSection(
          'Card:',
          <Card>
            <Text>Card Content Example</Text>
            <Button
              title="Open Modal"
              type="primary"
              onPress={() => Alert.alert('Open Modal clicked')}
            />
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { padding: 16, paddingBottom: 32 },
  section: { marginBottom: 32 },
  sectionTitle: { color: '#007AFF', marginBottom: 12 },
  resultText: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 16,
  },
});
