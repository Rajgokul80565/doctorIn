import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function BasicDateTimePicker() {

    // // Calculate the start date of the current week (Monday)
    // const startOfWeek = dayjs().startOf('week').add(1, 'day'); // Add 1 day to start from Monday

    // // Calculate the end date of the current week (Friday)
    // const endOfWeek = dayjs().endOf('week').subtract(2, 'days'); 
    const currentDate = dayjs();
    const nextWeek = currentDate.add(7, 'day');
  
    // Function to check if a given date is a weekend (Saturday or Sunday)
    const isWeekend = date => {
      const day = date.day();
      return day === 0 || day === 6;
    };

    const minTime = dayjs().set('hour', 10).set('minute', 0);
    const maxTime = dayjs().set('hour', 15).set('minute', 0);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker 
        label="Basic date time picker"
        minDate={currentDate} // Minimum selectable date is the current date
        maxDate={nextWeek}
        disablePast
       
        shouldDisableDate={date => date.isBefore(currentDate, 'day') || isWeekend(date)}
        minTime={minTime} // Restrict time selection to 10 am
        maxTime={maxTime} // Restrict time selection to 3 pm
         />
      </DemoContainer>
    </LocalizationProvider>
  );
}


