import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Button } from "./ui/button";

type RuntimeErrorScreenProps = {
  error: Error;
  onRetry: () => void;
};

export function RuntimeErrorScreen({ error, onRetry }: RuntimeErrorScreenProps) {
  const reason = error.message.trim() || "An unexpected runtime error occurred.";

  return (
    <main
      className="tech-grid flex min-h-screen items-center justify-center bg-background px-4 py-12"
      aria-labelledby="runtime-error-title"
    >
      <section
        className="glow-surface w-full max-w-xl rounded-lg border border-border bg-card p-6 text-card-foreground sm:p-8"
        role="alert"
        aria-live="assertive"
      >
        <div className="flex size-11 items-center justify-center rounded-md bg-destructive/15 text-destructive">
          <AlertTriangle className="size-5" aria-hidden="true" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase text-destructive">Runtime error</p>
        <h1 id="runtime-error-title" className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
          This page couldn't continue
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The application encountered an error. The reported reason is shown below.
        </p>

        <div className="mt-6 rounded-md border border-border bg-background p-4">
          <p className="text-xs font-medium text-muted-foreground">Reason</p>
          <p className="mt-2 break-words text-sm leading-6 text-foreground">{reason}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={onRetry}>
            <RefreshCw aria-hidden="true" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="/">
              <Home aria-hidden="true" />
              Go home
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}