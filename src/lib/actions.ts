"use server";
import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { revalidatePath } from "next/cache";

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

/**
 * @param {FormData} formData - The FormData object containing login details.
 * @returns {Promise<any>} - A promise resolving to the response data from the login request.
 */
export default async function loginUser(
  _prevState: any,
  formData: FormData
): Promise<any> {
  const details = Object.fromEntries(formData.entries());
  try {
    const response = await axios.post(
      "http://localhost:8080/users/login",
      details
    );
    return { ...response.data };
  } catch (error: any) {
    return {
      message: error.response.data || "An error occcured",
      isError: true,
    };
  }
}

export async function signupUser(_prevState: any, formData: FormData) {
  const userDetails = Object.fromEntries(formData.entries());
  try {
    const response = await axios.post(
      "http://localhost:8080/users/signup",
      userDetails
    );
    return { ...response.data };
  } catch (error: any) {
    return { message: error.response.data, isError: true };
  }
}

export async function postItem(formData: FormData, accessToken: string) {
  let fd = Object.fromEntries(formData.entries());
  fd = { ...fd, imageUrls: JSON.parse(fd.images as string) };
  try {
    const response = await axiosInstance.post("/listings/add", fd, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function getListing(id: number) {
  try {
    const { data } = await axiosInstance.get(`/listings/${id}`);
    return data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data,
      statusCode: error.response.status,
    });
  }
}

export async function getListingByCategory(category: string) {
  try {
    const response = await axiosInstance.get(
      `/listings/category/${category.toLowerCase()}`
    );
    return response.data;
  } catch (error: any) {
    return {
      message: "An error occured",
      error: error.response.data,
      statusCode: error.response.status,
    };
  }
}

export async function getPurchases(accessToken: string) {
  try {
    const response = await axiosInstance.get("/users/user/purchases", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {}
}

export async function getSales(accessToken: string) {
  try {
    const response = await axiosInstance.get("/users/user/sales", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {}
}
