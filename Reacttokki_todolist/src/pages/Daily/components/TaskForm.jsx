import { useState } from "react";
import CategorySelect from "./CategorySelect";
import TimeField from "./TimeField";
import { createTask } from "../utils/taskUtils";

function TaskForm({ onSubmit, onCancel }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [startHour, setStartHour] = useState(0);
  const [startMin, setStartMin] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMin, setEndMin] = useState(0);

  const handleSubmit = () => {
    if (!title.trim() || !category) return;
    const task = createTask({ title, category, startHour, startMin, endHour, endMin });
    onSubmit(task);
  };

  return (
    <div className="task-form">
      <CategorySelect value={category} onChange={setCategory} />

      <div className="form-field">
        <label className="form-label">Select time</label>
        <div className="time-row">
          <TimeField
            label="Start time"
            hour={startHour}
            min={startMin}
            onHourChange={setStartHour}
            onMinChange={setStartMin}
          />
          <TimeField
            label="End time"
            hour={endHour}
            min={endMin}
            onHourChange={setEndHour}
            onMinChange={setEndMin}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Please enter a task name</label>
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=""
        />
      </div>

      <div className="form-actions">
        {onCancel && (
          <button className="form-btn form-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="form-btn form-btn--submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
