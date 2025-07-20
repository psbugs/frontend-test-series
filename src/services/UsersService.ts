import ApiService from "./ApiService";

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await ApiService.post('/users/login', credentials);
  return response.data;
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await ApiService.post('/users/register', userData);
  return response.data;
};