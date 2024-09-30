import { Wrapper } from "@/components/wrapper";
import { featuresConfig } from "@/config/features";

export function Features() {
  return (
    <section className="border-y bg-primary-foreground">
      <Wrapper className="py-16">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {featuresConfig.map((feature) => (
            <div
              key={feature.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="flex justify-center md:flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-foreground text-accent">
                  <feature.Icon className="h-1/3 w-1/3" />
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-primary">
                  {feature.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
