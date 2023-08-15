import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/DatePicker.module.css';

const ReactDatePicker = ({ selected, onDateChange }) => {

  const handleDateChange = (date) => {
    onDateChange(date);
  };

  return (
    <DatePicker
      showIcon
      dateFormat="yyyy年MM月dd日"
      selected={selected}
      onChange={(date) => handleDateChange(date)}
      className={styles["custom-datepicker-input"]}
    />
  );
};

export default ReactDatePicker;
