/* eslint-disable react-native/no-inline-styles */
import dayjs, { Dayjs } from 'dayjs';
import { upperFirst } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Divider from '../../atoms/Devider';

const SCREEN_WIDTH = Dimensions.get('window').width;
// const DAY_ITEM_WIDTH = SCREEN_WIDTH / 7;
const DAY_ITEM_WIDTH = '14.2%';

// const events: Event[] = [
//   { date: '2025-09-04', color: '#FF4D4F' },
//   { date: '2025-09-07', color: '#52C41A' },
//   { date: '2025-09-10', color: '#FAAD14' },
//   { date: '2025-09-15', color: '#1890FF' },
// ];
interface IEvent {
  date: Date | Dayjs | string;
  color: string;
}
export interface IMonthCalendar {
  initialDate?: Date | Dayjs | string;
  events?: IEvent[];
  onPressClose?: () => void;
  onChangeDate?: (initialDate: Dayjs) => void;
  onConfirmDate?: (initialDate: Dayjs) => void;
}
const MonthCalendar: FC<IMonthCalendar> = ({
  initialDate,
  events = [],
  onPressClose,
  onChangeDate,
}) => {
  const months = dayjs.months();
  const years = Array.from({ length: 21 }, (_, i) => dayjs().year() - 10 + i);
  const weeks = dayjs.weekdaysShort();

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    if (initialDate) {
      setCurrentDate(dayjs(initialDate));
      setSelectedDate(dayjs(initialDate));
    }
  }, [initialDate]);
  const monthDays = useMemo(() => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startWeekDay = startOfMonth.day();
    const daysArray: (dayjs.Dayjs | null)[] = [];
    for (let i = 0; i < startWeekDay; i++) daysArray.push(null);
    for (let d = 1; d <= endOfMonth.date(); d++)
      daysArray.push(dayjs(startOfMonth).date(d));
    return daysArray;
  }, [currentDate]);

  const renderDay = ({ item }: { item: dayjs.Dayjs | null }) => {
    if (!item) return <View style={styles.dayItem} />;
    const isToday = item.isSame(dayjs(), 'day');
    const isSelected = item.isSame(selectedDate, 'day');

    // Lấy tất cả event của ngày
    const dayEvents = events.filter(
      (e) => e.date === item.format('YYYY-MM-DD')
    );

    return (
      <TouchableOpacity
        style={[
          styles.dayItem,
          isSelected && styles.selectedDay,
          isToday && styles.todayDay,
        ]}
        onPress={() => {
          onChangeDate?.(item);
          setSelectedDate(item);
        }}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>
          {item.date()}
        </Text>

        {/* Hiển thị nhiều dot */}
        <View style={styles.eventDotsContainer}>
          {dayEvents.map((e, idx) => (
            <View
              key={idx}
              style={[
                styles.eventDot,
                { backgroundColor: e.color || '#007AFF' },
              ]}
            />
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const selectMonthYear = (monthIndex: number, year: number) => {
    setCurrentDate(currentDate.year(year).month(monthIndex));
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Chọn ngày</Text>
        <TouchableOpacity onPress={onPressClose}>
          <Image
            source={require('./ic_close.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <Divider style={{ marginVertical: 12 }} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setCurrentDate(currentDate.add(-1, 'month'))}
        >
          <Image
            source={require('./ic_left.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.monthText}>
            {upperFirst(currentDate.format('MMMM, YYYY'))}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentDate(currentDate.add(1, 'month'))}
        >
          <Image
            source={require('./ic_right.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* Weekdays */}
      <View style={styles.weekdays}>
        {weeks.map((d: any, idx: number) => (
          <Text
            key={d}
            style={[
              styles.weekdayText,
              (idx === 0 || idx === 6) && { color: '#FF4D4F' },
            ]}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Days */}
      <FlatList
        data={monthDays}
        keyExtractor={(item, index) =>
          item ? item.format('YYYY-MM-DD') : `empty-${index}`
        }
        renderItem={renderDay}
        numColumns={7}
        scrollEnabled={false}
      />

      {/* Modal Picker */}
      <Modal visible={showPicker} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month & Year</Text>

            <View style={styles.pickerContainer}>
              {/* Month Picker */}
              <FlatList
                data={months}
                keyExtractor={(item, i) => item + i}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => selectMonthYear(index, currentDate.year())}
                    style={[
                      styles.pickerItem,
                      index === currentDate.month() &&
                        styles.pickerItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        index === currentDate.month() &&
                          styles.pickerTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/* Year Picker */}
              <FlatList
                data={years}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectMonthYear(currentDate.month(), item)}
                    style={[
                      styles.pickerItem,
                      item === currentDate.year() && styles.pickerItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        item === currentDate.year() &&
                          styles.pickerTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 15,
    // backgroundColor: 'red',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  monthText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  weekdays: { flexDirection: 'row', marginBottom: 8 },
  weekdayText: {
    width: DAY_ITEM_WIDTH,
    textAlign: 'center',
    fontWeight: '600',
    color: '#555',
  },
  dayItem: {
    width: DAY_ITEM_WIDTH,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 100,
  },
  dayText: { color: '#000', fontSize: 14 },
  selectedDay: { backgroundColor: '#007AFF', borderRadius: 100 },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  todayDay: { borderColor: '#007AFF', borderWidth: 2, borderRadius: 100 },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 400,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemSelected: { backgroundColor: '#007AFF', borderRadius: 12 },
  pickerText: { fontSize: 16, color: '#333' },
  pickerTextSelected: { color: '#fff', fontWeight: 'bold' },
  modalClose: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  eventDotsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
    marginVertical: 1,
  },
});

export default MonthCalendar;
