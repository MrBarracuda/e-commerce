import { navigationConfig } from "@/config/navigation";
import { getProducts } from "@/lib/actions/product";
import { ProductItem, ProductItemNew } from "./product-item";
import Container from "@/components/container";

type ProductGenderProps = {
  params: {
    gender: string;
  };
};

// const validCategories = navigationConfig.mainNav.map((navItem) =>
//   navItem.href.replace("/", ""),
// );

export default async function ProductList() {
  // if (!validCategories.includes(params.gender)) {
  //   notFound();
  // }

  const data = await getProducts();

  return (
    <Container>
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <li key={product.id}>
            <ProductItemNew {...product} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
