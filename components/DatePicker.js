import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    if (!date) {
      onDateChange("");
    } else {
      onDateChange(date);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      isClearable
      placeholderText="期日を入力してください。"
    />
  );
};

export default ReactDatePicker;
