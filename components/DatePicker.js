import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({ isChangeDueDate, onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  if (isChangeDueDate === true) {
    const ChangeDueDateButton = forwardRef(({ value, onClick }, ref) => (
      <button className="ChangeDueDateButton" onClick={onClick} ref={ref}>
        期日変更
      </button>
    ));
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        customInput={<ChangeDueDateButton />}
      />
    );
  } else {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        inline
      />
    );
  }
};

export default ReactDatePicker;
