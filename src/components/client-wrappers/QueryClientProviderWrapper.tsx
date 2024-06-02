"use client";
import queryClient from "@/lib/http";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const QueryClientProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderWrapper
