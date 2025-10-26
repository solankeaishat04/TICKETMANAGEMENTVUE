const SESSION_KEY = "ticketapp_session";

export function setSession(payload) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return !!getSession();
}
