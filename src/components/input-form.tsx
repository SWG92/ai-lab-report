"use client";

import { useActionState, useState } from "react";
import { FlaskConical, Loader2, Wand2, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateReport } from "@/lib/actions";
import type { GenerateState } from "@/lib/types";
import { ResultCard } from "./result-card";

const initialState: GenerateState = { success: false };

const EXAMPLES = [
  {
    label: "物理实验",
    courseName: "大学物理实验",
    experimentName: "用牛顿环测量透镜曲率半径",
    experimentSteps: "1. 将平凸透镜放在平面玻璃板上\n2. 用钠光灯照射，观察干涉条纹\n3. 用测微目镜测量各环直径\n4. 记录数据并计算曲率半径",
  },
  {
    label: "编程实验",
    courseName: "数据结构与算法",
    experimentName: "二叉搜索树的实现与操作",
    experimentSteps: "1. 定义二叉树节点结构\n2. 实现插入操作\n3. 实现中序遍历\n4. 实现查找和删除操作\n5. 测试各种操作的正确性",
  },
  {
    label: "化学实验",
    courseName: "大学化学实验",
    experimentName: "醋酸电离度和电离常数的测定",
    experimentSteps: "1. 配制不同浓度的醋酸溶液\n2. 用pH计测量各溶液的pH值\n3. 计算电离度\n4. 根据公式计算电离常数Ka\n5. 分析实验误差",
  },
];

export function InputForm() {
  const [state, formAction, pending] = useActionState(
    generateReport,
    initialState
  );
  const [courseName, setCourseName] = useState("");
  const [experimentName, setExperimentName] = useState("");
  const [experimentSteps, setExperimentSteps] = useState("");

  function handleExample(example: (typeof EXAMPLES)[0]) {
    setCourseName(example.courseName);
    setExperimentName(example.experimentName);
    setExperimentSteps(example.experimentSteps);
  }

  function handleReset() {
    setCourseName("");
    setExperimentName("");
    setExperimentSteps("");
  }

  const hasContent = courseName || experimentName || experimentSteps;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Card className="border-border/50 bg-card/70 backdrop-blur-md card-glow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            填写实验信息
          </CardTitle>
          {hasContent && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground cursor-pointer"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              清空
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-5">
          <form action={formAction} id="report-form" className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="courseName">课程名称</Label>
              <Input
                id="courseName"
                name="courseName"
                placeholder="例如：大学物理实验"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experimentName">实验名称</Label>
              <Input
                id="experimentName"
                name="experimentName"
                placeholder="例如：用牛顿环测量透镜曲率半径"
                value={experimentName}
                onChange={(e) => setExperimentName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experimentSteps">实验步骤</Label>
              <Textarea
                id="experimentSteps"
                name="experimentSteps"
                placeholder="简要描述你做的实验步骤，每步一行..."
                rows={5}
                value={experimentSteps}
                onChange={(e) => setExperimentSteps(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full cursor-pointer"
              size="lg"
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  生成实验报告
                </>
              )}
            </Button>
          </form>

          {!hasContent && !state.success && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                试试这些示例
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((example) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => handleExample(example)}
                    className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {pending && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary/50 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          </div>
          <p className="text-muted-foreground text-sm animate-pulse">
            AI 正在生成实验报告...
          </p>
        </div>
      )}

      {!pending && state.error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          {state.error}
        </div>
      )}

      {!pending && state.success && state.data && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultCard data={state.data} />
        </div>
      )}
    </div>
  );
}
