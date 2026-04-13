import { useNavigate } from "react-router-dom";
import { useTask } from "./context/useTask";
import TopTabs from "../../components/TopTabs";
import backgroundImg from "../../assets/background.png";

export default function DailyAddPage() {
  const navigate = useNavigate();
  const { addTask } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newTask = {
      id: Date.now(),
      title: formData.get("title"),
      category: formData.get("category"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
    };

    addTask(newTask);

    navigate("/daily");
  };

  return (
    <div
      className="daily-page"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TopTabs />

      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add Task</h2>

        <input name="title" placeholder="Task name" required />

        <select name="category">
          <option>Study</option>
          <option>Health</option>
          <option>Productivity</option>
        </select>

        <input type="time" name="startTime" required />
        <input type="time" name="endTime" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}