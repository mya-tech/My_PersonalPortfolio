"use client";

import { Button } from "@/components/ui/Button";
import { HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-bg-primary">
      <div className="p-4 bg-bg-secondary rounded-full border border-border-light text-accent-dark mb-6">
        <HelpCircle className="h-10 w-10 animate-pulse text-accent-mid" />
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-black text-text-primary mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-text-secondary max-w-md mb-8">
        We couldn&apos;t find the project or page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Button href="/" variant="primary" size="md">
        Go Back Home
      </Button>
    </div>
  );
}
