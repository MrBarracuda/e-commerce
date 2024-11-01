import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="grid-2 grid">
      <h1 className="text-3xl">Dashboard</h1>
      <Link
        href="/dashboard/create"
        className={cn(buttonVariants({ variant: "link" }), "text-lg")}
      >
        Create Product
      </Link>
    </div>
  );
}
