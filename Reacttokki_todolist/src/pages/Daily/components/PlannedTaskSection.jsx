import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";

function PlannedTaskSection({ tasks, onComplete }) {
  const navigate = useNavigate();

  return (
    <section className="planned-section">
      <h2>Planned tasks</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          type="planned"
          onComplete={onComplete}
        />
      ))}

      <button onClick={() => navigate("/daily/add")}>
        + Add task
      </button>
    </section>
  );
}

export default PlannedTaskSection;