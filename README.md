# AI 实验报告助手

> 输入实验信息，AI 帮你快速生成规范的实验报告。

## 功能特性

- 🤖 基于 DeepSeek-V3 大模型，生成专业实验报告
- 📐 支持 LaTeX 数学公式渲染
- 🌙 支持暗色模式
- ⚡ 一键复制生成结果
- 📱 响应式设计，支持手机端
- 🎨 科技风 UI，星空粒子动画

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | TailwindCSS |
| 组件 | shadcn/ui |
| AI | 硅基流动 API (DeepSeek-V3) |
| 公式 | react-markdown + KaTeX |
| 部署 | Vercel |

## 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/SWG92/ai-lab-report.git
cd ai-lab-report

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的硅基流动 API Key

# 4. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可使用。

## 获取 API Key

1. 前往 [硅基流动](https://cloud.siliconflow.cn) 注册账号
2. 进入 [API 密钥](https://cloud.siliconflow.cn/account/ak) 页面
3. 新建密钥并复制
4. 新用户有免费额度，可直接使用

## 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入该仓库
3. 在 **Settings → Environment Variables** 中添加：
   - Key: `SILICONFLOW_API_KEY`
   - Value: 你的 API Key
4. 点击 Deploy

## 项目结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局（主题、星空背景）
│   ├── page.tsx            # 首页
│   ├── error.tsx           # 错误边界
│   └── globals.css         # 全局样式
├── components/
│   ├── ui/                 # shadcn/ui 组件
│   ├── input-form.tsx      # 输入表单 + 示例
│   ├── result-card.tsx     # 结果展示 + 复制
│   ├── star-field.tsx      # 星空粒子动画
│   └── theme-toggle.tsx    # 暗色模式切换
└── lib/
    ├── types.ts            # TypeScript 类型
    ├── actions.ts          # Server Action (API 调用)
    └── utils.ts            # 工具函数
```

## License

MIT
