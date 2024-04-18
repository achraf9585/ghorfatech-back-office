import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";

export const FetchRoomTypes = async () => {
  try {
    const response = await axios.get("/roomtype/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CreateRoomType = async (itemName, description, status) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.post(
      "/roomtype/create",
      {
        data: {
          itemName,
          description,
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

export const UpdateRoomType = async (
  roomTypeId,
  itemName,
  description,
  status
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      "/roomtype/update",
      {
        data: {
          roomTypeId,
          itemName,
          description,
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

export const DeleteRoomType = async (roomTypeId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const response = await axios.delete("/roomtype/remove", {
    data: {
      data: {
        roomTypeId: roomTypeId,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (response.status !== 400) return response.data;

  console.log(response.er);
};
