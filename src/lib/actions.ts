"use server";

import type { ReportInput, GenerateState } from "./types";

const API_URL = "https://api.siliconflow.cn/v1/chat/completions";

function buildPrompt(input: ReportInput): string {
  return `你是一位大学实验报告写作助手。请根据以下信息，生成一份完整的实验报告。

课程名称：${input.courseName}
实验名称：${input.experimentName}
实验步骤：${input.experimentSteps}

请严格按照以下四个部分输出，每部分使用"### "作为标题前缀：

### 实验目的
（简明扼要地说明本实验要达到的目标）

### 实验原理
（阐述实验涉及的理论基础和原理）

### 实验步骤
（根据用户提供的步骤，整理成清晰有序的实验操作流程）

### 实验总结
（总结实验结果、收获和可能的改进建议）

注意：
- 语言专业、规范
- 内容充实但不冗长
- 适合大学生实验报告水平
- 数学公式使用 LaTeX 格式：行内公式用 $...$，独立公式用 $$...$$`;
}

const MAX_FIELD_LENGTH = 2000;

function getField(fd: FormData, key: string): string | null {
  const val = fd.get(key);
  if (typeof val !== "string" || !val.trim()) return null;
  return val.trim().slice(0, MAX_FIELD_LENGTH);
}

export async function generateReport(
  _prevState: GenerateState,
  formData: FormData
): Promise<GenerateState> {
  const courseName = getField(formData, "courseName");
  const experimentName = getField(formData, "experimentName");
  const experimentSteps = getField(formData, "experimentSteps");

  if (!courseName || !experimentName || !experimentSteps) {
    return { success: false, error: "请填写所有字段" };
  }

  const input: ReportInput = {
    courseName,
    experimentName,
    experimentSteps,
  };

  const apiKey = process.env.SILICONFLOW_API_KEY;
  if (!apiKey) {
    return { success: false, error: "服务端未配置 SILICONFLOW_API_KEY" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V3",
        messages: [{ role: "user", content: buildPrompt(input) }],
        temperature: 0.7,
        max_tokens: 2048,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return { success: false, error: "AI 服务暂时不可用，请稍后重试" };
    }

    const json = await response.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";

    const sections = parseSections(content);

    if (!sections) {
      return {
        success: false,
        error: "AI 返回内容格式异常，请重试",
      };
    }

    return { success: true, data: sections };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { success: false, error: "请求超时，请重试" };
    }
    return { success: false, error: "生成失败，请稍后重试" };
  } finally {
    clearTimeout(timeout);
  }
}

function parseSections(text: string) {
  const purposeMatch = text.match(
    /###\s*实验目的\s*([\s\S]*?)(?=###\s*实验原理|$)/
  );
  const principleMatch = text.match(
    /###\s*实验原理\s*([\s\S]*?)(?=###\s*实验步骤|$)/
  );
  const stepsMatch = text.match(
    /###\s*实验步骤\s*([\s\S]*?)(?=###\s*实验总结|$)/
  );
  const summaryMatch = text.match(/###\s*实验总结\s*([\s\S]*)/);

  if (!purposeMatch || !principleMatch || !stepsMatch || !summaryMatch) {
    return null;
  }

  return {
    purpose: purposeMatch[1].trim(),
    principle: principleMatch[1].trim(),
    steps: stepsMatch[1].trim(),
    summary: summaryMatch[1].trim(),
  };
}
