import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({ selected, onDateChange }) => {

  const handleDateChange = (date) => {
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={(date) => handleDateChange(date)}
    />
  );
};

export default ReactDatePicker;
