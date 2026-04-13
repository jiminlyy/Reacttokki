import { useState, useMemo } from "react";
import { TaskContext } from "./TaskContext";

const DEFAULT_CATEGORIES = ["Study", "Health", "Productivity", "Personal", "Work"];

export function TaskProvider({ children }) {
  const [plannedTasks, setPlannedTasks] = useState([
    { id: 1, title: "Lecture recap", category: "Study", startTime: "10:00", endTime: "11:00" },
    { id: 2, title: "30 min workout", category: "Health", startTime: "12:00", endTime: "12:30" },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { id: 3, title: "Plan tomorrow", category: "Productivity", startTime: "23:30", endTime: "24:00" },
  ]);

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const addCategory = (name) => {
    const trimmed = name.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories((prev) => [...prev, trimmed]);
  };

  const addTask = (newTask) => {
    setPlannedTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (taskId) => {
    const targetTask = plannedTasks.find((task) => task.id === taskId);
    if (!targetTask) return;
    setPlannedTasks((prev) => prev.filter((task) => task.id !== taskId));
    setCompletedTasks((prev) => [...prev, targetTask]);
  };

  const todayPercent = useMemo(() => {
    const total = plannedTasks.length + completedTasks.length;
    if (total === 0) return 0;
    return Math.round((completedTasks.length / total) * 100);
  }, [plannedTasks, completedTasks]);

  return (
    <TaskContext.Provider
      value={{
        plannedTasks,
        completedTasks,
        categories,
        addCategory,
        addTask,
        completeTask,
        todayPercent,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
