import { Routes, Route } from "react-router-dom";
import DailyPage from "./DailyPage";
import DailyAddPage from "./DailyAddPage";

export default function DailyRoutes() {
  return (
    <Routes>
      <Route index element={<DailyPage />} />
      <Route path="add" element={<DailyAddPage />} />
    </Routes>
  );
}
