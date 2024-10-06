import { type Product } from "@/types";

export async function fetchProducts() {
  const response = await fetch("http://localhost:3000/api/product", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response;
}
