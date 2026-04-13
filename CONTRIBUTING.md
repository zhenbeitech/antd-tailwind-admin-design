# 贡献指南

感谢您对 Ant Design 6 + Tailwind CSS 4 企业级管理后台设计系统的关注！

## 如何贡献

### 报告 Bug

如果您发现了 bug，请通过 [GitHub Issues](https://github.com/zhenbei/antd-tailwind-admin-design/issues) 提交报告。请包含：

1. **重现步骤** - 如何重现这个 bug
2. **期望行为** - 您期望发生什么
3. **实际行为** - 实际发生了什么
4. **环境信息** - 操作系统、浏览器、使用的包版本等
5. **复现代码** - 如果可能，提供一个最小复现示例

### 功能请求

如果您有新的功能想法，也欢迎在 Issues 中提出。请在描述中说明：

1. **功能用途** - 这个功能解决什么问题
2. **使用场景** - 在什么情况下会用到
3. **实现建议** - 如果您有想法，可以分享您的实现方案

### 代码贡献

1. **Fork 项目** - 首先在 GitHub 上 Fork 本项目
2. **创建分支** - 创建新分支进行开发：`git checkout -b feature/new-feature`
3. **遵循规范** - 代码必须符合 DESIGN.md 中的设计规范
4. **编写测试** - 为新功能添加相应的测试
5. **提交更改** - 提交代码时使用清晰的提交信息
6. **创建 PR** - 创建 Pull Request，描述您的更改

## 开发规范

### 代码风格

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 规范
- 使用 Ant Design 6 的最佳实践
- 遵循 Tailwind CSS 4 的使用方式

### 提交信息规范

使用 Conventional Commits 格式：

```bash
feat: 添加新的组件功能
fix: 修复组件样式问题
docs: 更新文档
style: 代码格式化
refactor: 代码重构
test: 添加测试
chore: 构建工具或依赖更新
```

### 文档规范

- 所有组件示例都应包含在 `components/` 目录下
- 页面模板放在 `pages/` 目录
- 更新 DESIGN.md 需要保持结构清晰
- README.md 的更新要确保准确反映项目内容

## 路线图

- [ ] 添加更多组件示例
- [ ] 完善暗色模式支持
- [ ] 添加更多页面模板
- [ ] 创建在线演示
- [ ] 发布到 npm

## 许可证

通过贡献代码，您同意将您的贡献在 [MIT 许可证](LICENSE) 下发布。

感谢您的贡献！