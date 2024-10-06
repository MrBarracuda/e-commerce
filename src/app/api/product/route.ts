import { getProducts } from "@/app/api/product/getProducts";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const result = await getProducts(); // Added 'await' here
    console.log("result", result);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
