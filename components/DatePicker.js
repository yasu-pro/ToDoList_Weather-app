import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ReactDatePicker = ({onDateChange}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date)
    const formattedDate = format(date, "yyyy年MM月dd日")
    onDateChange(formattedDate)
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      isClearable
      placeholderText="I have been cleared!"
    />
  );
};

export default ReactDatePicker;
