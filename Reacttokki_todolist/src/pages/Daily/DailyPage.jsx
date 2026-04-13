import TopTabs from "../../components/TopTabs";
import GlassPanel from "../../components/GlassPanel";
import backgroundImg from "../../assets/background.png";
import PlannedTaskSection from "./components/PlannedTaskSection";
import CompletedTaskSection from "./components/CompletedTaskSection";
import { useTask } from "./context/useTask";

export default function DailyPage() {
  const { plannedTasks, completedTasks, completeTask } = useTask();

  const totalCount = plannedTasks.length + completedTasks.length;

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
        <PlannedTaskSection
          tasks={plannedTasks}
          onComplete={completeTask}
        />

        <CompletedTaskSection
          tasks={completedTasks}
          totalCount={totalCount}
        />
      </GlassPanel>
    </div>
  );
}