# Ant Design 6 + Tailwind CSS 4 企业级管理后台设计系统

> 为 AI Agents（Claude/Cursor/Copilot）准备的现代化企业级管理后台设计规范

---

## 1. Visual Theme & Atmosphere

企业级管理后台的设计哲学是 **专业、高效、可信赖** — 一个让用户能够快速完成任务、零干扰的工作环境。这不是追求视觉冲击力的消费级产品，而是追求信息密度与操作效率平衡的生产力工具。界面本身应该退居幕后，让数据和操作成为主角。

设计的核心是 **双模式平等** — 浅色模式和深色模式不是主次关系，而是同等重要的两种呈现方式。通过 Ant Design 6 的 Token 系统和 algorithm 机制，两种模式自动切换，无需开发者手动干预。这体现了"技术隐形"的理念：主题切换应该像呼吸一样自然，不需要用户思考，也不需要开发者编写 `dark:` 前缀。

三层架构构成了这个设计系统的技术基础：**AntD Token（运行时主题） → CSS Variable（桥接层） → Tailwind Class（编译时样式）**。所有颜色、圆角、阴影、间距都源于 Token，零硬编码。这意味着当你切换主题时，整个应用的所有元素都会同步响应 — 从按钮的背景到表格的边框，从文字的颜色到卡片的阴影。

**Key Characteristics:**
- Ant Design 6 组件生态 — 企业级交互组件的完整实现
- Token 驱动样式系统 — 所有样式源于 ConfigProvider.theme
- 双模式自动切换 — algorithm 控制浅色/深色，零手动处理
- 三层样式架构 — AntD Token → CSS Variable → Tailwind Class
- 语义化样式类 — bg-background、text-foreground 等可读性强的类名
- ProTable 数据密集视图 — 企业级列表页面的标准组件

---

## 2. Color Palette & Token System

所有颜色都从 Ant Design Token 中派生。以下值是默认值 — 深色模式的值由 algorithm 自动计算。

### Background Surfaces

| 语义名称 | CSS 变量 | AntD Token | 浅色默认值 | 深色默认值 | 用途 |
|---------|---------|-----------|-----------|-----------|-----|
| Page Background | `--color-background` | `token.colorBgLayout` | `#f5f5f5` | `#141414` | 外层页面画布 |
| Container Surface | `--color-surface` | `token.colorBgContainer` | `#ffffff` | `#1f1f1f` | 卡片、ContentSurface 背景 |
| Elevated Surface | `--color-bg-elevated` | `token.colorBgElevated` | `#ffffff` | `#262626` | 下拉框、弹出层 |
| Spotlight | `--color-bg-spotlight` | `token.spotlight` | — | — | 高亮叠加层 |

### Text & Content

| 语义名称 | CSS 变量 | AntD Token | 浅色默认值 | 用途 |
|---------|---------|-----------|-----------|-----|
| Primary Text | `--color-foreground` | `token.colorText` | `rgba(0,0,0,0.88)` | 标题、主要内容 |
| Secondary Text | `--color-muted-foreground` | `token.colorTextSecondary` | `rgba(0,0,0,0.65)` | 描述文字、副标题 |
| Tertiary Text | `--color-text-tertiary` | `token.colorTextTertiary` | `rgba(0,0,0,0.45)` | 占位符、提示文字 |
| Quaternary Text | `--color-text-quaternary` | `token.colorTextQuaternary` | `rgba(0,0,0,0.25)` | 禁用状态、时间戳 |

### Brand & Accent

| 角色 | AntD Token | 浅色值 | 用途 |
|-----|-----------|-------|-----|
| Primary | `token.colorPrimary` | `#1677ff` | 主要操作按钮、激活状态、链接 |
| Primary Hover | `token.colorPrimaryHover` | `#4096ff` | 主要元素悬停状态 |
| Info | `token.colorInfo` | `#1677ff` | 信息提示标识 |
| Success | `token.colorSuccess` | `#52c41a` | 成功状态、确认标识 |
| Warning | `token.colorWarning` | `#faad14` | 警告状态 |
| Error/Destructive | `token.colorError` | `#ff4d4f` | 错误状态、危险操作 |

