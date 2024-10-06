import { type Icon, type Icons } from "@/components/icons";
import { type productTable, type subscriptionTable } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      // items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    github: string;
    linkedin: string;
  };
};

// export type DocsConfig = {
//   mainNav: MainNavItem[]
//   sidebarNav: SidebarNavItem[]
// }
//
export type NavigationConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  stripePriceId: string;
  description: string;
  benefits: string[];
  amount: number;
};

export type Subscription = InferSelectModel<typeof subscriptionTable>;
export type Product = InferSelectModel<typeof productTable>;

// export type UserSubscriptionPlan = SubscriptionPlan &
//   Pick<Subscription, "customerId" | "subscriptionId" | "expiresAt"> & {
//     isPremium: boolean;
//   };

export type UserSubscriptionPlan = {
  expiresAt: string | null;
  isPro: boolean;
  subscriptionId: string | null;
  customerId: string | null;
  priceId: string | null;
  // Make sure `id` is optional if it can be undefined
  id?: string;
  stripePriceId?: string;
  name?: string;
  description?: string;
  benefits?: string[];
  amount?: number;
};

export type FeatureConfig = {
  name: string;
  Icon: Icon;
  description: string;
};

export type ProtectedPaths = string[];
