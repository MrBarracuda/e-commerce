"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuantityInput } from "@/components/quantity-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ProductDetailsForm({ price }: { price: string }) {
  const [size, setSize] = useState("250");
  const [ground, setGround] = useState("whole-bean");

  return (
    <div className="mb-5 flex flex-col items-start justify-between gap-y-5 pb-5">
      <div className="w-full flex-col items-center space-y-1">
        <span className="font-light">Size:</span>
        <Select defaultValue={size} onValueChange={setSize}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-light">
            <SelectItem value="100">100 G</SelectItem>
            <SelectItem value="250">250 G</SelectItem>
            <SelectItem value="1000">1 KG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex-col items-center space-y-1">
        <span className="font-light">Grind:</span>
        <Select defaultValue={ground} onValueChange={setGround}>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent className="font-light">
            <SelectItem value="whole-bean">Whole Bean</SelectItem>
            <SelectItem value="ground">Ground</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <QuantityInput />

      <Button
        type="submit"
        size="lg"
        className="inline-flex w-full justify-center gap-x-4 font-light uppercase"
      >
        <span>Add to cart</span>
        <span>${price}</span>
      </Button>
    </div>
  );
}