### Borders

| 语义名称 | CSS 变量 | AntD Token | 浅色默认值 | 用途 |
|---------|---------|-----------|-----------|-----|
| Base Border | `--color-border` | `token.colorBorder` | `#d9d9d9` | 标准边框 |
| Light Border | `--color-border-light` | `token.colorBorderSecondary` | `#f0f0f0` | 轻微分隔线 |

### Token Usage Examples

```typescript
// ✅ 正确：使用 theme.useToken()
import { theme } from 'antd';

const { token } = theme.useToken();

const styles = {
  backgroundColor: token.colorBgContainer,
  color: token.colorText,
  borderColor: token.colorBorder,
};

// ✅ 正确：使用语义类
<div className="bg-background text-foreground border-border">
  内容区域
</div>

// ❌ 错误：硬编码值
<div style={{ backgroundColor: '#1677ff', color: '#fff' }}>
  错误示例
</div>
```

---

## 3. Typography Rules

### Font Family

- **Primary**: Ant Design 系统字体栈 — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` — 用于代码片段和 ID
- CSS 变量: `--font-sans` / `--font-mono`

### Hierarchy (AntD defaults, via ProPageContainer)

| 角色 | 字号 | 字重 | Token 引用 | 用途 |
|-----|------|------|----------|-----|
| Page Title | 20px | 600 | ProPageContainer title | `<PageContainer title="...">` |
| Section Title | 16px | 600 | `Typography.Title level={5}` | 内容区域内的小节标题 |
| Body | 14px | 400 | Default | 标准正文 |
| Body Emphasis | 14px | 500 | — | 标签、强调内容 |
| Secondary Text | 14px | 400 | `type="secondary"` | 描述文字 |
| Caption | 12px | 400 | — | 元数据、辅助信息 |
| Code/ID | 12–14px | 400 | `--font-mono` | `<code>` 标签包裹 ID |

### Principles

- 不要覆盖 AntD 默认字号 — 14px 基准对企业级工具是正确的
- 使用 `Typography.Title level={5}` 作为内容内的小节标题
- 使用 `Typography.Text type="secondary"` 作为描述文字
- 用 `<code>` 标签包裹 ID/代码，并添加 `className="text-xs font-mono"`
- 不要使用自定义字重 — AntD 通过组件管理字重

---

## 4. Component Stylings

### Buttons (AntD Button — 永不自定义)

| 变体 | 用途 | 示例 |
|-----|------|-----|
| Primary | 主要 CTA | `<Button type="primary">创建</Button>` |
| Default | 次要操作 | `<Button>取消</Button>` |
| Text/Link | 行内操作 | `<Button type="link" size="small">编辑</Button>` |
| Danger | 危险操作 | `<Button danger>删除</Button>` |
| Icon Only | 工具栏按钮 | `<Button icon={<PlusOutlined />} />` |

**Rules:**
- 永远不要用 `<button>` + Tailwind 类构建按钮
- 图标按钮使用 `icon` 属性，不要把 `<Icon />` 放在 children 里
- 危险操作需要 `Popconfirm` 包裹

### Cards & Surfaces

**ContentSurface** 是标准卡片包裹层：

```
Background: token.colorBgContainer (自动浅色/深色)
Border: 1px solid token.colorBorderSecondary (自动浅色/深色)
Border Radius: 8px (via Tailwind rounded-lg)
Padding: 24px 默认 / 0 给表格用
```

- `padding="default"` — 用于内容页面、表单
- `padding="none"` — 用于 ProTable（表格自带内边距）
- `width="narrow"` — 添加 `max-w-5xl` 用于聚焦内容

### Tables (ProTable — 所有列表页的标准)

```tsx
<ProTable<YourEntity>
  columns={columns}
  dataSource={data?.records || []}
  loading={isLoading}
  rowKey="id"
  search={{ labelWidth: 'auto' }}
  scroll={{ x: 'max-content' }}
  pagination={{
    current: data?.current || 1,
    pageSize: data?.pageSize || 10,
    total: data?.total || 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }}
