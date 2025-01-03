import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { TextField } from '@mui/material';

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  error,
  helperText
}) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      locale={es}
      dateFormat="dd/MM/yyyy"
      customInput={
        <TextField
          fullWidth
          label={label}
          error={error}
          helperText={helperText}
        />
      }
    />
  );
};
