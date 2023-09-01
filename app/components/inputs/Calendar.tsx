"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

type Props = {
  value: Range;
  disabledDates: Date[];
  onChangeDate: (range: RangeKeyDict) => void;
};

export default function Calendar({
  onChangeDate,
  disabledDates,
  value,
}: Props) {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChangeDate}
      direction="vertical"
      minDate={new Date()}
      showDateDisplay={false}
      disabledDates={disabledDates}
    />
  );
}
