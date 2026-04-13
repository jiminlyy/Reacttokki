const CATEGORY_COLORS = {
  Study:        { bg: "#e8e4f8", icon: "#b8aee8" },
  Health:       { bg: "#fde8f0", icon: "#f0a8c8" },
  Productivity: { bg: "#e4eef8", icon: "#a8c4e8" },
  Personal:     { bg: "#fdf0e4", icon: "#f0c8a8" },
  Work:         { bg: "#e4f8ee", icon: "#a8e0c4" },
};

const DEFAULT_COLOR = { bg: "#f0eef8", icon: "#c8c0e8" };

function TaskCard({ task, type = "planned", onComplete }) {
  const isCompleted = type === "completed";
  const colors = CATEGORY_COLORS[task.category] || DEFAULT_COLOR;

  const handleClick = () => {
    if (!isCompleted && onComplete) {
      onComplete(task.id);
    }
  };

  return (
    <div
      className={`task-card task-card--${type}`}
      style={{ backgroundColor: colors.bg }}
    >
      <div
        className="task-card__icon"
        style={{ backgroundColor: colors.icon }}
      >
        {isCompleted && <span className="task-card__check-mark">✓</span>}
      </div>

      <div className="task-card__content">
        <p className="task-card__title">{task.title}</p>
        <p className="task-card__category">{task.category}</p>
        <p className="task-card__time">
          {task.startTime} - {task.endTime}
        </p>
      </div>

      {!isCompleted && (
        <button className="task-card__complete-btn" onClick={handleClick}>
          ›
        </button>
      )}
    </div>
  );
}

export default TaskCard;
