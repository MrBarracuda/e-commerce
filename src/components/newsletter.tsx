import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wrapper } from "@/components/wrapper";

export function Newsletter() {
  return (
    // TODO: improve styling
    <section className="border-y bg-primary-foreground">
      <Wrapper className="space-y-10 py-16">
        <div className="flex w-full flex-col text-center">
          <h3 className="text-xl font-medium sm:text-2xl">
            Subscribe to our Newsletter
          </h3>
        </div>
        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-end space-y-4 px-8 md:flex-row md:space-x-4 md:space-y-0 md:px-0 lg:w-2/3">
          <div className="relative w-full flex-grow">
            <Input type="email" placeholder="Your Email" name="email" />
          </div>
          <Button className="w-full md:w-auto">Subscribe</Button>
        </div>
      </Wrapper>
    </section>
  );
}
