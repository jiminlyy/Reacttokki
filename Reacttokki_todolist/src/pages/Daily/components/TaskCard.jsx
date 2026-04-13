function TaskCard({ task, type = "planned", onComplete }) {
  const isCompleted = type === "completed";

  const handleClick = () => {
    if (!isCompleted && onComplete) {
      onComplete(task.id);
    }
  };

  return (
    <div className={`task-card task-card--${type}`}>
      <button
        className="task-card__check"
        onClick={handleClick}
        disabled={isCompleted}
      >
        {isCompleted ? "✓" : ""}
      </button>

      <div className="task-card__content">
        <p className="task-card__title">{task.title}</p>
        <p className="task-card__category">{task.category}</p>
        <p className="task-card__time">
          {task.startTime} - {task.endTime}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;