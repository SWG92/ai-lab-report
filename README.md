# AI 实验报告助手

输入实验信息，AI 帮你快速生成规范的实验报告。

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- 硅基流动 SiliconFlow API (DeepSeek-V3 免费模型)

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的硅基流动 API Key

# 3. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可使用。

## 获取 API Key

1. 前往 https://cloud.siliconflow.cn 注册账号
2. 进入 https://cloud.siliconflow.cn/account/ak 获取 API Key
3. 新用户有免费额度，可直接使用

## 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入该仓库
3. 在 Vercel 的 Environment Variables 中添加 `SILICONFLOW_API_KEY`
4. 点击 Deploy

## 项目结构

```
src/
├── app/
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── components/
│   ├── ui/               # shadcn/ui 组件
│   ├── input-form.tsx    # 输入表单
│   ├── result-card.tsx   # 结果展示
│   └── loading-spinner.tsx # 加载动画
└── lib/
    ├── types.ts          # TypeScript 类型
    ├── actions.ts        # Server Action (SiliconFlow API)
    └── utils.ts          # 工具函数
```
