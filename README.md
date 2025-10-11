# React Native Fast UI Kit

A fast and customizable **UI Kit for React Native** including ready-to-use components like `Divider`, `MonthCalendar`, `WeekCalendar`, and more.

<p align="center">
  <img src="https://img.shields.io/npm/v/react-native-fast-ui-kit?color=green" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/react-native-fast-ui-kit" alt="npm downloads" />
  <img src="https://img.shields.io/badge/react--native-0.70+-blue" alt="react-native" />
</p>

---

## 🚀 Installation

```bash
yarn add react-native-fast-ui-kit
# or
npm install react-native-fast-ui-kit
```
```tsx
import { SafeAreaView, Text } from 'react-native';
import {
  Divider,
  MonthCalendar,
  WeekCalendar,
} from 'react-native-fast-ui-kit';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 18,
          marginVertical: 16,
          color: 'green',
        }}
      >
        Divider:
      </Text>
      <Divider />

      <Text
        style={{
          fontWeight: '500',
          fontSize: 18,
          marginVertical: 16,
          color: 'green',
        }}
      >
        MonthCalendar:
      </Text>
      <MonthCalendar />

      <Text
        style={{
          fontWeight: '500',
          fontSize: 18,
          marginVertical: 16,
          color: 'green',
        }}
      >
        WeekCalendar:
      </Text>
      <WeekCalendar />
    </SafeAreaView>
  );
}
```
## 📚 Components

### Divider
A simple line separator.

### MonthCalendar
Displays a full monthly calendar view.  
Uses [dayjs](https://day.js.org/) under the hood.

### WeekCalendar
Displays a weekly calendar view.  
Customizable via props.


```sh
git clone https://github.com/lvthong312/react-native-fast-ui-kit.git
cd react-native-fast-ui-kit
yarn install

# Run the example app
cd example
yarn install
yarn ios   # or yarn android
```

MIT © 2025 Thong Luong
