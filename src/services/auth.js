export const ACCESS_TOKEN = "@airbnb-Token";
export const isAuthenticated = () => localStorage.getItem(ACCESS_TOKEN) !== null;
export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const login = token => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};