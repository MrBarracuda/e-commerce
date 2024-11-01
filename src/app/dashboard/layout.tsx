import Container from "@/components/container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className="h-[93vh]">{children}</Container>;
}

//TODO: Implement dashboard layout
