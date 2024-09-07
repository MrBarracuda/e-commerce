"use client";

import { Wrapper } from "@/components/wrapper";
import { Icons } from "@/components/ui/icons";
import { cn, isSubActive } from "@/lib/utils";
import { Checkout } from "@/app/profile/subscription/checkout";
import { useUser } from "@/hooks/use-user";

const prices = [
  {
    priceId: "price_1PvZNtJIRVMyG764rJoCdOve",
    title: "Premium",
    description:
      "Modi dolorem expedita deleniti. Corporis iste qui inventore pariatur adipisci vitae.",
    benefits: ["faster delivery", "24 hours support", "2% discount"],
    amount: 10,
  },
  {
    priceId: "price_1PvYhwJIRVMyG764czSjV9Tx",
    title: "Premium Plus",
    description:
      "Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.",
    benefits: [
      "faster delivery",
      "24 hours support",
      "5% discount",
      // "exclusive drops",
    ],
    amount: 15,
  },
];

export default function Price() {
  //TODO: get rid of useUser hook and remove "use client"
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return false;
  }

  if (
    user?.subscription?.subscription_id &&
    isSubActive(user?.subscription?.expires_at)
  ) {
    return false;
  }

  return (
    <Wrapper className="max-w-screen-lg px-5 py-20">
      <div className="space-y-3 py-12 text-center">
        <h1 className="text-4xl font-bold">
          The right price for you, whoever you are
        </h1>
        <h2 className="text-xl font-light text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          numquam eligendi quos odit doloribus molestiae voluptatum.
        </h2>
      </div>

      <section className="grid grid-cols-1 gap-5 space-y-2 md:grid-cols-2 md:space-y-0">
        {prices.map((item, i) => (
          <div
            key={`${item.title}_${i}`}
            className={cn(
              "space-y-5 rounded-3xl border p-8 transition delay-100 ease-in-out hover:scale-105 hover:accent-primary hover:shadow-2xl",
              // {
              //   "ring-2 ring-primary": i === 1,
              // },
            )}
          >
            {/**** TITLE, DESCRIPTION AND AMOUNT ****/}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <h3 className="text-muted-foreground">
                <span className="text-4xl font-bold text-foreground">
                  ${item.amount}
                </span>{" "}
                /month
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
            {/**** BENEFITS ****/}
            <div className="space-y-2">
              {item.benefits.map((item, i) => (
                <div key={`${item}_${i}`} className="flex items-center gap-2">
                  <Icons.check />
                  <h3 className="text-sm text-muted-foreground">{item}</h3>
                </div>
              ))}
            </div>
            <Checkout priceId={item.priceId} />
          </div>
        ))}
      </section>
    </Wrapper>
  );
}
