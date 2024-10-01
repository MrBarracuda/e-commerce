import { Icons } from "@/components/icons";
import { type FeatureConfig } from "@/types";
//TODO: refactor this file to not use Icons component but use icon name
export const featuresConfig: FeatureConfig[] = [
  {
    name: "Luxury Scents at Affordable Prices",
    Icon: Icons.package,
    description:
      "Enjoy high-quality replica fragrances without the luxury price tag",
  },
  {
    name: "Long-Lasting Fragrances",
    Icon: Icons.check,
    description: "Our perfumes provide all-day scent longevity",
  },
  {
    name: "Ethically Sourced Ingredients",
    Icon: Icons.swords,
    description:
      "Crafted with responsibly sourced ingredients for quality and sustainability",
  },
];
