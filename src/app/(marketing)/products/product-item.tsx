"use client";

import Image from "next/image";
import { type Product } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ProductItem(props: Product) {
  const router = useRouter();

  return (
    <div
      className="w-full p-4 hover:scale-105 md:w-1/2 lg:w-1/4"
      onClick={() => router.push(`/products/${props.id}`)}
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

export function ProductItemNew(props: Product) {
  return (
    <Link
      href={`/products/${props.id}`}
      className="group/product-item block overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt={props.name ?? "product image"}
        className="aspect-square w-full object-cover transition duration-500 group-hover/product-item:scale-105"
        height={239}
        width={239}
      />

      <div className="relative bg-white pt-3">
        <h3 className="text-xs text-gray-700 group-hover/product-item:underline group-hover/product-item:underline-offset-4">
          {props.name ?? "product name"}
        </h3>

        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>

          <span className="tracking-wider text-gray-900">
            {" "}
            ${props.price ?? "$$"}{" "}
          </span>
        </p>
      </div>
    </Link>
  );
}
