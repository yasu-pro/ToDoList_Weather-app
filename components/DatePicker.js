import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({ selected, onDateChange }) => {

  return (
    <DatePicker
      showIcon
      dateFormat="yyyy年MM月dd日"
      selected={selected}
      onChange={(date) => onDateChange(date)}
    />
  );
};

export default ReactDatePicker;
