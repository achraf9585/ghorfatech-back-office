import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/login", {
      data: {
        email,
        password,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
