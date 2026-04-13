# Ant Design 6 + Tailwind CSS 4 企业级管理后台设计系统

## 1. 设计理念

### 核心原则
- **双模式优先**：浅色/深色同等第一，无需手动处理 `dark:`
- **Token 驱动**：所有样式源于 AntD Design Token，零硬编码色值
- **三层架构**：AntD Token → CSS Variable → Tailwind Class
- **零耦合**：纯技术标准，不依赖任何业务字段
- **AI 友好**：结构化数据、可执行规则、查阅顺序明确

### 设计哲学
```
前端设计系统 = 设计原则 + 技术实现 + AI 协作
```

设计原则清晰定义"什么"和"为什么"，技术实现回答"如何做"，AI 协作则提供"如何高效协作"的规范。

---

## 2. 颜色与 Token 系统

### Ant Design Token 体系（v6）
```kotlin
// Seed → Map → Alias → Component 的完整链路
Seed (设计种子)
    ↓
TokenMap (映射转换)
    ↓
AliasMap (命名别名)
    ↓
ComponentToken (组件级样式)
```

### 核心颜色 Token
```css
/* tokens/tokens.css - 桥接层定义 */
:root {
  /* 主要颜色 */
  --ant-primary-color: #1677ff;
  --ant-success-color: #52c41a;
  --ant-warning-color: #faad14;
  --ant-error-color: #f5222d;
  --ant-info-color: #1890ff;
  
  /* 中性色 */
  --ant-primary-bg: #e6f7ff;
  --ant-primary-bg-active: #bae7ff;
  --ant-primary-bg-hover: #91caff;
  --ant-primary-color-deprecated-bg: #40a9ff;
  
  /* 文本色 */
  --ant-text-color: rgba(0, 0, 0, 0.88);
  --ant-text-color-secondary: rgba(0, 0, 0, 0.45);
  --ant-text-color-disabled: rgba(0,  Design, 0.25);
}
```

### Token 使用规范
```typescript
// ✅ 正确：使用 theme.useToken()
import { theme } from 'antd';

const { token } = theme.useToken();

const styles = {
  backgroundColor: token.colorPrimary,
  color: token.colorWhite,
  borderColor: token.colorPrimaryBorder,
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

## 3. 组件标准

### 组件选择原则
```markdown
1. 首选 Ant Design 6 官方组件
2. 拒绝使用 Tailwind 模拟 AntD 组件
3. 特殊组件需实现 AntD 设计语言
4. 装饰性组件可使用 Tailwind 自由发挥
```

### 核心组件规范

#### Table 组件
```typescript
import { Table } from 'antd';

