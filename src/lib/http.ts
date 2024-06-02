import axios from "axios";
import { MyJwtPayload } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export async function getDashDetails() {
  const { data } = await axiosInstance.get("/users/dashboard-details", {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")!
      )}`,
    },
  });
  return data;
}

export async function getUserDetails(idToken: string) {
  const decodedToken = jwtDecode<MyJwtPayload>(idToken);
  const { data } = await axios.get(
    `http://localhost:8080/users/user/${decodedToken.email}`
  );
  return data;
}

const queryClient = new QueryClient();

export default queryClient;
