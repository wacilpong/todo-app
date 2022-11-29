import client from "./client";
import { IPromiseSuccess } from "types";

const API_COMMON_URL = "/api/common";

export const postCommonRestore = (db: File): Promise<IPromiseSuccess> => {
  const data = new FormData();

  data.append("restoreFile", db, db.name);

  return client.post(`${API_COMMON_URL}/restore`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
