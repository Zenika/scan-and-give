import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import isDate from 'date-fns/isDate'

export const fromSeconds = arg =>
  isDate(arg) ? arg : arg._seconds ? fromUnixTime(arg._seconds) : fromUnixTime(arg)

export const formatTimestamp = arg => {
  const date = fromSeconds(arg)
  return format(date, 'dd/MM/yy')
}
