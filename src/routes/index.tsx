import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northline Studio — Simple websites, done well" },
      {
        name: "description",
        content:
          "Northline Studio designs and builds fast, accessible websites for small teams and independent brands.",
      },
      { property: "og:title", content: "Northline Studio — Simple websites, done well" },
      {
        property: "og:description",
        content:
          "Northline Studio designs and builds fast, accessible websites for small teams and independent brands.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    title: "Design",
    body: "Clear layouts and type systems that make your content easy to read on any screen.",
  },
  {
    title: "Build",
    body: "Fast, accessible front-ends built with modern tooling and no unnecessary weight.",
  },
  {
    title: "Care",
    body: "Ongoing updates, small improvements, and a person to ask when something breaks.",
  },
];

function Index() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Web studio
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Simple websites, built with care.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          We help small teams launch clean, quick, accessible sites — without the
          bloat, the jargon, or the six-month timeline.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start a project
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            About us
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What we do
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title}>
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
