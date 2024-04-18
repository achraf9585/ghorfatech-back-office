import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";
export const FetchHouseTypes = async () => {
  try {
    const response = await axios.get("/houseType/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CreateHouseType = async (itemName, description, status) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.post(
      "/housetype/create",
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

export const UpdateHouseType = async (houseTypeId, itemName, status) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      "/housetype/update",
      {
        data: {
          houseTypeId,
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

export const DeleteHouseType = async (houseTypeId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const response = await axios.delete("/housetype/remove", {
    data: {
      data: {
        houseTypeId: houseTypeId,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (response.status !== 400) return response.data;

  console.log(response.er);
};
