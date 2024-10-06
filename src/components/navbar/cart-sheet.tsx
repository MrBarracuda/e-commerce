import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function CartSheet() {
  const itemCount = 4 as number;
  const shippingFee = 5;
  const taxFee = 4;

  const totalPrice = shippingFee + taxFee;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="cart"
        >
          <Icons.cart />
          <span
            className={cn(
              itemCount === 0 ? "hidden" : "",
              "absolute top-4 text-xs font-bold",
            )}
          >
            {itemCount}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/*TODO: Cart logic*/}
              cart items
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Tax</span>
                  <span>{formatPrice(taxFee)}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="https://utfs.io/f/OqhAZrbGnNAru6YoZQg5rTcSEasKUzHZYjb9P7JWXdlR14eC"
                alt="empty shopping cart"
                fill
              />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className="hover:text-brand text-sm text-muted-foreground underline underline-offset-4"
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
