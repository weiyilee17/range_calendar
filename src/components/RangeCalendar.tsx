import {
  addDays,
  subDays,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  isAfter,
  subMonths,
  addMonths,
  isSameDay,
} from 'date-fns';
import { useState } from 'react';

import Header from './Header';
import CalendarCell from './CalendarCell';
import type {
  CurrentDate,
  CurrentMonthOnly,
  OptionalDate,
} from '../lib/common.types';

type RangeCalendar = CurrentDate & CurrentMonthOnly;

function RangeCalendar({
  currentMonthOnly = false,
  currentDate = new Date(),
}: RangeCalendar) {
  const [today, setToday] = useState(currentDate);

  const [rangeStart, setRangeStart] = useState<OptionalDate>(null);

  const [rangeEnd, setRangeEnd] = useState<OptionalDate>(null);

  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);

  const daysInMonth = eachDayOfInterval({
    start: subDays(firstDayOfMonth, getDay(firstDayOfMonth)),
    end: addDays(lastDayOfMonth, 6 - getDay(lastDayOfMonth)),
  });

  const handlePrevMonthClick = () => {
    setToday(subMonths(today, 1));
  };
  const handleNextMonthClick = () => {
    setToday(addMonths(today, 1));
  };

  const handleDateClick = (singleDay: Date) => {
    if (!rangeStart) {
      setRangeStart(singleDay);
      return;
    }

    if (isAfter(singleDay, rangeStart) || isSameDay(singleDay, rangeStart)) {
      setRangeEnd(singleDay);
    } else {
      setRangeStart(null);
      setRangeEnd(null);
    }
  };

  return (
    <div className="flex h-[240px] w-[350px] flex-col text-base">
      <Header
        today={today}
        currentMonthOnly={currentMonthOnly}
        onPrevButtonClick={handlePrevMonthClick}
        onNextButtonClick={handleNextMonthClick}
      />

      <div className="grid h-full grid-cols-7">
        {daysInMonth.map((day, index) => (
          <CalendarCell
            currentMonthOnly={currentMonthOnly}
            today={today}
            targetDate={day}
            key={index}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onButtonClick={handleDateClick}
          />
        ))}
      </div>
    </div>
  );
}

export default RangeCalendar;
