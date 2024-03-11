import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const styles = {
  dateTimePickerContainer: {
    width: '200px',

    // Adjust width as needed
// Adjust height as needed
  }
};

export default function BasicDateTimePicker({setTime}) {

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
    
    const disableDates = date => date.isAfter(nextWeek);

    const handleDateChange = date => {
      const jsDate = date.toDate();
      if (setTime) setTime(jsDate);
    };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <div style={styles.dateTimePickerContainer} >

   
        <DatePicker
     
        label="pick your date"
        onChange={handleDateChange}
        minDate={currentDate} // Minimum selectable date is the current date
        maxDate={nextWeek}
        formatDensity="spacious"
        disablePast
        InputLabelProps={{ style: { fontSize: '16px' } }} // Adjust the font size of the label
        InputProps={{ style: { fontSize: '14px' } }} 
      //   shouldDisableDate={date => isWeekend(date) || disableDates(date)}
      //     minTime={minTime}
      //     maxTime={maxTime}
      //   // shouldDisableDate={date => date.isBefore(currentDate, 'day') || isWeekend(date)}
      //  // Restrict time selection to 3 pm
      //   InputLabelProps={{ style: { fontSize: '12px' } }}
         />
              </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}


