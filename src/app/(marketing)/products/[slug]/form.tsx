"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { type Product, type ProductSKU } from "@/types";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { useCartStore } from "@/stores/cart-store";

type Props = {
  id: number;
  price: number;
  sku: string;
  sizeAttribute: {
    type: string;
    value: string;
  };
  grindAttribute: {
    type: string;
    value: string;
  };
};

export function ProductDetailsForm({ skus }: { skus: Props[] }) {
  const [size, setSize] = useQueryState("size");
  const [grind, setGrind] = useQueryState("grind");

  const { addItemToCart } = useCartStore((state) => state);

  const onAddToCart = () => {
    const res = {
      size: size ?? sizeOptions[0]?.value ?? "100",
      grind: grind ?? grindOptions[0]?.value ?? "whole-bean",
      price: selectedSku?.price ?? 999,
      id: selectedSku?.id ?? 0,
    };

    console.log(res);
    addItemToCart(res);
    // toast.success("Added to cart");
  };

  // console.log(skus);

  const sizeOptions = useMemo(() => {
    const uniqueSizes = Array.from(
      new Set(skus.map((sku) => sku.sizeAttribute.value)),
    ).sort((a, b) => Number(a) - Number(b));

    return uniqueSizes.map((value) => ({
      value,
      label: value === "1000" ? "1 KG" : `${value} G`,
    }));
  }, [skus]);

  const grindOptions = useMemo(() => {
    const uniqueGrinds = Array.from(
      new Set(skus.map((sku) => sku.grindAttribute.value)),
    );

    return uniqueGrinds.map((value) => ({
      value,
      label: value === "whole-bean" ? "Whole Bean" : "Ground",
    }));
  }, [skus]);

  const selectedSku = useMemo(() => {
    return skus.find(
      (sku) =>
        sku.sizeAttribute.value === (size ?? sizeOptions[0]?.value) &&
        sku.grindAttribute.value === (grind ?? grindOptions[0]?.value),
    )!;
  }, [skus, size, grind, sizeOptions, grindOptions]);

  // function addToCart() {
  //   const res = {
  //     size: size ?? sizeOptions[0]?.value ?? "100",
  //     grind: grind ?? grindOptions[0]?.value ?? "whole-bean",
  //     price: selectedSku?.price,
  //   };
  //
  //   console.log(res);
  // }

  return (
    <div className="mb-5 flex flex-col items-start justify-between gap-y-5 pb-5">
      <div className="w-full flex-col items-center space-y-1">
        <span className="font-light">Size:</span>
        <Select
          defaultValue={sizeOptions[0]?.value}
          value={size ?? sizeOptions[0]?.value}
          onValueChange={setSize}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-light">
            {sizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex-col items-center space-y-1">
        <span className="font-light">Grind:</span>
        <Select
          defaultValue={grindOptions[0]?.value}
          value={grind ?? grindOptions[0]?.value}
          onValueChange={setGrind}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent className="font-light">
            {grindOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/*<QuantityInput />*/}

      <Button
        type="submit"
        size="lg"
        className="inline-flex w-full justify-center gap-x-4 font-light uppercase"
        onClick={onAddToCart}
      >
        <span>Add to cart</span>
        <span>${selectedSku?.price ?? "--"}</span>
      </Button>
    </div>
  );
}
