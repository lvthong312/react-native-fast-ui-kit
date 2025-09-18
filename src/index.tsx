import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // import locale tiếng Việt
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
// enable plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);

// set default locale
dayjs.locale('vi');

// set default timezone (nếu muốn)
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');
import Divider from './atoms/Devider';
import MonthCalendar from './molecules/calendars/month-calendar';
import WeekCalendar from './molecules/calendars/week-calendar';
import {
  CalendarProvider,
  useCalendar,
} from './molecules/calendars/calendar-provider';

export { Divider, MonthCalendar, WeekCalendar, CalendarProvider, useCalendar };
