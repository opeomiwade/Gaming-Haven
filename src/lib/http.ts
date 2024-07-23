import axios from "axios";
import { MyJwtPayload } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

class CustomError extends Error {
  statusCode: number;
  constructor({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.name = "CustomError";
    this.message = message;
    this.statusCode = statusCode;
  }
}

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
    `https://gaming-haven-backend.up.railway.app/users/user/${decodedToken.email}`
  );
  return data;
}

export async function getUserListings() {
  const { data } = await axiosInstance.get("/listings/user-listings", {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")!
      )}`,
    },
  });
  return data;
}

export async function removeSavedListing(listingId: number) {
  try {
    const { data } = await axiosInstance.delete("/users/remove-saved-listing", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")!
        )}`,
      },
      params: { listingId },
    });
    return data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.message,
      statusCode: error.response.status,
    });
  }
}

export async function addSavedListing(listingId: number) {
  try {
    const { data } = await axiosInstance.post(
      "/users/add-saved-listing",
      null,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")!
          )}`,
        },
        params: { listingId },
      }
    );
    return data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.message,
      statusCode: error.response.status,
    });
  }
}

export async function getAccessToken(email: String, googleIdToken: string) {
  try {
    const { data } = await axiosInstance.get("/users/access-token", {
      params: { email, googleIdToken },
    });
    return data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.message,
      statusCode: error.response.status,
    });
  }
}

const queryClient = new QueryClient();

export default queryClient;
