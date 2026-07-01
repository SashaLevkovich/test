export interface DateItem {
  id: string;
  weekday: string;
  day: string;
  fullText: string;
}

// export function getUpcomingDays(daysCount = 10): DateItem[] {
//   const dates: DateItem[] = [];
//   const today = new Date();

//   for (let i = 1; i <= daysCount; i++) {
//     const d = new Date(today);
//     d.setDate(today.getDate() + i);

//     dates.push({
//       id: d.toISOString().split("T")[0],
//       weekday: new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(d),
//       day: new Intl.DateTimeFormat("ru-RU", { day: "numeric" }).format(d),
//       fullText: new Intl.DateTimeFormat("ru-RU", {
//         day: "numeric",
//         month: "long",
//       }).format(d),
//     });
//   }

//   return dates;
// }

// ЧАСТНЫЙ СЛУЧАЙ
export function getUpcomingDays(daysCount = 10): DateItem[] {
  const dates: DateItem[] = [];
  const today = new Date();

  const currentDay = today.getDay();
  const targetDay = 2;

  const daysUntilNextTuesday = (targetDay - currentDay + 7) % 7 || 7;

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);

    d.setDate(today.getDate() + daysUntilNextTuesday + i);

    dates.push({
      id: d.toISOString().split("T")[0],
      weekday: new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(d),
      day: new Intl.DateTimeFormat("ru-RU", { day: "numeric" }).format(d),
      fullText: new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
      }).format(d),
    });
  }

  return dates;
}
