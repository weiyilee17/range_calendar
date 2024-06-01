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
  SingleDateSelection,
} from '../lib/common.types';
import { cn } from '../lib/utils';

type CalendarCell = CurrentMonthOnly &
  Today &
  Button & {
    targetDate: Date;
    rangeStart: OptionalDate;
    rangeEnd: OptionalDate;
    singleSelectedDates: Date[];
  } & SingleDateSelection;

function CalendarCell({
  currentMonthOnly,
  today,
  targetDate,
  rangeStart,
  rangeEnd,
  onButtonClick,
  singleDateSelection,
  multipleDates,
  singleSelectedDates,
}: CalendarCell) {
  const singleDateSelectBlueClassCondition = (singleDay: Date) => {
    if (!multipleDates) {
      return singleSelectedDates.length
        ? isSameDay(singleDay, singleSelectedDates[0])
        : false;
    }

    return singleSelectedDates.some((date) => isSameDay(date, singleDay));
  };

  const rangeBlueClassCondition = (singleDay: Date) => {
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
          'text-white': singleDateSelection
            ? singleDateSelectBlueClassCondition(targetDate)
            : rangeBlueClassCondition(targetDate),
          'bg-[#006edc]': singleDateSelection
            ? singleDateSelectBlueClassCondition(targetDate)
            : rangeBlueClassCondition(targetDate),
          'bg-[#ffff76]': isToday(targetDate),
        },
      )}
      onClick={() => onButtonClick(targetDate)}
      aria-label={format(targetDate, 'P')}
    >
      {format(targetDate, 'do', {
        locale: zhTW,
      })}
    </div>
  );
}

export default CalendarCell;
