import { type Product } from "@/types";

export async function fetchProducts(id = "") {
  const response = await fetch(`http://localhost:3000/api/product/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    //TODO: handle error
    console.error("Failed to fetch products");
  }

  return response;
}
