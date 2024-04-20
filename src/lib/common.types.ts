export type CurrentMonthOnly = {
  currentMonthOnly?: boolean;
};

export type Today = {
  today: Date;
};

export type CurrentDate = {
  currentDate?: Date;
};

export type Button = {
  onButtonClick: (day: Date) => void;
};

export type OptionalDate = Date | null;
