// CalendarProvider.tsx
import dayjs, { Dayjs } from 'dayjs';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MonthCalendar from './month-calendar';
import type { IMonthCalendar } from './month-calendar';
import type { ViewStyle } from 'react-native';
type ModalOptions = {
  transparent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  onRequestClose?: () => void;
  centered?: boolean; // new option
  backdropColor?: string; // new option
  contentStyle?: ViewStyle;
};

type ModalContextProps = {
  showCalendar: (calendarProps: IMonthCalendar, options?: ModalOptions) => void;
  closeCalendar: () => void;
  date: Dayjs;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useCalendar = (initialDate = dayjs()) => {
  const [date, setDate] = useState(initialDate);

  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useCalendar must be used inside CalendarProvider');

  const showCalendar = (
    calendarProps?: IMonthCalendar,
    options?: ModalOptions
  ) => {
    context.showCalendar(
      {
        onChangeDate: () => {
          // setDate(newDate);
        },
        onConfirmDate: (newDate) => {
          setDate(newDate);
        },
        initialDate: date,
        events: calendarProps?.events,
      },
      options
    );
  };
  const closeCalendar = () => {
    context.closeCalendar();
  };
  return {
    showCalendar,
    closeCalendar,
    date,
    globalDate: context.date,
  };
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [calendarProps, setCalendarProps] = useState<IMonthCalendar>(
    {} as IMonthCalendar
  );
  const [options, setOptions] = useState<ModalOptions>({
    transparent: true,
    animationType: 'slide',
    centered: true,
    backdropColor: 'rgba(0,0,0,0.5)',
    contentStyle: {},
  });
  const [date, setDate] = useState<Dayjs>(dayjs());
  const showCalendar = useCallback(
    (props: IMonthCalendar, opts?: ModalOptions) => {
      if (props?.initialDate) {
        setDate(dayjs(props?.initialDate));
      }
      setCalendarProps(props);
      if (opts) setOptions({ ...options, ...opts });
      setVisible(true);
    },
    [options]
  );

  const closeCalendar = useCallback(() => {
    setVisible(false);
  }, []);

  const value = useMemo(
    () => ({
      showCalendar,
      closeCalendar,
      date,
    }),
    [showCalendar, closeCalendar, date]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      <Modal
        visible={visible}
        transparent={options.transparent}
        animationType={options.animationType}
        onRequestClose={options.onRequestClose || closeCalendar}
      >
        <TouchableOpacity
          style={[
            styles.overlay,
            { backgroundColor: options.backdropColor || 'rgba(0,0,0,0.5)' },
            options.centered ? styles.centeredOverlay : undefined,
          ]}
          activeOpacity={1}
          // onPress={closeCalendar}
        >
          <View style={[styles.modalContainer, options?.contentStyle]}>
            {/* {isValidElement(content)
              ? cloneElement(content, {
                  onPressClose: closeCalendar,
                })
              : content} */}
            <MonthCalendar
              {...calendarProps}
              onPressClose={closeCalendar}
              onChangeDate={(newDate) => {
                setDate(newDate);
                calendarProps?.onChangeDate?.(newDate);
              }}
              initialDate={date}
            />
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                calendarProps?.onConfirmDate?.(date);
                closeCalendar();
              }}
            >
              <Text style={styles.textApply}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // default bottom
    alignItems: 'center',
  },
  centeredOverlay: {
    justifyContent: 'center', // center if centered = true
  },
  modalContainer: {
    minWidth: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: Dimensions.get('window').width - 32,
  },
  close: {
    backgroundColor: '#0050ff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  textApply: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
