import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import format from 'date-fns/format'
import parse from 'date-fns/parse'

import 'react-day-picker/lib/style.css'

import './DatePicker.scss'

const DatePicker = ({ value, onDayChange, disabled }) => (
  <div className="date-picker">
    <label className="label">Date of the event</label>
    <DayPickerInput
      format="dd/MM/yyyy"
      formatDate={(date, f) => format(date, f)}
      parseDate={(date, f) => parse(date, f, new Date())}
      dayPickerProps={{
        firstDayOfWeek: 1
      }}
      placeholder="dd/mm/yyyy"
      value={value}
      onDayChange={onDayChange}
      inputProps={{ disabled }}
    />
  </div>
)

export default DatePicker
