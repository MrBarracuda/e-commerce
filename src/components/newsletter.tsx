import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/container";

export function Newsletter() {
  //TODO: Implement mobile and tablet responsive design
  return (
    <section className="bg-[#CFFF71] text-black">
      <Container>
        <div className="grid grid-cols-2">
          <div className="text-md flex w-full flex-col">
            <p className="text-lg font-light">
              Sip, savor, subscribe – fresh coffee updates await.
            </p>
            <h3 className="text-5xl font-light">
              This is not your Dad’s newsletter.
            </h3>
          </div>
          <div className="space-y-2">
            <Label className="relative block border-b border-black">
              <Input
                type="email"
                placeholder="Your email address"
                name="email"
                className="border-0 border-black shadow-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0"
              />
            </Label>

            <Button
              className="-px-3 block w-full text-lg font-normal text-black md:w-auto"
              variant="link"
            >
              Sign up
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
