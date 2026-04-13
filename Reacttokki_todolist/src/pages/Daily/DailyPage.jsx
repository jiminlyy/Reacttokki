import { useState } from "react";
import "./Daily.css";
import TopTabs from "../../components/TopTabs";
import GlassPanel from "../../components/GlassPanel";
import backgroundImg from "../../assets/background.png";
import PlannedTaskSection from "./components/PlannedTaskSection";
import CompletedTaskSection from "./components/CompletedTaskSection";
import TaskForm from "./components/TaskForm";
import { useTask } from "./context/useTask";

export default function DailyPage() {
  const { plannedTasks, completedTasks, completeTask, addTask } = useTask();
  const [showForm, setShowForm] = useState(false);

  const totalCount = plannedTasks.length + completedTasks.length;

  const handleAddSubmit = (newTask) => {
    addTask(newTask);
    setShowForm(false);
  };

  return (
    <div
      className="daily-page"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <TopTabs />

      <GlassPanel className="daily-panel">
        <div className="daily-columns">
          <PlannedTaskSection
            tasks={plannedTasks}
            onComplete={completeTask}
            onAddClick={() => setShowForm(true)}
          />

          {showForm ? (
            <TaskForm
              onSubmit={handleAddSubmit}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <CompletedTaskSection
              tasks={completedTasks}
              totalCount={totalCount}
            />
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
