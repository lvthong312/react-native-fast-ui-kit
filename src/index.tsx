// dayjs setup
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
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

export { dayjs };

// Atoms
export { default as Text } from './atoms/Text';
export { default as Button } from './atoms/Button';
export { default as Input } from './atoms/Input';
export { default as Divider } from './atoms/Divider';
export { default as Avatar } from './atoms/Avatar';
export { default as Badge } from './atoms/Badge';
export { default as Card } from './atoms/Card';
export { default as ProgressBar } from './atoms/ProgressBar';

export { default as CheckBox } from './atoms/CheckBox';
export { default as RadioButton } from './atoms/RadioButton';
export { default as Switch } from './atoms/Switch';

export { default as AvatarGroup } from './molecules/AvatarGroup';
export { default as AvatarWithOverlay } from './molecules/AvatarOverlay';
// Calendar
export { default as MonthCalendar } from './molecules/calendars/MonthCalendar';
export { default as WeekCalendar } from './molecules/calendars/WeekCalendar';
export { default as SearchBar } from './molecules/SearchBar';

export {
  CalendarProvider,
  useCalendar,
} from './molecules/calendars/CalendarProvider';

export { default as Ticket } from './molecules/Ticket';
export { Dropdown } from './molecules/Dropdown';

export { FastUIKit } from './FastUIKit';
export { default as GoogleButton } from './molecules/GoogleButton';
export { default as AppleButton } from './molecules/AppleButton';
export { default as AppHeader } from './molecules/AppHeader';
export {
  default as AnimatedAppHeader,
  type AnimatedAppHeaderRef,
} from './molecules/AnimatedAppHeader';

export { LoadingScreen, LoadingWrapper } from './template/LoadingScreen';
