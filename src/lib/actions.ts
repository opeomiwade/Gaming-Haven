"use server";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { revalidatePath } from "next/cache";
import { FilterQueryParams } from "@/types/types";
import { FieldValues } from "react-hook-form";
import { Listing } from "@/types/types";

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
      "https://gaming-haven-backend.up.railway.app/users/login",
      details
    );
    return { ...response.data };
  } catch (error: any) {
    return {
      message: error.response.data || "Internal Server error",
      statusCode: error.response.status || 500,
      isError: true,
    };
  }
}

export async function signupUser(_prevState: any, formData: FormData) {
  const userDetails = Object.fromEntries(formData.entries());
  try {
    const response = await axios.post(
      "https://gaming-haven-backend.up.railway.app/users/signup",
      userDetails
    );
    return { ...response.data };
  } catch (error: any) {
    return { message: error.response.data, isError: true };
  }
}

export async function postItem({
  listingDetails,
  accessToken,
}: {
  listingDetails: FieldValues;
  accessToken: string;
}) {
  listingDetails = {
    ...listingDetails,
    imageUrls: JSON.parse(listingDetails.imageUrls as string),
  };
  try {
    const response = await axiosInstance.post("/listings/add", listingDetails, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function getListing(id: number) {
  try {
    const { data } = await axiosInstance.get(`/listings/${id}`);
    return data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function getListingOffers(id: number) {
  try {
    const { data } = await axiosInstance.get(`/listings/${id}/offers`);
    return data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function editListing({
  id,
  updatedListingDetails,
  accessToken,
}: {
  id: number;
  updatedListingDetails: FieldValues;
  accessToken: string;
}) {
  updatedListingDetails = {
    ...updatedListingDetails,
    imageUrls:
      updatedListingDetails.imageUrls &&
      JSON.parse(updatedListingDetails.imageUrls as string),
  };
  try {
    const response = await axiosInstance.put(
      "/listings/edit",
      updatedListingDetails,
      {
        params: { listingId: id },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    revalidatePath(`/listings/${id}`);
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function filterListings(filters: FilterQueryParams) {
  // make manufacturers a comma separated list so java backend can process request
  const filtersParams = {
    ...filters,
    manufacturers: filters.manufacturers && filters.manufacturers!.join(","),
    condition: filters.condition && filters.condition.join(","),
  };
  try {
    const response = await axiosInstance.get(`/listings/filter`, {
      params: { ...filtersParams },
    });
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
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
  } catch (error: any) {
    console.log(error.response.data);
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function getOrder(orderId: number) {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function sendOffer(
  listingId: number,
  senderEmail: string,
  cashOffer: string,
  accessToken: string
) {
  try {
    const response = await axiosInstance.post(
      `/offers/${listingId}/send-offer`,
      {
        senderEmail,
        offer: cashOffer,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}
export async function updateOffer(offerId: number, status: string) {
  try {
    const response = await axiosInstance.put(
      `/offers/${offerId}/update-status`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function updateTrade(tradeId: number, status: string) {
  try {
    const response = await axiosInstance.put(
      `/trades/${tradeId}/update-status`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function getOrderItems(orderId: number) {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}/items`);
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data,
      statusCode: error.response.status,
    });
  }
}

export async function deleteListing(listingId: number, accessToken: string) {
  try {
    axiosInstance.delete("/listings/delete", {
      params: { listingId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function getUserSales(accessToken: string) {
  try {
    const response = await axiosInstance.get("/listings/user/sold-listings", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function getManufacturers() {
  try {
    const response = await axiosInstance.get("/products/manufacturers");
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}

export async function initiateTrade({
  listingId,
  offeredItems,
}: {
  listingId: number;
  offeredItems: Listing[];
}) {
  try {
    const response = await axiosInstance.post("/trades/add", {
      listingId,
      offeredItems,
    });
    return response.data;
  } catch (error: any) {
    throw new CustomError({
      message: error.response.data || "An error occured",
      statusCode: error.response.status,
    });
  }
}
