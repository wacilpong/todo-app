import axios, { AxiosError } from "axios";

const client = axios.create({
  timeout: 6000
});

client.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    const { response: errorData } = error;

    if (process.env.APP_ENV === "development") console.error(errorData);

    return new Promise((resolve, reject) => reject(errorData));
  }
);

export default client;
