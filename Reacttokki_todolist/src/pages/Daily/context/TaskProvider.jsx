import { useState, useMemo } from "react";
import { TaskContext } from "./TaskContext";

export function TaskProvider({ children }) {
  const [plannedTasks, setPlannedTasks] = useState([
    {
      id: 1,
      title: "Lecture recap",
      category: "Study",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 2,
      title: "30 min workout",
      category: "Health",
      startTime: "12:00",
      endTime: "12:30",
    },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 3,
      title: "Plan tomorrow",
      category: "Productivity",
      startTime: "23:30",
      endTime: "24:00",
    },
  ]);

  const addTask = (newTask) => {
    setPlannedTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (taskId) => {
    const targetTask = plannedTasks.find((task) => task.id === taskId);
    if (!targetTask) return;
    setPlannedTasks((prev) => prev.filter((task) => task.id !== taskId));
    setCompletedTasks((prev) => [...prev, targetTask]);
  };

  // 오늘의 달성률: completed / (planned + completed) * 100
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
        addTask,
        completeTask,
        todayPercent,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
