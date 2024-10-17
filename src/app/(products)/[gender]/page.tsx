import { notFound } from "next/navigation";
import { navigationConfig } from "@/config/navigation";
import { fetchProducts } from "@/app/(products)/fetchProducts";
import { type Product } from "@/types";
import { ProductItem } from "@/app/(products)/[gender]/product";

type ProductGenderProps = {
  params: {
    gender: string;
  };
};

const validCategories = navigationConfig.mainNav.map((navItem) =>
  navItem.href.replace("/", ""),
);

export default async function ProductGender({ params }: ProductGenderProps) {
  if (!validCategories.includes(params.gender)) {
    notFound();
  }

  const response = await fetchProducts();

  if (!response.ok) {
    return <div>Error fetching products</div>;
  }

  const data = (await response.json()) as Product[];

  return (
    <section>
      <div className="container mx-auto px-5 py-16">
        <div className="-m-4 flex flex-wrap">
          {data.map((product) => (
            <ProductItem key={product.id} gender={params.gender} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
