import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";

export const FetchPersonCapacity = async () => {
  try {
    const response = await axios.get("/personCapacity/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePersonCapacity = async (
  itemName,
  otherItemName,
  startValue,
  endValue
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      "/personCapacity/update",
      {
        data: {
          itemName,
          otherItemName,
          startValue,
          endValue,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
