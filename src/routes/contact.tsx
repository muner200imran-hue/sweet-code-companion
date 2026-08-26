import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — الة سوسن" },
      {
        name: "description",
        content:
          "Tell us about your project and we'll reply within two business days.",
      },
      { property: "og:title", content: "Contact — الة سوسن" },
      {
        property: "og:description",
        content:
          "Tell us about your project and we'll reply within two business days.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Contact
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Tell us a little about the project. We usually reply within two business
        days.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" rows={5} required />
        </div>
        <Button type="submit">Send message</Button>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {sent ? "Thanks — your message has been noted." : ""}
        </p>
      </form>
    </div>
  );
}
