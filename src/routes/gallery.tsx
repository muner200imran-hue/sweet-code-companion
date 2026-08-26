import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — AI Studio" },
      { name: "description", content: "Explore AI-generated images from the community." },
    ],
  }),
  component: Gallery,
});

const galleryImages = [
  { id: 1, src: "https://picsum.photos/seed/a1b2c3/400/400", prompt: "Abstract geometric art with vibrant colors", model: "DALL·E 3", likes: 142 },
  { id: 2, src: "https://picsum.photos/seed/d4e5f6/400/600", prompt: "Serene mountain landscape at golden hour", model: "Stable Diffusion XL", likes: 89 },
  { id: 3, src: "https://picsum.photos/seed/g7h8i9/400/400", prompt: "Futuristic cyberpunk city at night", model: "FLUX.1", likes: 234 },
  { id: 4, src: "https://picsum.photos/seed/j1k2l3/400/500", prompt: "Portrait of an elderly man, oil painting style", model: "Midjourney v7", likes: 167 },
  { id: 5, src: "https://picsum.photos/seed/m4n5o6/400/400", prompt: "Cosmic nebula with stars and galaxies", model: "Imagen 3", likes: 198 },
  { id: 6, src: "https://picsum.photos/seed/p7q8r9/400/600", prompt: "Cherry blossom tree in Japanese garden", model: "Ideogram 2", likes: 156 },
  { id: 7, src: "https://picsum.photos/seed/s1t2u3/400/400", prompt: "Steampunk mechanical owl", model: "DALL·E 3", likes: 112 },
  { id: 8, src: "https://picsum.photos/seed/v4w5x6/400/500", prompt: "Underwater coral reef ecosystem", model: "Stable Diffusion XL", likes: 203 },
  { id: 9, src: "https://picsum.photos/seed/y7z8a9/400/400", prompt: "Minimalist logo design for tech startup", model: "Ideogram 2", likes: 178 },
];

function Gallery() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  function toggleLike(id: number) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Gallery</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Explore images created by our community using AI.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {galleryImages.map((img) => (
          <Card key={img.id} className="group overflow-hidden border-border/60 bg-card shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={img.src}
                alt={img.prompt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs text-white/90 line-clamp-2">{img.prompt}</p>
              </div>
              <Badge className="absolute top-2 right-2 bg-black/60 text-white text-xs backdrop-blur-sm">
                {img.model}
              </Badge>
            </div>
            <CardContent className="flex items-center justify-between p-3">
              <button
                onClick={() => toggleLike(img.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  liked.has(img.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                }`}
              >
                <Heart className={`size-4 ${liked.has(img.id) ? "fill-current" : ""}`} />
                <span>{img.likes + (liked.has(img.id) ? 1 : 0)}</span>
              </button>
              <Button variant="ghost" size="icon" className="size-8">
                <Download className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
