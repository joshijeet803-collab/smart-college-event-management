const API = "https:smart-college-backend-3fnx.onrender.com/api";

export const getEvents = async () => {
  const res = await fetch(`${API}/events`);
  return res.json();
};

export const createEvent = async (data) => {
  const res = await fetch(`${API}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const registerEvent = async (data) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getRegistrations = async () => {
  const res = await fetch(`${API}/registrations`);
  return res.json();
};