import TaskCard from "./TaskCard";

function CompletedTaskSection({ tasks, total }) {
  return (
    <section className="completed-section">
      <h2>Completed tasks</h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} type="completed" />
      ))}

      <div className="progress">
        Process: {tasks.length} / {total}
      </div>
    </section>
  );
}

export default CompletedTaskSection;