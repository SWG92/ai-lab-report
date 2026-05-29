import { Sparkles } from "lucide-react";
import { InputForm } from "@/components/input-form";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 relative z-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,oklch(0.65_0.25_270/0.12),transparent)]" />

      <div className="relative mx-auto max-w-2xl space-y-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">
            <Sparkles className="h-3 w-3" />
            AI 驱动
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl gradient-text">
            AI 实验报告助手
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            输入课程名称、实验名称和实验步骤，AI 帮你快速生成规范的实验报告
          </p>
        </header>

        <InputForm />

        <footer className="text-center text-xs text-muted-foreground/40 pb-4">
          Powered by SiliconFlow &middot; DeepSeek-V3
        </footer>
      </div>
    </main>
  );
}
