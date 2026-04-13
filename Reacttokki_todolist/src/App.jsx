import Router from "./router/router";
import { TaskProvider } from "./pages/Daily/context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <Router />
    </TaskProvider>
  );
}

export default App;
