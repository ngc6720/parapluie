export const getLocaleTimezone = (): string =>
  new Date()
    .toString()
    .split(" ")
    .find((str) => str.startsWith("GMT"))
    ?.toString() || "";

export const dateToString = (d: Date) =>
  d.toLocaleDateString("en-GB").split("/").reverse().join("-");

export const toPaddedDateRange = ([d1, d2]: [Date, Date]) => {
  d1.setDate(d1.getDate() - 1);
  d2.setDate(d2.getDate() + 1);
  return [dateToString(d1), dateToString(d2)];
};

export const toDateStringWithOffset = (
  dateString: string,
  offsetHours: number
): string => {
  const d = new Date(dateString);
  d.setHours(d.getHours() - offsetHours);
  return d.toString().split(" ")[4].slice(0, 5);
};
