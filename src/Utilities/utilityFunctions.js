export const convertDate = (timeStamp) =>
  `${new Date(timeStamp).toLocaleDateString().replace(/\./g, "/")} ${new Date(
    timeStamp
  )
    .toLocaleTimeString()
    .replace(/\./g, ":")}`;

export function convertDateWithOutTimestamp(unixTimestamp) {
  const d = new Date(unixTimestamp);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
