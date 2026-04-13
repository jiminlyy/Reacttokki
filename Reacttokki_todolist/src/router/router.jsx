import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monthly from "../pages/Monthly/Monthly";
import Weekly from "../pages/Weekly/Weekly";
import DailyRoutes from "../pages/Daily/DailyRoutes";
import Process from "../pages/Process/Process";

export default function Router() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Monthly />} />
            <Route path="/weekly" element={<Weekly />} />
            <Route path="/daily" element={<DailyRoutes />} />
            <Route path="/process" element={<Process />} />
          </Routes>
        </BrowserRouter>
    )
}