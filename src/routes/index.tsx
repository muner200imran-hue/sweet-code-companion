import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Zap, Image, Wand2, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Studio — Generate images with AI" },
      { name: "description", content: "Generate stunning images with AI models. No login required." },
    ],
  }),
  component: Index,
});

const aiModels = [
  { id: "dalle3", label: "DALL·E 3", provider: "OpenAI", icon: Wand2, color: "#10a37f", description: "High-quality photorealistic and artistic images" },
  { id: "sdxl", label: "Stable Diffusion XL", provider: "Stability AI", icon: Layers, color: "#9b59b6", description: "Open-source, versatile image generation" },
  { id: "flux", label: "FLUX.1", provider: "Black Forest", icon: Zap, color: "#e74c3c", description: "Latest state-of-the-art image generation" },
  { id: "midjourney", label: "Midjourney v7", provider: "Midjourney", icon: Image, color: "#f59e0b", description: "Artistic and creative compositions" },
  { id: "imagen3", label: "Imagen 3", provider: "Google", icon: Eye, color: "#4285f4", description: "Photorealistic quality from Google DeepMind" },
  { id: "ideogram", label: "Ideogram 2", provider: "Ideogram", icon: Sparkles, color: "#00d4aa", description: "Best for text rendering in images" },
];

function Index() {
  const [selectedModel, setSelectedModel] = useState("dalle3");

  const activeModel = aiModels.find((m) => m.id === selectedModel)!;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <Badge variant="outline" className="mb-6 border-primary/40 bg-primary/8 px-4 py-1 text-sm font-medium text-primary">
            Free — No login required
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.05]">
            Create images with{" "}
            <span className="text-gradient-primary">AI</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed text-muted-foreground">
            Generate stunning images using the world's best AI models. Enter a prompt, choose a model, and download your creation in seconds.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/generate" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110">
              Start creating
            </Link>
            <Link to="/gallery" className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-card px-8 py-3.5 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/40">
              View gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Model Selection */}
      <section className="border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Choose your model</p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">6 AI models, one platform</h2>
          </div>
          <Tabs defaultValue={selectedModel} onValueChange={setSelectedModel}>
            <TabsList className="w-full justify-start overflow-x-auto p-1 bg-secondary/60 rounded-2xl border border-border/60 flex-wrap h-auto gap-1">
              {aiModels.map((m) => (
                <TabsTrigger key={m.id} value={m.id} className="gap-2 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary px-4 py-2.5 font-medium text-muted-foreground text-xs sm:text-sm">
                  <m.icon className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{m.label}</span>
                  <span className="sm:hidden">{m.label.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {aiModels.map((m) => (
              <TabsContent key={m.id} value={m.id} className="mt-8">
                <Card className="border-border/60 bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: m.color + "20", color: m.color }}>
                        <m.icon className="size-5" />
                      </span>
                      <div>
                        <CardTitle className="text-2xl">{m.label}</CardTitle>
                        <p className="text-sm text-muted-foreground">{m.provider}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-base text-muted-foreground">{m.description}</p>
                    <Link to="/generate">
                      <Button className="mt-2" style={{ backgroundColor: m.color }}>
                        Generate with {m.label}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How it works</p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">3 simple steps</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: Wand2, title: "Write a prompt", body: "Describe the image you want in detail. The more specific, the better the result." },
              { icon: Zap, title: "Choose a model", body: "Pick from 6 world-class AI image generators, each with unique strengths." },
              { icon: Image, title: "Download & share", body: "Get high-quality images instantly. No watermarks, no login required." },
            ].map((f, i) => (
              <Card key={f.title} className="border-border/60 bg-card shadow-sm">
                <CardHeader>
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary shadow-sm">
                    <span className="text-lg font-bold">{i + 1}</span>
                  </span>
                  <CardTitle className="text-xl mt-4">{f.title}</CardTitle>
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
