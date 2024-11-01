import { getProducts } from "@/lib/actions/product";
import { ProductItem } from "./product-item";
import Container from "@/components/container";
import { StickySidebar } from "@/app/(marketing)/products/sticky-sidebar";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <Container>
      <div className="flex gap-x-16">
        <StickySidebar />
        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductItem {...product} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
