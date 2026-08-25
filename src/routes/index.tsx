import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, Cpu, Radio, ShieldCheck, Workflow, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/animated-counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al-Muhtarif — Interactive systems for smart tech" },
      {
        name: "description",
        content:
          "Al-Muhtarif builds dark-mode interfaces, realtime dashboards, and device software for hardware and AI teams.",
      },
      {
        property: "og:title",
        content: "Al-Muhtarif — Interactive systems for smart tech",
      },
      {
        property: "og:description",
        content:
          "Dark-mode interfaces, realtime dashboards, and device software for hardware and AI teams.",
      },
    ],
  }),
  component: Index,
});

const capabilities = [
  {
    id: "edge",
    label: "Edge",
    icon: Cpu,
    title: "On-device intelligence",
    body: "Inference pipelines that run close to the sensor, so the interface responds before the network does.",
    points: ["Sub-50ms feedback loops", "Offline-first state", "Streaming telemetry"],
  },
  {
    id: "control",
    label: "Control",
    icon: Workflow,
    title: "Operator consoles",
    body: "Dense, keyboard-driven control rooms where every value is live and every action is reversible.",
    points: ["Realtime charts", "Command palettes", "Full audit trails"],
  },
  {
    id: "trust",
    label: "Trust",
    icon: ShieldCheck,
    title: "Secure by construction",
    body: "Access rules, signed updates, and observability wired in from the first commit — not bolted on later.",
    points: ["Role-scoped data", "Signed OTA updates", "Anomaly alerts"],
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast interfaces",
    body: "Shipped bundles stay lean, interactions stay under a frame budget you can measure.",
  },
  {
    icon: Radio,
    title: "Live data",
    body: "Streams, sockets, and device events rendered without jitter or layout thrash.",
  },
  {
    icon: Activity,
    title: "Observable",
    body: "Every screen ships with the metrics needed to tell healthy from degraded.",
  },
];

function LiveSignals() {
  const [signals, setSignals] = useState([
    { label: "Throughput", value: 72, unit: "k req/s" },
    { label: "Edge latency", value: 38, unit: "ms" },
    { label: "Fleet online", value: 94, unit: "%" },
  ]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      setSignals((prev) =>
        prev.map((s) => ({
          ...s,
          value: Math.min(99, Math.max(12, s.value + (Math.random() * 12 - 6))),
        })),
      );
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="glow-surface">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">System signals</CardTitle>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span className="live-dot size-2 rounded-full bg-primary" aria-hidden="true" />
          Live
        </span>
      </CardHeader>
      <CardContent className="space-y-5">
        {signals.map((s) => (
          <div key={s.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="tabular-nums font-medium text-foreground">
                {s.value.toFixed(0)} {s.unit}
              </span>
            </div>
            <Progress
              value={s.value}
              aria-label={`${s.label}: ${s.value.toFixed(0)} ${s.unit}`}
              className="mt-2 h-1.5 transition-all duration-700"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ backgroundImage: "var(--gradient-primary)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Badge variant="outline" className="border-primary/40 text-primary">
              Systems studio
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Interfaces for machines that <span className="text-gradient">think</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We design and build the dark-mode consoles, realtime dashboards, and
              device software that hardware and AI teams run their operations on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start a project
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                About us
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { label: "Devices served", value: 1.4, suffix: "M", decimals: 1 },
                { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
                { label: "Ship weeks", value: 6, suffix: "", decimals: 0 },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-foreground">
                    <AnimatedCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <LiveSignals />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What we build
          </h2>
          <Tabs defaultValue="edge" className="mt-8">
            <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
              {capabilities.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="gap-2">
                  <c.icon className="size-4" aria-hidden="true" />
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {capabilities.map((c) => (
              <TabsContent key={c.id} value={c.id} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-3">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="bg-secondary/25">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:glow-surface"
              >
                <CardHeader className="space-y-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors group-hover:border-primary/50">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
