import { Wrapper } from "@/components/wrapper";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const prices = [
  {
    title: "Premium",
    description:
      "Modi dolorem expedita deleniti. Corporis iste qui inventore pariatur adipisci vitae.",
    benefits: ["faster delivery", "2% discount", "24 hours support"],
    amount: 10,
  },
  {
    title: "Premium Plus",
    description:
      "Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.",
    benefits: [
      "faster delivery",
      "24 hours support",
      "5% discount",
      "exclusive drops",
    ],
    amount: 15,
  },
];

export default function Price() {
  return (
    <Wrapper className="max-w-screen-lg py-20">
      <div className="space-y-3 py-12 text-center">
        <h1 className="text-4xl font-bold">
          The right price for you, whoever you are
        </h1>
        <h2 className="text-xl font-light text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          numquam eligendi quos odit doloribus molestiae voluptatum.
        </h2>
      </div>

      <section className="grid grid-cols-2 gap-5">
        {prices.map((item, i) => (
          <div
            key={`${item.title}_${i}`}
            className={cn(
              "space-y-5 rounded-3xl border p-8 transition delay-100 ease-in-out hover:scale-105 hover:accent-primary hover:shadow-2xl",
              {
                "ring-2 ring-primary": i === 1,
              },
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
            <div className="flex">
              <Button className="w-full">Getting started</Button>
            </div>
          </div>
        ))}
      </section>
    </Wrapper>
  );
}
