/**
 * This function returns true/false is the provided date is expired or not
 * @param date
 */
export const isDueDateValid = (date: string) =>
  new Date(date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
