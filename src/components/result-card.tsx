"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Check, Copy, Target, Lightbulb, ListOrdered, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportOutput } from "@/lib/types";
import "./result-card.css";

const SECTIONS: { key: keyof ReportOutput; label: string; icon: React.ElementType; color: string }[] = [
  { key: "purpose", label: "实验目的", icon: Target, color: "text-blue-500" },
  { key: "principle", label: "实验原理", icon: Lightbulb, color: "text-amber-500" },
  { key: "steps", label: "实验步骤", icon: ListOrdered, color: "text-green-500" },
  { key: "summary", label: "实验总结", icon: FileText, color: "text-purple-500" },
];

export function ResultCard({ data }: { data: ReportOutput }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fullText = useMemo(
    () =>
      SECTIONS.map((s) => `## ${s.label}\n\n${data[s.key]}`).join(
        "\n\n---\n\n"
      ),
    [data]
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  return (
    <Card className="border-border/50 bg-card/70 backdrop-blur-md card-glow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">生成结果</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5 text-green-500" />
              已复制
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              复制全部
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-0">
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={section.key}>
              {index > 0 && (
                <div className="border-t border-border/50 my-5" />
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-muted ${section.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold">{section.label}</h3>
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground prose prose-sm max-w-none dark:prose-invert handwrite-math pl-10">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {data[section.key]}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
