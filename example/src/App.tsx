import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Divider, MonthCalendar, WeekCalendar } from 'react-native-ui-kit';
export default function App() {
  const renderTitle = (title = '') => {
    return <Text style={styles.title}>{title}</Text>;
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderTitle('Divider: ')}
      <Divider />
      {renderTitle('MonthCalendar: ')}
      <MonthCalendar />
      {renderTitle('WeekCalendar: ')}
      <WeekCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 16,
    color: 'green',
  },
});
