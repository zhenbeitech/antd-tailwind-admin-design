/**
 * Button 组件
 * 基于 Ant Design Button 组件，通过 Token 进行样式定制
 */

import React from 'react';
import { Button as AntdButton } from 'antd';
import { theme } from 'antd';

// 按钮类型定义
export type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';

// 按钮尺寸定义
export type ButtonSize = 'large' | 'middle' | 'small';

// 按钮组件属性
export interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// 基础按钮组件
export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'middle',
  danger = false,
  ghost = false,
  disabled = false,
  loading = false,
  block = false,
  href,
  icon,
  className = '',
  style,
  onClick,
}) => {
  return (
    <AntdButton
      type={type}
      size={size}
      danger={danger}
      ghost={ghost}
      disabled={disabled}
      loading={loading}
      block={block}
      href={href}
      icon={icon}
      className={`transition-all duration-200 ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </AntdButton>
  );
};

// 主要按钮
export const PrimaryButton: React.FC<Omit<ButtonProps, 'type'>> = (props) => {
  return <Button {...props} type="primary" />;
};

// 文本按钮
export const TextButton: React.FC<Omit<ButtonProps, 'type'>> = (props) => {
  return <Button {...props} type="text" />;
};

// 链接按钮
export const LinkButton: React.FC<Omit<ButtonProps, 'type'>> = (props) => {
  return <Button {...props} type="link" />;
};

// 危险按钮
export const DangerButton: React.FC<Omit<ButtonProps, 'danger'>> = (props) => {
  return <Button {...props} danger />;
};

// 虚线按钮
export const DashedButton: React.FC<Omit<ButtonProps, 'type'>> = (props) => {
  return <Button {...props} type="dashed" />;
};

// 按钮组
export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`inline-flex ${className}`} style={style}>
      {children}
    </div>
  );
};

// 图标按钮
export interface IconButtonProps extends Omit<ButtonProps, 'icon'> {
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return <Button {...props} icon={props.icon} />;
};

// 加载中按钮
export interface LoadingButtonProps extends Omit<ButtonProps, 'loading'> {
  loading: boolean;
  loadingText?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  loadingText,
  children,
  ...props
}) => {
  return (
    <Button {...props} loading={loading}>
      {loading ? loadingText || 'Loading...' : children}
    </Button>
  );
};

// 按钮工具栏
export interface ButtonToolbarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  gap?: number;
}

export const ButtonToolbar: React.FC<ButtonToolbarProps> = ({
  children,
  className = '',
  style,
  justify = 'start',
  align = 'middle',
  gap = 8,
}) => {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const alignClasses = {
    top: 'items-start',
    middle: 'items-center',
    bottom: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={`flex ${justifyClasses[justify]} ${alignClasses[align]} ${className}`}
      style={{ gap: `${gap}px`, ...style }}
    >
      {children}
    </div>
  );
};

// 使用示例组件
export const ButtonExample: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 基础按钮 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">基础按钮</h3>
        <ButtonToolbar gap={12}>
          <Button>Default</Button>
          <PrimaryButton>Primary</Button>
          <DashedButton>Dashed</Button>
          <TextButton>Text</TextButton>
          <LinkButton>Link</LinkButton>
        </ButtonToolbar>
      </div>

      {/* 危险按钮 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">危险按钮</h3>
        <ButtonToolbar gap={12}>
          <DangerButton>Default</DangerButton>
          <PrimaryButton danger>Primary</PrimaryButton>
          <DashedButton danger>Dashed</DashedButton>
        </ButtonToolbar>
      </div>

      {/* 尺寸 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">尺寸</h3>
        <ButtonToolbar gap={12} align="start">
          <Button size="large">Large</Button>
          <Button size="middle">Middle</Button>
          <Button size="small">Small</Button>
        </ButtonToolbar>
      </div>

      {/* 图标按钮 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">图标按钮</h3>
        <ButtonToolbar gap={12}>
          <IconButton icon={<span>📁</span>}>File</IconButton>
          <IconButton icon={<span>📝</span>}>Edit</IconButton>
          <IconButton icon={<span>🗑️</span>} danger>Delete</IconButton>
        </ButtonToolbar>
      </div>

      {/* 状态按钮 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">状态</h3>
        <ButtonToolbar gap={12}>
          <Button disabled>Disabled</Button>
          <LoadingButton loading={false}>Normal</LoadingButton>
          <LoadingButton loading={true}>Loading</LoadingButton>
        </ButtonToolbar>
      </div>

      {/* 块级按钮 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">块级按钮</h3>
        <Button block className="mb-2">Block Button</Button>
        <ButtonGroup className="w-full">
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};