import client from "./client";

const API_TEST = "/api/test";

export const getTest = (): Promise<any> => client.get(API_TEST);
