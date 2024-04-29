import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";

export const FetchUsers = async () => {
  try {
    const response = await axios.get("/user/fetchAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
