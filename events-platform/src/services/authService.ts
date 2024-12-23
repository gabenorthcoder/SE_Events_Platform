import axios from "axios";

const API_URL = "http://localhost:3000";

export const authService = {
  login: async (email: string, password: string): Promise<string> => {
    console.log(email, password);
    const response = await axios.post(`${API_URL}/super-admin/login`, {
      email,
      password,
    });
    console.log(response);
    return response.data.token; // Assuming backend returns { token }
  },
};
