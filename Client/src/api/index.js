import { request } from "../utils/request";

export const addTask = ({ title, description }) => {
  return request("/add-task", { title, description }, "POST");
};

export const getTasks = ({page, perPage} = {}) => {
  let url = '/tasks';
  const query = []
  if(page !== undefined){
    query.push(`page=${page}`)
  }
  if (perPage !== undefined){
    query.push(`perPage=${perPage}`)
  }
  if(query.length > 0){
    url = `${url}?${query.join('&')}`
  }
  return request(url);
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
