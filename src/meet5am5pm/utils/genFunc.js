export const dateWithTime = (now) => {
  const ampm = now.getHours() >= 12 ? " PM" : " AM";
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const time = now.getHours() + " : " + minutes + ampm;
  const date = now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear();
  return `${date}  ${time}`;
};

export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
