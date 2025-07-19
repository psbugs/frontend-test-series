import ApiService from "./ApiService";

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await ApiService.post('/users/login', credentials);
  return response.data;
};
