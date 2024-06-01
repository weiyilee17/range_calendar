export type CurrentMonthOnly = {
  currentMonthOnly?: boolean;
};

export type Today = {
  today: Date;
};

export type CurrentDate = {
  currentDate?: Date;
};

export type SingleDateSelection = {
  singleDateSelection: boolean;
  multipleDates: boolean;
};

export type Button = {
  onButtonClick: (day: Date) => void;
};

export type OptionalDate = Date | null;
