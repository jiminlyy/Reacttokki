function AddTaskButton({ onClick }) {
  return (
    <button className="add-task-btn" onClick={onClick}>
      + add task
    </button>
  );
}

export default AddTaskButton;
