import axios from "axios";

axios.defaults.baseURL = "https://ghorfatech-backend.vercel.app/api/admin";

export const FetchSiteSettings = async () => {
  try {
    const response = await axios.get("/siteSettings/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CreateSiteSetting = async (title, name, value) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.post(
      "/siteSettings/create",
      {
        data: {
          title,
          name,
          value,
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

export const UpdateSiteSetting = async (siteSettingId, title, name, value) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      "/siteSettings/update",
      {
        data: {
          siteSettingId,
          title,
          name,
          value,
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

export const DeleteSiteSetting = async (siteSettingId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const response = await axios.delete("/siteSettings/remove", {
    data: {
      data: {
        siteSettingId: siteSettingId,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (response.status !== 400) return response.data;

  console.log(response.er);
};
