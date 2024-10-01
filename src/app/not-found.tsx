import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-[url(/bg-light.svg)] bg-cover bg-repeat dark:bg-[url(/bg-dark.svg)]">
      <FileQuestion size={48} />
      <h1 className="text-5xl font-bold">404: Page Not Found</h1>
    </div>
  );
}
