import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";

export const FetchEssentials = async () => {
  try {
    const response = await axios.get("/essential/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CreateEssential = async (itemName, status) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.post(
      "/essential/create",
      {
        data: {
          itemName,
          status,
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

export const UpdateEssential = async (
  essentialId,
  itemName,

  status
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      "/essential/update",
      {
        data: {
          essentialId,
          itemName,
          status,
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

export const DeleteEssential = async (essentialId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const response = await axios.delete("/essential/remove", {
    data: {
      data: {
        essentialId: essentialId,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (response.status !== 400) return response.data;

  console.log(response.er);
};
