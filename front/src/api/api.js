import axios from "axios";

const instance = axios.create({
  baseURL: "https://workout-app.up.railway.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const $api = async ({
  url,
  type = "GET",
  auth = true,
  body
}) => {
  if (auth) {
    const token = localStorage.getItem("token");
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  try {
    switch (type) {
      case "GET": {
        const { data } = await instance.get(url);
        return data;
      }
      case "POST": {
        const { data } = await instance.post(url, body);
        return data;
      }
      case "PUT": {
        const { data } = await instance.put(url, body);
        return data;
      }
      case "DELETE": {
        const { data } = await instance.delete(url);
        return data;
      }

      default:
        break;
    }
  } catch (e) {
    throw e.response && e.response.data
      ? e.response.data.message
      : e.message;
  }
};
