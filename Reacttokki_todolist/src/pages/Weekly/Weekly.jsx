//import React, { useState } from "react";
import "./Weekly.css";
import bg from "../../assets/background.png";
import TopTabs from "../../components/TopTabs";
import GlassPanel from "../../components/GlassPanel";
import { useTask } from "../Daily/context/useTask";

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

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// "HH:MM" → 시간(소수) 변환
function timeToHour(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h + m / 60;
}

export default function Weekly() {
  const { plannedTasks } = useTask();

  // 오늘(월요일 기준 0~6) — 이번 주 오늘 컬럼에만 task 표시
  const todayDayIndex = (new Date().getDay() + 6) % 7; // 0=Mon … 6=Sun

  return (
    <div className="planner" style={{ backgroundImage: `url(${bg})` }}>
      <div className="planner-main-layout">
        <div className="tabs-container">
          <TopTabs />
        </div>

        <GlassPanel>
          <div className="planner-container">
            {/* 시간 축 */}
            <div className="time-bar">
              <div className="time-header" />
              <div className="time-body">
                {hours.map((h) => (
                  <div key={h} className="time-slot">
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>
            </div>

            {/* 요일 그리드 */}
            <div className="week-grid">
              {days.map((day, dayIdx) => {
                const isToday = dayIdx === todayDayIndex;
                const dayTasks = isToday ? plannedTasks : [];

                return (
                  <div
                    key={day}
                    className={`day-column ${dayIdx < 5 ? "weekday" : "weekend"}`}
                  >
                    <div className={`day-header ${day.toLowerCase()}`}>{day}</div>
                    <div className="day-body">
                      {hours.map((hour) => (
                        <div key={hour} className="cell">
                          {dayTasks
                            .filter((task) => {
                              const start = timeToHour(task.startTime);
                              return Math.floor(start) === hour;
                            })
                            .map((task) => {
                              const start = timeToHour(task.startTime);
                              const end = timeToHour(task.endTime);
                              const duration = Math.max(end - start, 0.25);
                              return (
                                <div
                                  key={task.id}
                                  className="weekly-task-block"
                                  style={{
                                    backgroundColor: getCategoryColor(task.category),
                                    top: `${(start - hour) * 100}%`,
                                    height: `${duration * 100}%`,
                                  }}
                                >
                                  <span className="weekly-task-title">{task.title}</span>
                                  <span className="weekly-task-time">
                                    {task.startTime}–{task.endTime}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
