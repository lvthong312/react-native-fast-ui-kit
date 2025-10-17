import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
// Đảm bảo bạn đã export Tabbar từ file của mình
import {Tabbar} from 'react-native-fast-ui-kit'; // Thay thế bằng đường dẫn thực tế đến file Tabbar

// Định nghĩa các Tabs
const TABS_DATA = [
  { key: 'hot', label: 'Nổi Bật' },
  { key: 'new', label: 'Mới Nhất' },
  { key: 'following', label: 'Đang Theo Dõi' },
];

const TabbarExample = () => {
  // 1. Khai báo state để lưu tab đang được chọn
  const [selectedTab, setSelectedTab] = useState(TABS_DATA?.[0]?.key);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Tiêu đề Ví dụ */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Ví Dụ Custom Tabbar</Text>
      </View>

      {/* 2. Sử dụng Component Tabbar */}
      <Tabbar
        tabs={TABS_DATA}
        selected={selectedTab as any}
        setSelected={setSelectedTab}
        style={styles.tabbarStyle} // Áp dụng style thêm (nếu cần)
      />

      {/* 3. Hiển thị nội dung dựa trên tab được chọn */}
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Nội dung đang hiển thị cho tab:
          <Text style={styles.selectedTabText}>
            {' '}
            {selectedTab?.toUpperCase?.()}
          </Text>
        </Text>
        <Text style={styles.instructionText}>
          Thay đổi tab trên thanh Tabbar để thấy nội dung thay đổi.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Nền chung của màn hình
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabbarStyle: {
    // Để Tabbar cách đều hai bên màn hình
    marginHorizontal: 20,
    // Có thể thêm margin top nếu cần
    marginTop: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  selectedTabText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF', // Màu sắc tươi sáng
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default TabbarExample;
