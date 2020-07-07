import { request } from "../utils/request";

export const addTask = ({ title, description }) => {
  return request("/add-task", { title, description }, "POST");
};

export const getTasks = () => {
  return request("/tasks");
};

export const deleteTask = (id) => {
  return request(`/tasks/${id}`, undefined, "DELETE");
};

//update is_completed field/property
export const toggleComplete = (id) => {
  return request(`/toggle-complete/${id}`, undefined, "PUT");
};

// update task
export const updateTask = ({id, title, description}) => {
  return request(`/update-tasks/${id}`, { id, title, description }, "PUT");
};
