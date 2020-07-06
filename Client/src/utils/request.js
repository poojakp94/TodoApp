import { BASE_URL } from "./config";

export const request = (route, body, method = "GET") => {
  return fetch(`${BASE_URL}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};
