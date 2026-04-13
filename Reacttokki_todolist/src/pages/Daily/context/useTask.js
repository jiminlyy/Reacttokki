import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useTask() {
  return useContext(TaskContext);
}