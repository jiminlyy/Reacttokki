export function createTask({ title, category, startHour, startMin, endHour, endMin }) {
  const pad = (v) => String(v).padStart(2, "0");
  return {
    id: Date.now(),
    title: title.trim(),
    category,
    startTime: `${pad(startHour)}:${pad(startMin)}`,
    endTime: `${pad(endHour)}:${pad(endMin)}`,
  };
}
