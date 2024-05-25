"use server";
import axios from "axios";
import { redirect } from "next/navigation";

/**
 * @param {FormData} formData - The FormData object containing login details.
 * @returns {Promise<any>} - A promise resolving to the response data from the login request.
 */
export default async function loginUser(_prevState: any, formData: FormData) {
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
  const details = Object.fromEntries(formData.entries());
  try {
    const response = await axios.post(
      "http://localhost:8080/users/signup",
      details
    );
    return { ...response.data };
  } catch (error: any) {
    console.log(error.response.data);
    return { message: error.response.data, isError: true };
  }
}

export async function navigate(route: string) {
  redirect("/" + route);
}
