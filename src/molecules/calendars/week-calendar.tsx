import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
dayjs.locale('vi');
interface Item {
  date: string;
  label: string;
  day: number;
  isToday: boolean;
  isSelected: boolean;
  hasEvent: boolean;
}
type WeekCalendarProps = {
  initialDate?: string | number | Dayjs | Date | null | undefined;
  events?: (string | number | Dayjs | Date)[]; // 👈 list of event dates
  itemPaddingHorizontal?: number;
  itemGap?: number;
  onChangeDate?: (newItem: Item) => void;
  activeStyle?: ViewStyle;
  todayStyle?: ViewStyle;
  defaulStyle?: ViewStyle;
  dotActiveStyle?: ViewStyle;
  dotTodayStyle?: ViewStyle;
  dotDefaulStyle?: ViewStyle;
  useWeekend?: boolean;
};

const WeekCalendar = ({
  initialDate,
  events = [], //     events={['2025-09-02', '2025-09-10', '2025-09-08']}
  itemPaddingHorizontal = 16,
  itemGap = 12,
  onChangeDate,
  activeStyle,
  todayStyle,
  defaulStyle,
  dotActiveStyle,
  dotTodayStyle,
  dotDefaulStyle,
  useWeekend,
}: WeekCalendarProps) => {
  const today = dayjs();
  const baseDate = initialDate ? dayjs(initialDate) : today;

  const [selectedDate, setSelectedDate] = useState(baseDate);
  const itemWidth =
    (Dimensions.get('screen').width - itemPaddingHorizontal * 2 + itemGap * 6) /
    7;

  const eventSet = new Set(events.map((d) => dayjs(d).format('YYYY-MM-DD')));

  const startOfWeek = baseDate.startOf('week'); // Monday as T2
  const weekDays = useWeekend
    ? Array.from({ length: 7 }).map((_, i) => {
        const date = startOfWeek.add(i, 'day');
        return {
          date: date.format('YYYY-MM-DD'),
          label: i === 6 ? 'CN' : `T${i + 2}`, // T2–T7, CN
          day: date.date(),
          isToday: date.isSame(today, 'day'),
          isSelected: date.isSame(selectedDate, 'day'),
          hasEvent: eventSet.has(date.format('YYYY-MM-DD')),
        };
      })
    : Array.from({ length: 7 }).map((_, i) => {
        const date = selectedDate.subtract(3, 'day').add(i, 'day'); // từ -3 → +3 ngày quanh hôm nay
        return {
          date: date.format('YYYY-MM-DD'),
          label: date.format('dd'), // hoặc `T2`, `T3`, ... tuỳ bạn muốn
          day: date.date(),
          isToday: date.isSame(today, 'day'),
          isSelected: date.isSame(selectedDate, 'day'),
          hasEvent: eventSet.has(date.format('YYYY-MM-DD')),
        };
      });
  // const weekDays = Array.from({ length: 7 }).map((_, i) => {
  //   const date = selectedDate.subtract(3, 'day').add(i, 'day'); // từ -3 → +3 ngày quanh hôm nay
  //   return {
  //     date: date.format('YYYY-MM-DD'),
  //     label: date.format('dd'), // hoặc `T2`, `T3`, ... tuỳ bạn muốn
  //     day: date.date(),
  //     isToday: date.isSame(today, 'day'),
  //     isSelected: date.isSame(selectedDate, 'day'),
  //     hasEvent: eventSet.has(date.format('YYYY-MM-DD')),
  //   };
  // });
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(dayjs(initialDate));
    }
  }, [initialDate]);
  return (
    <View style={styles.container}>
      <FlatList
        data={weekDays}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: itemPaddingHorizontal,
          gap: itemGap,
        }}
        renderItem={({ item }: { item: Item }) => {
          const isActive = item.isSelected;
          const isToday = item.isToday && !item.isSelected;

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                onChangeDate?.(item);
                setSelectedDate(dayjs(item.date));
              }}
              style={[
                styles.dayContainer,
                { width: itemWidth },
                isActive
                  ? [styles.dayActive, activeStyle]
                  : isToday
                    ? [styles.dayToday, todayStyle]
                    : [styles.dayDefault, defaulStyle],
              ]}
            >
              {/* Label (T2–CN) */}
              <Text
                style={[
                  styles.labelText,
                  isActive
                    ? styles.labelTextActive
                    : isToday
                      ? styles.labelTextToday
                      : styles.labelTextDefault,
                ]}
              >
                {item.label}
              </Text>

              {/* Day number */}
              <Text
                style={[
                  styles.dayText,
                  isActive
                    ? styles.dayTextActive
                    : isToday
                      ? styles.dayTextToday
                      : styles.dayTextDefault,
                ]}
              >
                {item.day}
              </Text>

              {/* Dot under day */}
              {item.hasEvent && (
                <View
                  style={[
                    styles.dot,
                    isActive
                      ? [styles.dotActive, dotActiveStyle]
                      : isToday
                        ? [styles.dotToday, dotTodayStyle]
                        : [styles.dotDefault, dotDefaulStyle],
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12, // py-3
  },
  dayContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 8, // rounded-2xl
    paddingVertical: 12, // py-3
    marginVertical: 6,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 3,
  },
  // Background states
  dayActive: { backgroundColor: '#3B82F6' }, // blue-500
  dayToday: { backgroundColor: '#DBEAFE' }, // blue-100
  dayDefault: { backgroundColor: '#F3F4F6' }, // gray-100

  // Label styles (T2–CN)
  labelText: { fontSize: 14 }, // text-sm
  labelTextActive: { color: '#fff', fontWeight: '700' },
  labelTextToday: { color: '#2563EB', fontWeight: '600' }, // blue-600
  labelTextDefault: { color: '#6B7280' }, // gray-500

  // Day number styles
  dayText: { fontSize: 20, marginTop: 4 }, // text-xl, mt-1
  dayTextActive: { color: '#fff', fontWeight: '700' },
  dayTextToday: { color: '#2563EB', fontWeight: '700' },
  dayTextDefault: { color: '#4B5563' }, // gray-600

  // Dot styles
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  dotActive: { backgroundColor: '#fff' },
  dotToday: { backgroundColor: '#2563EB' },
  dotDefault: { backgroundColor: '#9CA3AF' }, // gray-400
});

export default WeekCalendar;
