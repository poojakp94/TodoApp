import { request } from '../utils/request'

export const addTask = ({ title, description }) => {
  return request('/add-task', { title, description }, 'POST');
};

export const getTasks = () => {
  return request('/tasks')
}

export const deleteTask = (id) => {
  return request(`/tasks/${id}`, undefined, 'DELETE')
}

//update is_completed field/property
export const updateTask = (id) => {
  return request(`/tasks/${id}`,undefined, 'PUT')
}