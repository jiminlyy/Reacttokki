import TopTabs from "../../components/TopTabs";
import GlassPanel from "../../components/GlassPanel";
import backgroundImg from "../../assets/background.png";
import { useTask } from "../Daily/context/useTask";
import "./Monthly.css";

const CATEGORY_COLORS = {
  Study:        "#b8aee8",
  Health:       "#f0a8c8",
  Productivity: "#a8c4e8",
  Personal:     "#f0c8a8",
  Work:         "#a8e0c4",
};
const EXTRA_COLORS = ["#e8a8c8", "#a8e0d4", "#c8e0a8", "#e0c8a8", "#c0b0e8"];
function getCategoryColor(category) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
  return EXTRA_COLORS[Math.abs(hash) % EXTRA_COLORS.length];
}

const weekDays = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];

const calendarRows = [
  ["", "", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11", "12"],
  ["13", "14", "15", "16", "17", "18", "19"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "", "", ""],
];

const TODAY = new Date().getDate(); // 오늘 날짜 (13)

export default function Monthly() {
  const { plannedTasks } = useTask();

  return (
    <div
      className="monthly-page"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <TopTabs />

      <GlassPanel className="monthly-panel">
        <h1 className="monthly-title">April</h1>

        <div className="calendar">
          <div className="calendar__header">
            {weekDays.map((day) => (
              <div
                key={day}
                className={`calendar__header-cell ${
                  day === "Sat"
                    ? "calendar__header-cell--sat"
                    : day === "Sun"
                    ? "calendar__header-cell--sun"
                    : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="calendar__body">
          {calendarRows.flat().map((date, index) => {
            const columnIndex = index % 7;
            const isSat = columnIndex === 5;
            const isSun = columnIndex === 6;
            const dateNum = date ? Number(date) : null;
            const isToday = dateNum === TODAY;

            return (
              <div key={index} className={`calendar__cell ${isToday ? "calendar__cell--today" : ""}`}>
                {date && (
                  <span
                    className={`calendar__date ${
                      isSat
                        ? "calendar__date--sat"
                        : isSun
                        ? "calendar__date--sun"
                        : ""
                    }`}
                  >
                    {date}
                  </span>
                )}
                {isToday && (
                  <div className="calendar__tasks">
                    {plannedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="calendar__task-chip"
                        style={{ backgroundColor: getCategoryColor(task.category) }}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
}
