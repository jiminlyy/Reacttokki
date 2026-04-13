import TaskCard from "./TaskCard";

function CompletedTaskSection({ tasks, totalCount }) {
  return (
    <section className="completed-section">
      <h2>Completed tasks</h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} type="completed" />
      ))}

      <p className="progress-text">Process: {tasks.length} / {totalCount}</p>
    </section>
  );
}

export default CompletedTaskSection;
