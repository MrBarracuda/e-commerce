import { Input } from "@/components/ui/input";

export function QuantityInput() {
  return (
    <div className="shadow-sm">
      <label htmlFor="Quantity" className="sr-only">
        {" "}
        Quantity{" "}
      </label>

      <div className="flex items-center rounded border border-gray-200">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
        >
          &minus;
        </button>

        <Input
          type="number"
          id="Quantity"
          value="1"
          className="h-10 w-16 border-transparent text-center shadow-none [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
        >
          &#43;
        </button>
      </div>
    </div>
  );
}
