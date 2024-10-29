import { eq } from "drizzle-orm";
import { db } from "@/db";

const CHEAPEST_SKU = "121";

export async function getProducts() {
  return db.query.productTable.findMany({
    limit: 10,
    columns: {
      id: true,
      title: true,
      slug: true,
      flavorProfile: true,
      image: true,
      inStock: true,
    },
    with: {
      skus: {
        where: (skus) => eq(skus.sku, CHEAPEST_SKU),
      },
    },
    // with: {
    //   skus: {
    //     columns: {
    //       price: true,
    //     },
    //     with: {
    //       sizeAttribute: {
    //         columns: {
    //           value: true,
    //         },
    //       },
    //     },
    //     // Only get SKUs where size is 100g
    //     // where: (sku, { eq }) => eq(sku.sizeAttribute.value, "100"),
    //   },
    // },
  });
}

export async function getProductBySlug(slug: string) {
  return db.query.productTable.findFirst({
    where: (products) => eq(products.slug, slug),
    with: {
      skus: {
        columns: {
          id: true,
          sku: true,
          price: true,
        },
        with: {
          sizeAttribute: {
            columns: {
              value: true,
              type: true,
            },
          },
          grindAttribute: {
            columns: {
              value: true,
              type: true,
            },
          },
        },
      },
    },
  });
}

// export function formatProductResponse(product: Awaited<ReturnType<any>>) {
//   if (!product) return null;
//
//   return {
//     ...product,
//     variants: product.skus.map((sku) => ({
//       id: sku.id,
//       sku: sku.sku,
//       price: sku.price,
//       size: sku.sizeAttribute.value,
//       grind: sku.grindAttribute.value,
//     })),
//   };
// }

// type ProductFetchedBySlug = {
//   id: number;
//   title: string;
//   slug: string;
//   flavorProfile: string;
//   image: string | null;
//   inStock: boolean | null;
//   skus: Sku[];
// };

// type SKU = {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   productId: number;
//   sku: string;
//   price: number;
//   sizeAttributeId: number;
//   grindAttributeId: number;
// };
//
// type Sku = {
//   id: number;
//   sku: string;
//   price: number;
//   grindAttribute: {
//     type: "size" | "grind";
//     value: string;
//   };
//   sizeAttribute: {
//     type: "size" | "grind";
//     value: string;
//   };
// };

// function formatSKU(product: ProductFetchedBySlug[] | undefined) {
//   if (product === undefined) return undefined;
//   const res = product.map((product) => {
//     const uniqueGrinds = Array.from(
//       new Set(product.skus.map((sku) => sku.grindAttribute.value)),
//     );
//     const uniqueSizes = Array.from(
//       new Set(product.skus.map((sku) => sku.sizeAttribute.value)),
//     ).sort((a, b) => Number(a) - Number(b));
//
//     const sizeResult = uniqueSizes.map((value) => ({
//       value,
//       label: value === "1000" ? "1 KG" : `${value} G`,
//     }));
//
//     const grindResult = uniqueGrinds.map((value) => ({
//       value,
//       label: value === "whole-bean" ? "Whole Bean" : "Ground",
//     }));
//
//     return {
//       title: product.title,
//       flavorProfile: product.flavorProfile,
//       image: product.image,
//       inStock: product.inStock,
//       sku: {
//         size: sizeResult,
//         grind: grindResult,
//       },
//     };
//   });
//   return res;
// }
