"use client";

import Image from "next/image";
import { type Product } from "@/types";

type ProductProps = Product;

export function ProductItem(props: ProductProps) {
  return (
    <div
      className="w-full p-4 hover:scale-105 md:w-1/2 lg:w-1/4"
      onClick={() => console.log(props.id)}
    >
      {/* html tag below used to be a link*/}
      <div className="relative block h-48 overflow-hidden rounded">
        <Image
          fill
          alt="ecommerce"
          className="block h-full w-full object-cover object-center"
          src="https://dummyimage.com/420x260"
        />
      </div>
      <div className="mt-4">
        <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">
          {props.name}
        </h3>
        <h2 className="title-font text-lg font-medium text-gray-900">
          {props.description}
        </h2>
        <p className="mt-1">${props.price}</p>
      </div>
    </div>
  );
}
