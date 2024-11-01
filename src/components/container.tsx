import { cn } from "@/lib/utils";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function Container({
  as: Component = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Component
      className={cn("lg:py-18 px-5 py-12 md:px-6 md:py-16", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center">
        {children}
      </div>
    </Component>
  );
}
