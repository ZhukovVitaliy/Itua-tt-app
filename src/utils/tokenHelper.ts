export const saveTokens = (token: string, refreshToken: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh_token", refreshToken);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const removeTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
};
