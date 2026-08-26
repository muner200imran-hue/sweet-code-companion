import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wand2, Download, Loader2, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Generate Images — AI Studio" },
      { name: "description", content: "Generate stunning AI images. No login required." },
    ],
  }),
  component: Generate,
});

const models = [
  { id: "dalle3", label: "DALL·E 3", provider: "OpenAI" },
  { id: "sdxl", label: "Stable Diffusion XL", provider: "Stability AI" },
  { id: "flux", label: "FLUX.1", provider: "Black Forest" },
  { id: "midjourney", label: "Midjourney v7", provider: "Midjourney" },
  { id: "imagen3", label: "Imagen 3", provider: "Google" },
  { id: "ideogram", label: "Ideogram 2", provider: "Ideogram" },
];

const stylePresets = ["Photorealistic", "Artistic", "3D Render", "Anime", "Oil Painting", "Watercolor", "Digital Art", "Cinematic"];

const aspectRatios = [
  { id: "1:1", label: "Square (1:1)" },
  { id: "16:9", label: "Landscape (16:9)" },
  { id: "9:16", label: "Portrait (9:16)" },
  { id: "4:3", label: "Standard (4:3)" },
];

function Generate() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("dalle3");
  const [style, setStyle] = useState("Photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setResult("https://picsum.photos/seed/" + Date.now() + "/512/512");
    }, 3000);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Generate Image</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Describe your vision and let AI bring it to life.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        <Card className="border-border/60 bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Describe your image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt *</Label>
              <Textarea
                id="prompt"
                placeholder="A futuristic city at sunset with flying cars and neon lights, cinematic lighting..."
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="negative">What to avoid (optional)</Label>
              <Textarea
                id="negative"
                placeholder="Blurry, low quality, distorted hands..."
                rows={2}
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border/60 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">AI Model</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <div className="flex items-center gap-2">
                        <span>{m.label}</span>
                        <Badge variant="secondary" className="text-xs">{m.provider}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Style</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stylePresets.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Aspect Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.id}
                  type="button"
                  onClick={() => setAspectRatio(ar.id)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all ${
                    aspectRatio === ar.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={isGenerating || !prompt.trim()}>
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="size-4" />
              Generate Image
            </>
          )}
        </Button>
      </form>

      {result && (
        <Card className="mt-8 border-border/60 bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Your image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
              <img src={result} alt="Generated image" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="size-4" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="size-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
