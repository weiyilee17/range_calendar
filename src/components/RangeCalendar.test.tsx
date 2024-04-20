import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import RangeCalendar from './RangeCalendar';
import { eachDayOfInterval, format } from 'date-fns';

describe('RangeCalendar current month only', () => {
  it('Should correctly render', () => {
    render(
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />,
    );

    expect(screen.getByText(/2022/)).toBeInTheDocument();
  });

  it('Should select range and cancel', async () => {
    userEvent.setup();
    render(
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />,
    );

    const startDate = new Date(2022, 6, 14);
    const endDate = new Date(2022, 6, 16);

    await userEvent.click(screen.getByLabelText(format(startDate, 'P')));
    await userEvent.click(screen.getByLabelText(format(endDate, 'P')));

    const daysInRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).toHaveClass(
        'bg-[#006edc]',
      );
    });

    await userEvent.click(
      screen.getByLabelText(format(new Date(2022, 6, 12), 'P')),
    );

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).not.toHaveClass(
        'bg-[#006edc]',
      );
    });
  });

  it('Should select same date and cancel', async () => {
    userEvent.setup();
    render(
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />,
    );

    const startDate = new Date(2022, 6, 14);

    await userEvent.click(screen.getByLabelText(format(startDate, 'P')));
    await userEvent.click(screen.getByLabelText(format(startDate, 'P')));

    const daysInRange = eachDayOfInterval({
      start: startDate,
      end: startDate,
    });

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).toHaveClass(
        'bg-[#006edc]',
      );
    });

    await userEvent.click(
      screen.getByLabelText(format(new Date(2022, 6, 12), 'P')),
    );

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).not.toHaveClass(
        'bg-[#006edc]',
      );
    });
  });

  it('Should show not allowed icon when hovering on non current month day', async () => {
    userEvent.setup();
    render(
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />,
    );

    const june27th = screen.getByLabelText(format(new Date(2022, 5, 27), 'P'));
    await userEvent.hover(june27th);

    expect(june27th).toHaveClass('cursor-not-allowed');
  });

  it('Should show current month', () => {
    render(
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />,
    );

    expect(screen.getByText(/2022年7月/)).toBeInTheDocument();
  });

  it('Should not switch to prev month', async () => {
    userEvent.setup();
    render(
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />,
    );

    expect(screen.getByText(/2022年7月/)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'prev-month',
      }),
    );

    expect(screen.getByText(/2022年7月/)).toBeInTheDocument();
  });
});

describe('RangeCalendar across months', () => {
  it('Should correctly render', () => {
    render(<RangeCalendar currentDate={new Date(2022, 6, 27)} />);

    expect(screen.getByText(/2022/)).toBeInTheDocument();
  });

  it('Should select range and cancel', async () => {
    userEvent.setup();
    render(<RangeCalendar currentDate={new Date(2022, 6, 27)} />);

    await userEvent.dblClick(
      screen.getByRole('button', {
        name: 'next-month',
      }),
    );

    const startDate = new Date(2022, 7, 29);
    const endDate = new Date(2022, 8, 0);

    await userEvent.click(screen.getByLabelText(format(startDate, 'P')));
    await userEvent.click(screen.getByLabelText(format(endDate, 'P')));

    const daysInRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).toHaveClass(
        'bg-[#006edc]',
      );
    });

    await userEvent.click(
      screen.getByLabelText(format(new Date(2022, 7, 28), 'P')),
    );

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).not.toHaveClass(
        'bg-[#006edc]',
      );
    });
  });

  it('Should select same date and cancel', async () => {
    userEvent.setup();
    render(<RangeCalendar currentDate={new Date(2022, 6, 27)} />);

    await userEvent.dblClick(
      screen.getByRole('button', {
        name: 'next-month',
      }),
    );

    const startDate = new Date(2022, 7, 29);

    await userEvent.click(screen.getByLabelText(format(startDate, 'P')));
    await userEvent.click(screen.getByLabelText(format(startDate, 'P')));

    const daysInRange = eachDayOfInterval({
      start: startDate,
      end: startDate,
    });

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).toHaveClass(
        'bg-[#006edc]',
      );
    });

    await userEvent.click(
      screen.getByLabelText(format(new Date(2022, 7, 28), 'P')),
    );

    daysInRange.forEach((day) => {
      expect(screen.getByLabelText(format(day, 'P'))).not.toHaveClass(
        'bg-[#006edc]',
      );
    });
  });

  it('Should show current month', () => {
    render(<RangeCalendar currentDate={new Date(2022, 6, 27)} />);

    expect(screen.getByText(/2022年7月/)).toBeInTheDocument();
  });

  it('Should switch to prev month', async () => {
    userEvent.setup();
    render(<RangeCalendar currentDate={new Date(2022, 6, 27)} />);

    expect(screen.getByText(/2022年7月/)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'prev-month',
      }),
    );

    expect(screen.getByText(/2022年6月/)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'next-month',
      }),
    );

    expect(screen.getByText(/2022年7月/)).toBeInTheDocument();
  });
});
