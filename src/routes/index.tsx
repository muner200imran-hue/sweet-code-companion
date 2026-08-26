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
      { title: "Al-Damar — Interactive systems for smart tech" },
      {
        name: "description",
        content:
          "Al-Damar builds modern interfaces, realtime dashboards, and device software for hardware and AI teams.",
      },
      {
        property: "og:title",
        content:           "Al-Damar — Interactive systems for smart tech",
      },
      {
        property: "og:description",
        content:
          "Modern interfaces, realtime dashboards, and device software for hardware and AI teams.",
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
    <Card className="glow-surface border-border/60">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium tracking-wide text-foreground">
          System signals
        </CardTitle>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span className="live-dot size-2 rounded-full bg-primary" aria-hidden="true" />
          Live
        </span>
      </CardHeader>
      <CardContent className="space-y-6">
        {signals.map((s) => (
          <div key={s.label}>
            <div className="mb-3 flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="tabular-nums font-mono text-sm font-semibold text-foreground">
                {s.value.toFixed(0)}<span className="text-xs text-muted-foreground">{s.unit}</span>
              </span>
            </div>
            <Progress
              value={s.value}
              aria-label={`${s.label}: ${s.value.toFixed(0)} ${s.unit}`}
              className="h-1.5 transition-all duration-700"
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
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ backgroundImage: "var(--gradient-primary)" }}
          aria-hidden="true"
        />
        <div
          className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32"
        >
          <div className="space-y-8 max-w-2xl">
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/8 px-4 py-1 text-sm font-medium text-primary shadow-sm"
            >
              Systems studio — Hardware & AI teams
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.05]">
              Interfaces for{" "}
              <span className="text-gradient-primary">machines that think</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              We design and build the dark-mode consoles, realtime dashboards, and
              device software that hardware and AI teams run their operations on.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start a project
                <svg className="ml-2 size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-card px-8 py-3.5 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                About us
              </Link>
            </div>

            {/* Stats */}
            <div className="grid max-w-md grid-cols-3 gap-8 pt-6 border-t border-border/60">
              {[
                { label: "Devices served", value: 1.4, suffix: "M", decimals: 1 },
                { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
                { label: "Ship weeks", value: 6, suffix: "", decimals: 0 },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold text-foreground tracking-tight">
                    <AnimatedCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </dd>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 max-w-md">
            <LiveSignals />
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              What we build
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Full-stack from sensor to screen
            </h2>
          </div>

          <Tabs defaultValue="edge" className="mt-4">
            <TabsList className="w-full justify-start overflow-x-auto sm:w-auto bg-secondary/60 p-1 rounded-2xl border border-border/60">
              {capabilities.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="gap-2 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary px-5 py-2.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <c.icon className="size-4" aria-hidden="true" />
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {capabilities.map((c) => (
              <TabsContent key={c.id} value={c.id} className="mt-8">
                <Card className="glow-surface border-border/60 bg-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl sm:text-3xl">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-3">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className="rounded-xl border border-border/60 bg-secondary/60 px-4 py-3 text-sm text-foreground font-medium shadow-sm"
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

      {/* Features Section */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Principles
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How we work
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-elevated hover:shadow-primary/8"
              >
                <CardHeader className="space-y-4 pb-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary shadow-sm transition-colors group-hover:border-primary/40 group-hover:bg-primary/15">
                    <f.icon className="size-6" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-xl">{f.title}</CardTitle>
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
