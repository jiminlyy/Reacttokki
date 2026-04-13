import { Routes, Route } from "react-router-dom";
import DailyPage from "./DailyPage";
import DailyAddPage from "./DailyAddPage";
import { TaskProvider } from "./context/TaskProvider";

export default function DailyRoutes() {
  return (
    <TaskProvider>
      <Routes>
        <Route index element={<DailyPage />} />
        <Route path="add" element={<DailyAddPage />} />
      </Routes>
    </TaskProvider>
  );
}