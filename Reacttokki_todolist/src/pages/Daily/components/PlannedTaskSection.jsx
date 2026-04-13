import TaskCard from "./TaskCard";
import AddTaskButton from "./AddTaskButton";

function PlannedTaskSection({ tasks, onComplete, onAddClick }) {
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

      <AddTaskButton onClick={onAddClick} />
    </section>
  );
}

export default PlannedTaskSection;
