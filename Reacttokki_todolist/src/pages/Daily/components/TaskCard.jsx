const CATEGORY_COLORS = {
  Study:        { bg: "#e8e4f8", icon: "#b8aee8" },
  Health:       { bg: "#fde8f0", icon: "#f0a8c8" },
  Productivity: { bg: "#e4eef8", icon: "#a8c4e8" },
  Personal:     { bg: "#fdf0e4", icon: "#f0c8a8" },
  Work:         { bg: "#e4f8ee", icon: "#a8e0c4" },
};

const EXTRA_COLORS = [
  { bg: "#f8e4ee", icon: "#e8a8c8" },
  { bg: "#e4f8f4", icon: "#a8e0d4" },
  { bg: "#f4f8e4", icon: "#c8e0a8" },
  { bg: "#f8f0e4", icon: "#e0c8a8" },
  { bg: "#eae4f8", icon: "#c0b0e8" },
];

// 기본 카테고리에 없는 새 카테고리는 이름 기반으로 일관된 색상 배정
function getCategoryColor(category) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
  return EXTRA_COLORS[Math.abs(hash) % EXTRA_COLORS.length];
}

function TaskCard({ task, type = "planned", onComplete }) {
  const isCompleted = type === "completed";
  const colors = getCategoryColor(task.category);

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
