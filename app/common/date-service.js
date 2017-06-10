import moment from 'moment';

const DATE_FORMAT = 'Do MMMM YYYY, h:mm a';
const DATE_EXPORT_FORMAT = 'DD-MM-YYYY-hhmm';

export function getCurrentDate() {
  return moment().format(DATE_FORMAT);
}

export function parseDateToString(date) {
  return moment(date, DATE_FORMAT).format(DATE_FORMAT);
}

export function getDateForExport(date) {
  return moment(date, DATE_FORMAT).format(DATE_EXPORT_FORMAT);
}

export function isGreaterThan(firsDate, secondDate) {
  const parsedFirstDate = moment(firsDate, DATE_FORMAT);
  const parsedSecondDate = moment(secondDate, DATE_FORMAT);

  return parsedFirstDate.diff(parsedSecondDate) > 0;
}
