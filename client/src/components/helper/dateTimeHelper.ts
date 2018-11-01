import moment from 'moment';

export function toStandardFormat(dateTime: Date) {
  const format = 'DD.MM.YYYY hh:mm A';
  return moment(dateTime).format(format);
}
