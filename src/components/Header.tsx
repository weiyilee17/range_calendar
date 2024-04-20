import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonth, getYear } from 'date-fns';

import type { Button, Today, CurrentMonthOnly } from '../lib/common.types';
import CalendarButton from './CalendarButton';

type Header = CurrentMonthOnly &
  Today & {
    onPrevButtonClick: Button['onButtonClick'];
    onNextButtonClick: Button['onButtonClick'];
  };

function Header({
  currentMonthOnly,
  today,
  onPrevButtonClick,
  onNextButtonClick,
}: Header) {
  return (
    <div className="mb-4 flex h-[44px] items-center justify-between">
      <CalendarButton
        today={today}
        currentMonthOnly={currentMonthOnly}
        onButtonClick={onPrevButtonClick}
        label="prev-month"
      >
        <ChevronLeft />
      </CalendarButton>

      <h2 className="text-center">
        {`${getYear(today)}年${getMonth(today) + 1}月`}
      </h2>

      <CalendarButton
        today={today}
        currentMonthOnly={currentMonthOnly}
        onButtonClick={onNextButtonClick}
        label="next-month"
      >
        <ChevronRight />
      </CalendarButton>
    </div>
  );
}

export default Header;
