import axios, { AxiosError } from "axios";

const client = axios.create({
  timeout: 6000,
});

client.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    const { response: errorData } = error;

    return new Promise((resolve, reject) => reject(errorData));
  }
);

export default client;
