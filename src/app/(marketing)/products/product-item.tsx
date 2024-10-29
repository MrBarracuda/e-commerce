import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  slug: string;
  flavorProfile: string;
  image: string | null;
  inStock: boolean | null;
  skus: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    productId: number;
    sku: string;
    price: number;
    sizeAttributeId: number;
    grindAttributeId: number;
  }[];
};

export function ProductItem(props: Product) {
  return (
    <Link
      href={`/products/${props.slug}`}
      className="group/product-item block overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt={props.image ?? "product image"}
        className="aspect-square w-full object-cover transition duration-500 group-hover/product-item:scale-105"
        height={239}
        width={239}
      />

      <div className="relative bg-white pt-3 text-center">
        <h3 className="group-hover/product-item:underline group-hover/product-item:underline-offset-4">
          {props.title ?? "product name"}
        </h3>
        <h5 className="text-sm font-light text-muted-foreground">
          {props.flavorProfile}
        </h5>

        <p className="mt-1">
          <span className="sr-only"> Regular Price </span>

          <span className="text-sm font-light tracking-wide">
            ${props.skus[0]?.price ?? "$$"}
          </span>
        </p>
      </div>
    </Link>
  );
}
