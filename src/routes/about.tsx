import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Al-Muhtarif" },
      {
        name: "description",
        content:
          "A small web studio focused on clarity, speed, and long-lived websites for independent teams.",
      },
      { property: "og:title", content: "About — Al-Muhtarif" },
      {
        property: "og:description",
        content:
          "A small web studio focused on clarity, speed, and long-lived websites for independent teams.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Clarity first",
    body: "Every page should answer one question well before it tries to answer three.",
  },
  {
    title: "Fast by default",
    body: "Performance is a feature. We ship less code and measure what we ship.",
  },
  {
    title: "Built to last",
    body: "Straightforward, standards-based work that is still easy to change in two years.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        About
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Al-Muhtarif is a small team of designers and developers. We work
        directly with founders and marketing leads — no account layers, no
        handoffs that lose the plot.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Most projects run four to six weeks, from first sketch to launch.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title}>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {v.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
