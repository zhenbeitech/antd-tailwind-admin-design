/**
 * 布局组件
 * 提供 PageContainer 和 ContentSurface 等基础布局组件
 */

import React from 'react';
import { ConfigProvider } from 'antd';
import { theme } from 'antd';

// 页面容器组件
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div
      className={`min-h-screen bg-layout ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// 内容表面组件
interface ContentSurfaceProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: string;
}

export const ContentSurface: React.FC<ContentSurfaceProps> = ({
  children,
  className = '',
  style,
  padding = 'p-6',
}) => {
  return (
    <div
      className={`bg-background border border-gray-200 rounded-lg shadow-sm ${padding} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// 内容区域组件
interface ContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Content: React.FC<ContentProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`bg-background ${className}`} style={style}>
      {children}
    </div>
  );
};

// 面包屑导航组件
interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  style,
}) => {
  return (
    <nav className={`mb-6 ${className}`} style={style} aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-primary hover:text-primary-hover transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // 使用 React Router 或其他路由方式
                  // window.location.href = item.href;
                }}
              >
                {item.title}
              </a>
            ) : (
              <span className="text-foreground">{item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// 应用入口组件
export const App: React.FC = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        // 使用 AntD 的暗色模式算法
        algorithm: theme.defaultAlgorithm,
        // 可以在这里覆盖主题配置
        token: {
          borderRadius: 6,
          colorPrimary: '#1677ff',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

// 使用示例组件
export const UsageExample: React.FC = () => {
  return (
    <App>
      <PageContainer>
        {/* 面包屑导航 */}
        <Breadcrumb
          items={[
            { title: '首页', href: '/' },
            { title: '用户管理', href: '/users' },
            { title: '用户列表' },
          ]}
        />

        {/* 主要内容 */}
        <ContentSurface>
          <h1 className="text-2xl font-bold mb-4">用户管理</h1>

          {/* 工具栏 */}
          <div className="mb-4 flex justify-between items-center">
            <div>
              <p className="text-tertiary">管理系统用户</p>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors">
              新增用户
            </button>
          </div>

          {/* 内容区域 */}
          <Content>
            <div className="bg-secondary p-4 rounded">
              <p>这里是主要内容区域</p>
            </div>
          </Content>
        </ContentSurface>
      </PageContainer>
    </App>
  );
};