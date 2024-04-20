import {
  format,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
} from 'date-fns';
import { zhTW } from 'date-fns/locale';

import type {
  Today,
  CurrentMonthOnly,
  OptionalDate,
  Button,
} from '../lib/common.types';
import { cn } from '../lib/utils';

type CalendarCell = CurrentMonthOnly &
  Today &
  Button & {
    targetDate: Date;
    rangeStart: OptionalDate;
    rangeEnd: OptionalDate;
  };

function CalendarCell({
  currentMonthOnly,
  today,
  targetDate,
  rangeStart,
  rangeEnd,
  onButtonClick,
}: CalendarCell) {
  const blueClassCondition = (singleDay: Date) => {
    if (!rangeStart) {
      return false;
    }

    if (!rangeEnd) {
      return isSameDay(singleDay, rangeStart);
    }

    return isWithinInterval(singleDay, {
      start: rangeStart,
      end: rangeEnd,
    });
  };
  return (
    <div
      className={cn(
        'h-[36px] w-[50px] cursor-pointer bg-white text-center leading-9 hover:bg-[#e6e6e6]',
        {
          'cursor-not-allowed':
            currentMonthOnly && !isSameMonth(targetDate, today),
          'text-[#757575]': !isSameMonth(targetDate, today),
          'text-white': blueClassCondition(targetDate),
          'bg-[#006edc]': blueClassCondition(targetDate),
          'bg-[#ffff76]': isToday(targetDate),
        },
      )}
      onClick={() => onButtonClick(targetDate)}
    >
      {format(targetDate, 'do', {
        locale: zhTW,
      })}
    </div>
  );
}

export default CalendarCell;
