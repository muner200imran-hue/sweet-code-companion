import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Al-Damar" },
      { name: "description", content: "Chat with AI assistant to get help with image generation and model recommendations." },
    ],
  }),
  component: AIAssistant,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Wand2, label: "Help me create a prompt", prompt: "I want to create an image but I don't know how to describe it. Can you help me write a good prompt?" },
  { icon: Sparkles, label: "Which model should I use?", prompt: "What AI model should I use for creating a realistic portrait?" },
  { icon: Zap, label: "Best styles for logos", prompt: "What style preset works best for creating a modern logo?" },
  { icon: Image, label: "Tips for better images", prompt: "Give me tips for writing better prompts to get more detailed images." },
];

function Wand2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
    </svg>
  );
}

function Image(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  );
}

const aiResponses: Record<string, string> = {
  greeting: "مرحبًا! أنا مساعدك الذكي في منصة Al-Damar. يمكنني مساعدتك في:

• اختيار النموذج المناسب لصورتك
• كتابة وصف احترافي (prompt)
• نصائح للحصول على نتائج أفضل
• الإجابة على أي سؤال عن المنصة",
  prompt_help: "لكتابة prompt احترافي، اتبع هذه النصائح:

1. **كن محددًا**: حدد الألوان والإضاءة والزاوية
2. **اذكر الأسلوب**: مثل 'oil painting' أو 'photorealistic'
3. **أضف التفاصيل**: الحالة المزاجية، الزمان، المكان
4. **استخدم سلبي prompt**: حدد ما لا تريده

مثال:
`A majestic wolf standing on a rocky cliff at sunset, golden hour lighting, cinematic composition, photorealistic, 8K detail`",
  model_recommend: "اختيار النموذج يعتمد على نوع الصورة:

🖼️ **DALL·E 3**: أفضل للصور الواقعية والفوتوغرافية
🎨 **Stable Diffusion**: ممتاز للتنوع والإبداع
⚡ **FLUX.1**: أحدث النماذج، جودة عالية جدًا
🌟 **Midjourney**: للأعمال الفنية والإبداعية
🔍 **Imagen 3**: من Google، واقعية مذهلة
✍️ **Ideogram 2**: الأفضل في كتابة النص على الصور",
  style_tips: "أنماط رائعة يمكنك تجربتها:

• **Photorealistic**: صور واقعية مذهلة
• **Cinematic**: تأثير أفلامي مع إضاءة drama
• **Anime**: أسلوب أنمي ياباني
• **Oil Painting**: لوحات زيتية كلاسيكية
• **3D Render**: نماذج ثلاثية الأبعاد
• **Watercolor**: رسومات مائية ناعمة",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes("مرحبا") || lower.includes("hello") || lower.includes("hi")) {
    return aiResponses.greeting;
  }
  if (lower.includes("prompt") || lower.includes("وصف") || lower.includes("كيف") && lower.includes("اكتب")) {
    return aiResponses.prompt_help;
  }
  if (lower.includes("نموذج") || lower.includes("model") || lower.includes("أي") && lower.includes("أفضل")) {
    return aiResponses.model_recommend;
  }
  if (lower.includes("نمط") || lower.includes("style") || lower.includes("نوع")) {
    return aiResponses.style_tips;
  }
  
  return `شكرًا لسؤالك! 😊

يمكنني مساعدتك في:
• كتابة prompts احترافية
• اختيار النموذج المناسب
• نصائح للحصول على صور أفضل

جرّب أن تسألني عن نموذج معين أو اطلب مساعدة في كتابة وصف لصورتك!`;
}

function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: aiResponses.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }

  function handleQuickAction(prompt: string) {
    setInput(prompt);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Bot className="size-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">AI Assistant</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          مساعدك الذكي لاختيار النماذج وكتابة الـ prompts الاحترافية
        </p>
      </div>

      <Card className="border-border/60 bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">المحادثة</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setMessages([{ id: "1", role: "assistant", content: aiResponses.greeting, timestamp: new Date() }])}>
              <RefreshCw className="size-4" />
              <span className="hidden sm:inline">New chat</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "assistant"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "assistant"
                        ? "bg-secondary/60 text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="size-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-secondary/60 px-4 py-3">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">يكتب...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب سؤالك هنا... (Type your message...)"
              rows={1}
              className="resize-none"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon" className="shrink-0">
              <Send className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <p className="mb-4 text-center text-sm font-medium text-muted-foreground">إجراءات سريعة</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.prompt)}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <action.icon className="size-5 text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Badge variant="outline" className="px-3 py-1">DALL·E 3</Badge>
        <Badge variant="outline" className="px-3 py-1">Stable Diffusion</Badge>
        <Badge variant="outline" className="px-3 py-1">FLUX.1</Badge>
        <Badge variant="outline" className="px-3 py-1">Midjourney</Badge>
        <Badge variant="outline" className="px-3 py-1">Imagen 3</Badge>
        <Badge variant="outline" className="px-3 py-1">Ideogram 2</Badge>
      </div>
    </div>
  );
}
