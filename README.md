# Ant Design 6 + Tailwind CSS 4 企业级管理后台设计系统

> 为 AI Agents（Claude/Cursor/Copilot）准备的现代化企业级管理后台设计规范

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-v6-orange)

## 🎯 设计理念

- **双模式优先**：浅色/深色同等第一，无需手动处理 `dark:`
- **Token 驱动**：所有样式源于 AntD Design Token，零硬编码色值
- **三层架构**：AntD Token → CSS Variable → Tailwind Class
- **零耦合**：纯技术标准，不依赖任何业务字段
- **AI 友好**：结构化数据、可执行规则、查阅顺序明确

---

## 📦 使用方式

### 方式 A：克隆整个设计规范

```bash
git clone https://github.com/zhenbei/antd-tailwind-admin-design.git
```

### 方式 B：直接复制所需文件

```bash
# 复制样式文件
cp -r tokens/* your-project/src/styles/

# 复制组件
cp -r components/* your-project/src/components/

# 复制页面模板
cp -r pages/* your-project/src/pages/
```

---

## 🚀 快速上手

### 三步让 AI 懂你的设计系统

**1. 复制配置文件**

```bash
cp tokens/tokens.css your-project/src/styles/
cp tokens/styles.css your-project/src/styles/
```

**2. 在入口组件包裹 ConfigProvider**

```tsx
import { ConfigProvider, theme } from 'antd';
import './styles/styles.css';

export default function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <App />
    </ConfigProvider>
  );
}
```

**3. 配置 Tailwind CSS v4**

```css
/* 你的主 CSS 文件，如 src/styles/index.css */
@import "tailwindcss";
@import "./tokens/tokens.css";

@theme {
  /* 引用 AntD Token */
  --color-primary: var(--ant-primary-color);
  --color-success: var(--ant-success-color);
  --color-warning: var(--ant-warning-color);
  --color-error: var(--ant-error-color);
  
  /* 语义化变量 */
  --bg-background: var(--ant-color-bg-container);
  --text-primary: var(--ant-text-color);
}
```

**4. 告诉 AI "按 DESIGN.md 规范开发"**

```
请阅读 /path/to/DESIGN.md，按照设计规范开发页面。具体参考 README 中的 AI 使用指引。
```

---

## 📁 文件索引