/>
```

**Rules:**
- 总是使用 `ProTable`，永远不要在数据列表中使用原始 `Table`
- `scroll={{ x: 'max-content' }}` 防止列被压缩
- 状态列使用 `valueType: 'select'` 配合 `valueEnum`
- 操作列：`fixed: 'right'`, `hideInSearch: true`
- 包裹在 `<ContentSurface padding="none">` 中

### Forms (AntD Form — 在 Drawer 中)

```tsx
<Drawer
  title="创建"
  open={open}
  onClose={handleClose}
  width={480}
  destroyOnClose
  styles={{
    body: { padding: 24, paddingBottom: 8 },
    footer: { borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 24px' },
  }}
  footer={
    <div className="flex items-center justify-end gap-3">
      <Button onClick={handleClose}>取消</Button>
      <Button type="primary" loading={isPending} onClick={handleSubmit}>确认</Button>
    </div>
  }
>
  <Form form={form} layout="vertical" preserve={false}>
    <Form.Item label="名称" name="name" rules={[{ required: true, message: '必填' }]}>
      <Input placeholder="请输入名称" />
    </Form.Item>
  </Form>
</Drawer>
```

**Rules:**
- `destroyOnClose` + `preserve={false}` — 必须，用于重置表单状态
- Footer 边框使用 `rgba(255, 255, 255, 0.08)` — 在浅色和深色模式下都有效
- Footer 按钮：`flex justify-end gap-3` 通过 Tailwind 实现
- 表单 `layout="vertical"` — 必须，横向标签仅用于搜索筛选

### Detail Views (Descriptions)

```tsx
<Descriptions column={2} bordered className="mb-4">
  <Descriptions.Item label="名称">{data.name}</Descriptions.Item>
  <Descriptions.Item label="状态">
    <Badge status="success" text="启用" />
  </Descriptions.Item>
  <Descriptions.Item label="描述" span={2}>{data.description || '-'}</Descriptions.Item>
</Descriptions>
```

**Rules:**
- 使用 `Descriptions` 展示键值对，永远不要手写 div 网格
- `column={2}` 标准，`span={2}` 用于全宽度项
- 空/null 值总是显示 `-`
- 状态使用 `<Badge>` 或 `<Tag>`，永远不要纯文本

### Navigation — DetailPageShell

```
┌─────────────────────────────────────────┐
│ PageContainer (面包屑 + 标题 + 返回)     │
│ ┌─────────────────────────────────────┐ │
│ │ ContentSurface padding="none"       │ │
│ │ ┌──────────┬────────────────────┐   │ │
│ │ │ Menu     │ Content            │   │ │
│ │ │ (240px)  │ (flex-1, p-6)     │   │ │
│ │ │          │                    │   │ │
│ │ └──────────┴────────────────────┘   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- 左侧菜单：240px 宽度，`Menu mode="inline"`，右边框
- 移动端：自动切换为 `mode="horizontal"`
- 标签内容：`p-4 md:p-6 lg:p-8` 响应式内边距

---

## 5. Layout Principles

### Page Structure (每个页面都遵循)

```
Route Component
  └── Wrapper (权限检查 → ForbiddenPage 或内容)
       └── PageContainer (面包屑、标题、操作按钮)
            └── ContentSurface (带边框/背景的卡片)
                 └── 页面具体内容
```

### Spacing System

所有间距都遵循 AntD Token 系统：

| Token | 值 | Tailwind 等价 | 用途 |
|-------|-----|-------------|------|
| `token.paddingXXS` | 4px | p-1 | 紧凑间距 |
| `token.paddingXS` | 8px | p-2 | 小间距 |
| `token.paddingSM` | 12px | p-3 | 表单项间距 |
| `token.padding` | 16px | p-4 | 默认间距 |
| `token.paddingMD` | 20px | p-5 | 中等间距 |
| `token.paddingLG` | 24px | p-6 | 内容内边距 |
| `token.paddingXL` | 32px | p-8 | 区块间距 |

### Border Radius Scale (from tokens.css)

| Token | 值 | Tailwind 等价 | 用途 |
|-------|-----|-------------|------|
| `--radius-sm` | 2px | rounded-sm | Badge、Tag |
| `--radius-md` | 4px | rounded | 小元素 |
| `--radius-lg` | 6px | rounded-md | 按钮、输入框（AntD 默认）|
| `--radius-xl` | 10px | rounded-xl | 卡片 |
| `--radius-2xl` | 14px | rounded-2xl | 大面板 |
| `--radius-full` | 9999px | rounded-full | 胶囊、头像 |

### Grid & Container

- 内容区：流式宽度，默认无最大宽度限制
- `ContentSurface width="narrow"`：max-w-5xl (1024px) 用于聚焦表单
- ProTable：全宽，通过 `scroll={{ x: 'max-content' }}` 实现横向滚动
- 详情页左侧菜单：240px 固定宽度，内容区 flex-1

### Whitespace Philosophy

- **浅色模式**：留白即留白 — `colorBgLayout (#f5f5f5)` 提供画布，`colorBgContainer (#ffffff)` 提供卡片表面
- **深色模式**：深色即留白 — `colorBgLayout (#141414)` 画布，`colorBgContainer (#1f1f1f)` 表面
- 内容总是放在 `ContentSurface` 内 — 永远不要直接浮在页面背景上
- 两层深度（页面背景 → 卡片背景）足够，避免卡片内再嵌套卡片

---

## 6. Depth & Elevation

| 层级 | 处理方式 | 用途 |
|-----|---------|------|
| Level 0 — Page | `token.colorBgLayout` 背景，无阴影 | 外层画布 |
| Level 1 — Surface | `token.colorBgContainer` 背景 + `token.colorBorderSecondary` 边框 + `rounded-lg` | ContentSurface、卡片 |
| Level 2 — Elevated | `token.colorBgElevated` 背景 | 下拉框、弹出层（AntD 管理）|
| Level 3 — Overlay | Drawer/Modal 带背景遮罩 | 表单、确认对话框（AntD 管理）|

**Shadow Philosophy:**
AntD 为其组件内部管理所有阴影。项目不为布局层定义自定义阴影。`ContentSurface` 使用边框而非阴影来界定边缘。

CSS Token 层定义了阴影（`--shadow-sm` 到 `--shadow-xl`），但这些保留用于特殊情况 — 不用于标准页面布局。

---

## 7. Do's and Don'ts

### Do

- 通过 `style={{}}` 使用 `token.colorBgContainer` / `token.colorText` / `token.colorBorder` 获取所有主题值
- 在 `PageContainer` 内使用 `ContentSurface` 作为内容包裹层
- 所有数据列表使用 `ProTable` — 它处理搜索、分页和加载
- 详情键值对展示使用 `Descriptions`
- 创建/编辑操作使用 `Drawer` + `Form`
- 仅用于布局时使用 Tailwind `className`：`flex`, `gap-*`, `p-*`, `mb-*`, `items-center`, `justify-between`
- 使用 `useActionAccess()` 进行按钮级权限控制
- 使用 `<Typography.Text type="secondary">` 作为描述和辅助文字
- Drawer Footer 边框使用 `rgba(255, 255, 255, 0.08)`（两种模式都有效）
- 表格内类型/状态徽章使用 `<Tag color="blue">`
- 描述内状态指示器使用 `<Badge status="success" text="启用">`

### Don't

- 不要硬编码颜色值：`#fff`, `#000`, `#f0f0f0`, `rgb(...)` — 始终使用 Token
- 不要对主题元素使用 Tailwind 颜色工具类：`bg-white`, `text-gray-500`, `border-gray-200`
- 不要使用 Tailwind `dark:` 前缀 — Token 和语义类自动处理深色模式
- 不要用 div + Tailwind 构建 AntD 组件：按钮、卡片、表格、模态框、输入框
- 不要编写重复 AntD reset/base 样式的自定义 CSS
- 不要在 JS/TSX 中手动检查深色模式 — Token 已反映当前模式
- 不要嵌套 `ContentSurface` 到另一个 `ContentSurface` 内
- 不要在 `ProTable` 周围使用 `ContentSurface padding="default"` — 使用 `padding="none"`
- `ProTable` 可用时不要使用 `Table`
- 不要创建独立表单页面 — 表单属于 Drawer
- 不要把 CSS 变量作为主题输入 — `ConfigProvider.theme` 是唯一真理来源
- 不要扩张 CSS 变量桥接层超出文档化的语义 Token

---

## 8. Tailwind CSS 4 Integration

### @theme Directive Configuration

Tailwind CSS 4 使用 `@theme` 指令集成 Ant Design Token：

```css
/* tokens/styles.css */
@import "tailwindcss";
@import "./tokens.css";

@theme {
  /* 引用 AntD Token */
  --color-primary: var(--ant-primary-color);
  --color-success: var(--ant-success-color);
  --color-warning: var(--ant-warning-color);
  --color-error: var(--ant-error-color);

  /* 语义化变量 */
  --bg-background: var(--ant-color-bg-layout);
  --bg-surface: var(--ant-color-bg-container);
  --text-primary: var(--ant-text-color);
  --text-secondary: var(--ant-text-color-secondary);
  --text-tertiary: var(--ant-text-color-tertiary);
  --border-border: var(--ant-color-border);

  /* 圆角 */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-xl: 10px;
  --radius-2xl: 14px;
  --radius-full: 9999px;
}
```

### Application Entry Point

```tsx
// App.tsx
import { ConfigProvider, theme } from 'antd';
import './styles/styles.css';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
        cssVar: {
          prefix: 'ant',
        },
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### Theme Switching

```tsx
// 主题切换示例
import { ConfigProvider, theme } from 'antd';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Button onClick={() => setIsDark(!isDark)}>
        切换{isDark ? '浅色' : '深色'}模式
      </Button>
    </ConfigProvider>
  );
}
```

---

## 8. Responsive Behavior

### Breakpoints (AntD Grid)

| 名称 | 宽度 | 行为 |
|-----|------|------|
| xs | <576px | 移动端 — 单列、堆叠布局 |
| sm | ≥576px | 小平板 |
| md | ≥768px | 平板 — 双列开始、侧边栏可见 |
| lg | ≥992px | 桌面端 — 完整布局 |
| xl | ≥1200px | 大桌面 |
| xxl | ≥1600px | 超宽屏 |

### Key Responsive Patterns

- **Sidebar**：桌面端使用 AntD `Sider`，移动端使用 `Drawer` 覆盖层
- **DetailPageShell**：桌面端 = 左侧菜单 (240px) + 内容，移动端 = 水平标签
- **ContentSurface padding**：`p-4 md:p-6 lg:p-8` — 渐进式内边距增加
- **ProTable**：横向滚动（`scroll={{ x: 'max-content' }}`）处理小屏幕溢出
- **Drawer**：固定宽度 (480px)，无需响应式调整

### Touch Targets

- 所有 AntD 组件默认满足无障碍标准
- 表格操作按钮使用 `size="small"` 配合 `type="link"` 实现紧凑但可点击的目标
- Popconfirm 确保危险操作需要显式确认

---

## 9. Agent Prompt Guide

### Quick Token Reference (import from `theme.useToken()`)

```
Backgrounds:  token.colorBgLayout (页面), token.colorBgContainer (表面), token.colorBgElevated (下拉)
Text:         token.colorText (主要), token.colorTextSecondary (次要), token.colorTextTertiary (弱化)
Borders:      token.colorBorder (标准), token.colorBorderSecondary (浅色)
Primary:      token.colorPrimary, token.colorPrimaryHover, token.colorPrimaryActive
Status:       token.colorSuccess, token.colorWarning, token.colorError
Spacing:      token.paddingSM (12px), token.padding (16px), token.paddingLG (24px)
Radius:       token.borderRadius (6px)
```

### Quick Tailwind Semantic Classes (layout-only)

```
bg-background  → 页面背景 (token.colorBgLayout)
bg-surface     → 卡片背景 (token.colorBgContainer)
text-foreground → 主要文字 (token.colorText)
text-muted-foreground → 次要文字 (token.colorTextSecondary)
text-tertiary → 弱化文字 (token.colorTextTertiary)
border-border → 标准边框 (token.colorBorder)
```

### Example Component Prompts

**List Page with ProTable:**
```
创建一个用户列表页面，路由为 '/users'。使用 ProTable 组件，columns 包含：username（用户名，可排序）、email（邮箱）、status（状态，使用 valueType 'select' 配合 valueEnum：{ active: { text: '启用', status: 'Success' }, inactive: { text: '禁用', status: 'Default' } }）、createdAt（创建时间，可排序）、actions（操作列，fixed: 'right', hideInSearch: true，render 函数包含编辑和删除按钮，使用 Popconfirm 包裹删除）。数据源使用 TanStack Query，queryKey 为 ['users']，分页配置包含 current、pageSize、total、showSizeChanger、showTotal。页面包裹在 PageContainer 中，title 为 '用户列表'，extra 放置创建按钮（通过 useActionAccess('user:create') 权限检查）。
```

**Detail Page with Descriptions:**
```
创建一个用户详情页面，路由为 '/users/:id'。使用 PageContainer 包裹，title 为 '用户详情'，onBack 返回列表页，extra 放置编辑按钮（权限检查 useActionAccess('user:update')）。内容使用 DetailPageShell，左侧菜单包含：基本信息、角色权限、操作日志，使用 useDetailPageNavigation 生成标签。基本信息标签页使用 Descriptions 展示，column={2}，bordered，包含：username（用户名）、email（邮箱）、status（状态，使用 Badge）、createdAt（创建时间）。空值显示 '-'。时间格式使用 formatDate 函数格式化。
```

**Drawer Form:**
```
创建一个用于创建/编辑用户的 Drawer。Drawer 配置：title 根据 isEdit 状态动态显示（'编辑用户' 或 '创建用户'）、width=480、destroyOnClose、open、onClose。styles 配置：body padding 24px、paddingBottom 8px，footer borderTop '1px solid rgba(255, 255, 255, 0.08)'、footer padding '16px 24px'。footer 包含取消和确认按钮，确认按钮使用 Button type="primary" 且 loading 绑定 mutation.isPending。Form 配置 layout='vertical'，preserve={false}，字段包含：username（用户名，Input 组件，必填规则）、email（邮箱，Input 组件，必填规则，type="email"，验证规则）、status（状态，Select 组件，选项：启用/禁用）。使用 initialValues 初始化表单，onFinish 提交 mutation。
```

### Page Templates

**List Page Template:**
```
创建一个列表页面，路由为 '/xxx'。使用以下结构：
1. PageContainer 包裹，title 为页面标题，extra 放置创建按钮（通过 useActionAccess 权限检查）
2. ContentSurface padding="none"
3. ProTable 展示数据，columns 包含状态列（valueType 'select' + valueEnum）和操作列（fixed right, hideInSearch: true）
4. 创建/编辑使用 Drawer + Form，layout="vertical"，destroyOnClose，preserve={false}
5. 权限：routeMetadata 配置 access.permissions，beforeLoad 调用 ensureRouteAccess，Wrapper 根据 access 渲染 ForbiddenPage
6. 数据：使用 TanStack Query，queryKey 格式 ['resource', params]，mutation 成功后 invalidate queries
```

**Detail Page Template:**
```
创建一个详情页面，路由为 '/xxx/$id'。使用以下结构：
1. PageContainer 包裹，onBack 导航返回列表，extra 放置编辑按钮
2. ContentSurface padding="none"
3. DetailPageShell 包裹，使用 useDetailPageNavigation 生成标签菜单
4. 基本信息标签页：Descriptions column={2} bordered，状态使用 Badge，类型使用 Tag，空值显示 '-'
5. 数据：TanStack Query，queryKey ['resource', id]，enabled: !!id
6. 预加载：在 Route.loader 中通过 queryClient.ensureQueryData 预取数据
```

### Style Decision Tree

```
这是布局问题吗（flex, grid, gap, padding, responsive）？
  → YES: 使用 Tailwind className
  → NO: 这是组件问题（button, input, table, modal）吗？
    → YES: 使用 AntD 组件
    → NO: 这是颜色/边框/背景应该跟随主题吗？
      → YES: 使用 token（style={{ background: token.xxx }} 或 theme.useToken()）
      → NO: 这是在错误/独立页面（无 ConfigProvider）上吗？
        → YES: 使用 Tailwind 语义类（bg-background, text-foreground）
        → NO: 重新评估 — 你可能想复杂了
