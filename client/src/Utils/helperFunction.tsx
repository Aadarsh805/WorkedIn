import axios from "axios";
import { localStorageUser } from "./GlobalContants";

export const apiProvider = axios.create({});

export const getUserData = () => {
  return JSON.parse(localStorage.getItem(localStorageUser) || "{}");
};

export const getHeaders = (token: string) => {
    return {
        'Authorization': `Bearer ${token}`
    }
}