| 文件 | 用途 | AI 何时查阅 |
|------|------|------------|
| **DESIGN.md** | 完整设计规范（9节） | 所有任务先读这个 |
| **tokens/tokens.css** | CSS 变量桥接层 | 自定义 Token 或扩展样式时参考 |
| **tokens/styles.css** | Tailwind v4 样式入口 | 设置 Tailwind v4 配置时参考 |
| **components/** | 组件实现和使用示例 | 开发自定义组件时参考 |
|   ├── **\*.tsx** | 可复用的组件代码 | 直接导入使用 |
|   └── **\*.example.yaml** | 组件使用指南 | 了解正确用法和常见错误 |
| **pages/** | 页面模板 | 创建新页面时参考 |
| **llm.txt** | AI 入口文件 | 系统级配置和概览 |
| **CHANGELOG.md** | 版本更新历史 | 了解版本变更 |
| **CONTRIBUTING.md** | 贡献指南 | 参与开发时参考 |
| **LICENSE** | 许可证 | 法律信息 |
| **MAINTAINERS.md** | 维护者指南 | 维护项目时参考 |

---

## 🤖 AI 使用指引

### 生成 UI 代码时的查阅顺序

**优先级从高到低**：

1. 📖 **读 DESIGN.md** → 摘取设计原则和约束规则
2. 🎨 **用 Token** → 查阅「Color & Token System」
3. 🧩 **选组件** → 查阅「Component Standards」
4. 📐 **做布局** → 查阅「Layout Architecture」
5. 🌓 **处理暗黑模式** → 参考「Dark Mode 非检查清单」

### 强制规则（必须遵守）

- ❌ **禁止**硬编码任何颜色/字号/间距值（如 `#1677ff`、`14px`）
- ✅ **必须**使用 `theme.useToken()` 获取 Token，或用语义类 `bg-background`/`text-foreground`
- ⚠️ **冲突时** → 查阅「设计原则冲突解决矩阵」

### 审查 UI 代码时的检查清单

- [ ] 是否有硬编码的颜色值？（应改用 `token.colorPrimary` 或 `bg-background`）
- [ ] 是否用了 `dark:` Tailwind 前缀？（Token 自动处理，应删除）
- [ ] 是否违反了 Component Standards 的 Do/Don't 规则？
- [ ] 是否符合 Responsive & Accessibility 的无障碍要求？
- [ ] 深色模式是否通过 `ConfigProvider.algorithm` 切换？

---

## 🧠 设计原则速查

| 原则 | 冲突时优先 | 理由 |
|------|-----------|------|
| **清晰优先于美观** | 清晰优先 | 3 秒内理解意图比视觉精致更重要 |
| **性能 vs 一致性** | 视情况而定 | 关键路径优先性能，非关键路径优先一致性 |
| **包容性 > 装饰** | 包容性优先 | 无障碍是硬性要求，装饰可移除 |

---

## 🌳 样式决策树

```
这是布局问题吗？
 └─ YES → 用 PageContainer → ContentSurface → content 三层结构
 └─ NO → 这是组件吗？
      └─ YES → 用 AntD 组件（不手写 div + Tailwind）
      └─ NO → 这是颜色/边框/背景吗？
          └─ YES → 用 Token（theme.useToken() 或语义类）
          └─ NO → 这是响应式问题？
              └─ YES → 用 AntD Grid 断点 + Tailwind 响应式类
              └─ NO → 检查 DESIGN.md Do/Don't 规则
```

---

## 📚 参考资源

### 官方资源
- [Ant Design 官方 llms.txt](https://ant.design/docs/react/llms-cn) —— AI 专用设计说明
- [Ant Design MCP Server](https://ant.design/docs/react/mcp-cn) —— MCP 集成方式
- [Ant Design CLI](https://ant.design/docs/react/cli-cn) —— 命令行工具
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs/installation) —— 官方文档
- [Tailwind CSS v4 升级指南](https://tailwindcss.com/blog/tailwindcss-v4) —— 从 v3 升级到 v4

### 社区资源
- [getdesign.md 规范](https://getdesign.md/linear.app/design-md) —— 此技能遵循的格式
- [Ant Design Pro](https://pro.ant.design/) —— 企业级中后台前端/设计解决方案
- [ProComponents](https://procomponents.ant.design/) —— 高级组件库

### 技术博客
- [Ant Design v6 + Tailwind CSS 最佳实践](https://ant.design/docs/react/upgrade-cn) —— 升级指南
- [Tailwind CSS v4 新特性](https://tailwindcss.com/blog/tailwindcss-v4) —— 新功能详解

---

## 🚀 快速示例

### 创建一个标准的列表页面

```tsx
import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span className={status === 'active' ? 'color-success' : 'color-error'}>
        {status === 'active' ? '启用' : '禁用'}
      </span>
    ),
  },
];

const dataSource = [
  { key: '1', name: '用户管理', status: 'active' },
  { key: '2', name: '权限管理', status: 'inactive' },
];

function UserList() {
  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <h1 className="text-2xl font-bold mb-4">用户列表</h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={{
          total: 100,
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default UserList;
```

### 使用语义化样式

```tsx
// ✅ 正确：使用语义化类
<div className="bg-background border border-border rounded-lg">
  <h2 className="text-primary font-semibold">标题</h2>
  <p className="text-tertiary">副标题</p>
</div>

// ❌ 错误：硬编码样式
<div style={{ 
  backgroundColor: '#ffffff', 
  border: '1px solid #d9d9d9',
  borderRadius: '6px'
}}>
  ...
</div>
```

---

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎贡献代码！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

## 📞 联系方式

- GitHub Issues: [提交问题](https://github.com/zhenbei/antd-tailwind-admin-design/issues)
- Email: [your-email@example.com](mailto:your-email@example.com)