// ✅ 正确用法
<Table
  columns={[
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (date: string) => (
        <span className="text-muted-foreground">
          {formatDate(date)}
        </span>
      ),
    },
  ]}
  dataSource={users}
  rowKey="id"
  pagination={{
    total: users.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条`,
  }}
/>
```

#### Button 组件
```typescript
import { Button, Space } from 'antd';

// ✅ 正确：使用语义类
<Space>
  <Button type="primary">主要按钮</Button>
  <Button>默认按钮</Button>
  <Button type="text">文本按钮</Button>
</Space>

// ✅ 正确：配合样式
<Button 
  className="bg-primary-hover hover:bg-primary-active"
  type="primary"
>
  带额外样式的按钮
</Button>
```

### Do/Don't 清单
```markdown
| Do | Don't |
|-----|-------|
| 使用 AntD 组件内置样式 | 用 Tailwind 手写 Button 样式 |
| 使用 `theme.useToken()` | 硬编码颜色值 |
| 语义化命名（bg-background） | 英文硬编码（bg-white） |
| 响应式使用 AntD 断点 | 在 CSS 中自定义断点 |
| 使用 CSS 变量传递 Token | 在 JSX 中内联样式对象 |
```

---

## 4. 布局架构

### 三层布局系统
```typescript
// ✅ 标准页面结构
<PageContainer>
  <div className="ContentSurface">
    <div className="content">
      {/* 页面具体内容 */}
    </div>
  </div>
</PageContainer>
```

### 布局组件规范
```typescript
// Layout/index.tsx
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

// ✅ 正确：使用 AntD Layout 基础组件
<Layout className="min-h-screen">
  <Header className="bg-background border-b">
    顶部导航
  </Header>
  <Layout>
    <Sider className="bg-background border-r">
      侧边栏
    </Sider>
    <Content className="bg-background">
      主内容区
    </Content>
  </Layout>
  <Footer className="bg-background border-t">
    底部信息
  </Footer>
</Layout>
```

### 响应式设计
```typescript
// ✅ 正确：使用 AntD Grid + Tailwind
<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Card className="h-full">响应式卡片</Card>
  </Col>
</Row>
```

---

## 5. 响应式与无障碍

### 响应式断点
```css
/* 与 AntD 保持一致 */
@media (min-width: 576px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 992px) { /* lg */ }
@media (min-width: 1200px) { /* xl */ }
@media (min-width: 1600px) { /* xxl */ }
```

### 无障碍标准
```typescript
// ✅ 必须属性
<Button 
  aria-label="提交表单"
  title="点击提交"
  disabled={!isFormValid}
>
  提交
</Button>

// ✅ 表单标签
<Form.Item
  label="用户名"
  htmlFor="username"
>
  <Input
    id="username"
    aria-required="true"
    aria-describedby="username-error"
  />
</Form.Item>
```

---

## 6. 暗黑模式

### 模式切换方式
```typescript
import { ConfigProvider, theme } from 'antd';

// ✅ 正确：使用 ConfigProvider.algorithm
<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
  <App />
</ConfigProvider>
```

### Token 自动处理
```css
/* tokens/tokens.css */
:root {
  --ant-text-color: rgba(0, 0, 0, 0.88);
}

[data-theme="dark"] {
  --ant-text-color: rgba(255, 255, 255, 0.88);
}

/* 暗黑模式无需手动添加 dark: 前缀 */
/* AntD Token 会自动适配 */
```

### 非检查清单
```markdown
❌ 不需要手动添加 dark: 前缀
❌ 不需要为暗色写单独的样式
❌ 不需要使用 media query 判断
✅ 直接使用 Token，它会自动处理
✅ 只需要在根节点切换 algorithm
```

---

## 7. 性能优化

### CSS 优化
```typescript
// ✅ 使用 CSS 变量减少重复
<style jsx>{`
  .btn-primary {
    background-color: var(--ant-primary-color);
    color: var(--ant-color-white);
  }
`}</style>

// ✅ 使用 Tailwind JIT 模式
<div className="bg-[var(--ant-primary-color)] text-white">
  动态样式
</div>
```

### 组件优化
```typescript
// ✅ 使用 React.memo
const MemoizedComponent = React.memo(({ data }) => {
  return <Card>{data.title}</Card>;
});

// ✅ 使用 useMemo
const processedData = useMemo(() => {
  return data.filter(item => item.enabled);
}, [data]);
```

---

## 8. 项目配置

### AntD 6 配置
```typescript
// app.config.ts
import { ConfigProvider, theme } from 'antd';

export const appConfig = {
  theme: {
    algorithm: theme.defaultAlgorithm, // 可切换 darkAlgorithm
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 6,
    },
  },
};
```

### Tailwind CSS 4 配置
```css
/* src/styles/tailwind.css */
@import "tailwindcss";

@theme {
  /* 集成 AntD Token */
  --color-primary: var(--ant-primary-color);
  --color-success: var(--ant-success-color);
  --color-warning: var(--ant-warning-color);
  --color-error: var(--ant-error-color);
  
  /* 自定义语义类 */
  --bg-background: var(--ant-color-white);
  --bg-surface: var(--ant-color-container);
  --text-primary: var(--ant-text-color);
  --text-secondary: var(--ant-text-color-secondary);
}
```

---

## 9. AI 使用指引

### AI 协作流程
```markdown
1. 读 DESIGN.md → 摘取设计原则和约束
2. 查阅 Token → 理解颜色和样式系统
3. 选择组件 → 遵循 Component Standards
4. 构建布局 → 使用三层架构原则
5. 处理暗黑模式 → 无需额外代码
```

### 代码审查清单
```markdown
- [ ] 硬编码了任何颜色值？
- [ ] 使用了 `dark:` 前缀？
- [ ] 违反了组件标准？
- [ ] 是否符合无障碍要求？
- [ ] 暗黑模式切换是否正常？
```

### 示例：创建一个页面
```typescript
// ✅ 正确示例
export function UserListPage() {
  return (
    <PageContainer>
      <ContentSurface>
        <Card>
          <ProTable
            columns={columns}
            request={async (params) => {
              const data = await getUsers(params);
              return {
                data: data.list,
                success: true,
                total: data.total,
              };
            }}
          />
        </Card>
      </ContentSurface>
    </PageContainer>
  );
}
```

---

## 附录

### 设计原则冲突解决矩阵
| 原则 | 冲突时优先级 | 理由 |
|------|-------------|------|
| 清晰优先于美观 | 清晰优先 | 3秒理解意图比视觉精致重要 |
| 性能 vs 一致性 | 关键路径优先性能，非关键路径优先一致性 | 用户体验在关键路径更重要 |
| 包容性 > 装饰 | 包容性优先 | 无障碍是硬性要求，装饰可移除 |

### 快速参考
- [Ant Design v6 文档](https://ant.design/)
- [Tailwind CSS v4 文档](https://tailwindcss.com/)
- [Ant Design v6 + Tailwind 最佳实践](./README.md)
- [MCP Server 使用指南](./README.md#参考资料)