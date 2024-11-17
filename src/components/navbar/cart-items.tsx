"use client";

import { useCartStore } from "@/stores/cart-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function CartItems() {
  const { cartItems } = useCartStore((state) => state);
  return (
    <div className="flex w-full flex-col gap-y-4">
      {cartItems.map((item) => (
        <Card className="w-full" key={item.id}>
          <div className="grid gap-2.5 p-4">
            <div className="flex items-center gap-4">
              <div>
                {item.quantity} x {item.size}
              </div>
              <div>{item.price}</div>
              <DeleteItemButton productId={item.id} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function DeleteItemButton({ productId }: { productId: number }) {
  const { removeItemFromCart } = useCartStore((state) => state);
  const onRemoveItem = (productId: number) => {
    removeItemFromCart(productId);
  };

  return (
    <Button size="sm" variant="ghost" onClick={() => onRemoveItem(productId)}>
      <Icons.close />
      <span className="sr-only">Remove</span>
    </Button>
  );
}
