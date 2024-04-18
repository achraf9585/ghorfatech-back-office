import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";

export const FetchRoomAmounts = async () => {
  try {
    const response = await axios.get("/roomAmount/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CreateRoomAmount = async (itemName, status) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.post(
      "/roomAmount/create",
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

export const UpdateRoomAmount = async (roomAmountId, itemName, status) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      "/roomAmount/update",
      {
        data: {
          roomAmountId,
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

export const DeleteRoomAmount = async (roomAmountId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const response = await axios.delete("/roomAmount/remove", {
    data: {
      data: {
        roomAmountId: roomAmountId,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (response.status !== 400) return response.data;

  console.log(response.er);
};