```

### Iteration Guide (生成代码时的检查清单)

每次生成 UI 代码时，按以下顺序检查：

1. **Token 检查**：所有颜色/圆角/间距都使用 token 或语义类，没有硬编码值（#fff, #000, #f0f0f0）
2. **组件检查**：使用 AntD 组件而非 div + Tailwind 模拟（Button 用 Button，Table 用 ProTable）
3. **布局检查**：页面布局用 Tailwind（flex, gap, p-*），组件样式用 AntD
4. **深色模式检查**：没有使用 `dark:` 前缀，Token 自动处理
5. **表单检查**：Form 在 Drawer 中，layout="vertical"，destroyOnClose + preserve={false}
6. **权限检查**：按钮使用 useActionAccess 包裹
7. **分页检查**：ProTable 使用 current、pageSize、total 格式
8. **空值检查**：Descriptions 空值显示 '-'，状态使用 Badge 或 Tag

### Dark Mode Non-Checklist

你不需要：
- 编写 `dark:` Tailwind 前缀
- 在 JavaScript 中检查当前主题模式
- 定义单独的浅色/深色 CSS
- 使用 `@media (prefers-color-scheme: dark)`
- 手动切换任何颜色值

AntD Token + CSS 变量桥接自动处理一切。只需在 ConfigProvider 中切换 algorithm。

---

## 附录

### 设计原则冲突解决矩阵

| 原则 | 冲突时优先级 | 理由 |
|-----|------------|------|
| 清晰优先于美观 | 清晰优先 | 3秒理解意图比视觉精致重要 |
| 性能 vs 一致性 | 关键路径优先性能，非关键路径优先一致性 | 用户体验在关键路径更重要 |
| 包容性 > 装饰 | 包容性优先 | 无障碍是硬性要求，装饰可移除 |

### 参考资源

**官方资源:**
- [Ant Design v6 文档](https://ant.design/) - 官方组件库文档
- [Ant Design v6 定制主题](https://ant.design/docs/react/customize-theme-cn) - 主题系统详解
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs/installation) - 最新版本文档
- [Ant Design MCP Server](https://ant.design/docs/react/mcp-cn) - MCP 集成方式
- [Ant Design CLI](https://ant.design/docs/react/cli-cn) - 命令行工具

**社区资源:**
- [getdesign.md 规范](https://getdesign.md/linear.app/design-md) - 设计规范格式参考
- [ProComponents](https://procomponents.ant.design/) - 高级组件库
