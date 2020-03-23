const dateTimeHelper = (n: number) => (n < 10 ? `0${n}` : n.toString());

type dateType = "date" | "time" | "timeStr";

export default function formatDateTime(localDatetime: string, type: dateType = "date", joinFlag = "-") {
  const d = new Date(localDatetime);

  switch (type) {
    case "date":
      return [d.getFullYear(), dateTimeHelper(d.getMonth() + 1), dateTimeHelper(d.getDate())].join(joinFlag);
    case "time":
      return `${dateTimeHelper(d.getHours())}:${dateTimeHelper(d.getMinutes())}`;
    case "timeStr":
      return `${dateTimeHelper(d.getHours())}시 ${dateTimeHelper(d.getMinutes())}분`;
    default:
      return [d.getFullYear(), dateTimeHelper(d.getMonth() + 1), dateTimeHelper(d.getDate())].join(joinFlag);
  }
}
