import { PropsWithChildren } from 'react';

import type { Button, CurrentMonthOnly, Today } from '../lib/common.types';
import { cn } from '../lib/utils';

type CalendarButton = PropsWithChildren &
  CurrentMonthOnly &
  Button &
  Today & {
    label: string;
  };

function CalendarButton({
  today,
  children,
  currentMonthOnly,
  onButtonClick,
  label,
}: CalendarButton) {
  return (
    <button
      disabled={currentMonthOnly}
      className={cn(
        'flex size-[44px] cursor-pointer items-center justify-center bg-white hover:bg-[#e6e6e6]',
        {
          'cursor-not-allowed': currentMonthOnly,
        },
      )}
      onClick={() => onButtonClick(today)}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export default CalendarButton;
