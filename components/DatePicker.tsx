import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

interface DatePickerProps {
  selected: Date;
  onDateChange: (date: Date | null) => void;
}

const ReactDatePicker: React.FC<DatePickerProps> = ({ selected, onDateChange }) => {

  return (
    <DatePicker
      locale={ja}
      showIcon
      dateFormat="yyyy年MM月dd日"
      selected={selected}
      onChange={(date) => onDateChange(date)}
    />
  );
};

export default ReactDatePicker;
