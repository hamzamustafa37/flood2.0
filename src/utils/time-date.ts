export const formatTo12Hour = (isoString: any) => {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for AM

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${formattedMinutes} ${period}`;
};

export const convertToMilliseconds = (timestamp: any) => {
  const { seconds, nanoseconds } = timestamp;
  return seconds * 1000 + nanoseconds / 1000000;
};
export const doIntervalsOverlap = (interval1: any, interval2: any) => {
  const start1 = convertToMilliseconds(interval1.start);
  const end1 = convertToMilliseconds(interval1.end);
  const start2 = convertToMilliseconds(interval2.start);
  const end2 = convertToMilliseconds(interval2.end);

  // Check if the intervals overlap
  return start1 < end2 && end1 > start2;
};
