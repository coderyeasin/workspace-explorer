export const todayDate = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
}).format(new Date());
