/**
 * 详情页面模板
 * Ant Descriptions + Form + Tailwind CSS 最佳实践
 *
 * 使用方式：
 * 1. 复制此文件到 pages 目录
 * 2. 修改相关的类型和接口定义
 * 3. 实现 loadData 方法
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer, ContentSurface, Breadcrumb } from '@/components/layout';
import { Descriptions, Card, Button, Space, message, Spin } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';

// 定义数据类型
interface DetailDataType {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState<DetailDataType | null>(null);
  const [editMode, setEditMode] = useState(false);

  // 加载数据
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/items/${id}`);
      const data = await response.json();
      setDetailData(data);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载数据
  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  // 处理编辑
  const handleEdit = () => {
    setEditMode(true);
  };

  // 保存修改
  const handleSave = async (values: any) => {
    try {
      await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      message.success('保存成功');
      setEditMode(false);
      loadData(); // 重新加载数据
    } catch (error) {
      message.error('保存失败');
    }
  };

  // 取消编辑
  const handleCancel = () => {
    setEditMode(false);
  };

  // 返回列表
  const handleBack = () => {
    window.history.back();
  };

  // 状态标签
  const renderStatus = (status: string) => {
    const statusConfig = {
      active: { text: '启用', color: 'green' },
      inactive: { text: '禁用', color: 'red' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full text-white bg-${config.color}-500`}
      >
        {config.text}
      </span>
    );
  };

  // 时间格式化
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!detailData) {
    return (
      <PageContainer>
        <ContentSurface>
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-error">数据不存在</h2>
            <p className="text-tertiary mt-2">请检查请求的ID是否正确</p>
            <Button type="primary" onClick={handleBack} className="mt-4">
              返回列表
            </Button>
          </div>
        </ContentSurface>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 面包屑导航 */}
      <Breadcrumb
        items={[
          { title: '首页', href: '/' },
          { title: '数据列表', href: '/list' },
          { title: '详情' },
        ]}
      />

      {/* 主要内容 */}
      <ContentSurface>
        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">数据详情</h1>
              <p className="text-tertiary mt-1">查看和编辑数据信息</p>
            </div>
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                返回
              </Button>
              {!editMode && (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  编辑
                </Button>
              )}
            </Space>
          </div>
        </div>

        {/* 基本信息卡片 */}
        {!editMode ? (
          <Card title="基本信息" className="mb-6">
            <Descriptions
              column={{
                xxl: 3,
                xl: 2,
                lg: 2,
                md: 2,
                sm: 1,
                xs: 1,
              }}
              bordered
              size="middle"
            >
              <Descriptions.Item label="ID" span={1}>
                {detailData.id}
              </Descriptions.Item>
              <Descriptions.Item label="名称" span={1}>
                {detailData.name}
              </Descriptions.Item>
              <Descriptions.Item label="邮箱" span={1}>
                {detailData.email}
              </Descriptions.Item>
              <Descriptions.Item label="状态" span={1}>
                {renderStatus(detailData.status)}
              </Descriptions.Item>
              <Descriptions.Item label="电话" span={1}>
                {detailData.phone || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="地址" span={2}>
                {detailData.address || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间" span={1}>
                {formatDateTime(detailData.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间" span={1}>
                {formatDateTime(detailData.updatedAt)}
              </Descriptions.Item>
              <Descriptions.Item label="创建人" span={1}>
                {detailData.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="更新人" span={1}>
                {detailData.updatedBy}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ) : (
          <Card title="编辑信息" className="mb-6">
            <ProForm
              onFinish={handleSave}
              initialValues={{
                name: detailData.name,
                email: detailData.email,
                phone: detailData.phone,
                address: detailData.address,
                status: detailData.status,
              }}
              submitter={{
                render: (props, defaultDoms) => {
                  return [
                    <Button
                      key="cancel"
                      onClick={handleCancel}
                      icon={<ArrowLeftOutlined />}
                    >
                      取消
                    </Button>,
                    <Button
                      key="save"
                      type="primary"
                      icon={<SaveOutlined />}
                      {...props.submitProps}
                    >
                      保存
                    </Button>,
                  ];
                },
              }}
            >
              <ProFormText
                name="name"
                label="名称"
                placeholder="请输入名称"
                rules={[
                  { required: true, message: '请输入名称' },
                  { max: 50, message: '名称不能超过50个字符' },
                ]}
              />
              <ProFormText
                name="email"
                label="邮箱"
                placeholder="请输入邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              />
              <ProFormText
                name="phone"
                label="电话"
                placeholder="请输入电话号码"
                rules={[
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' },
                ]}
              />
              <ProFormText
                name="address"
                label="地址"
                placeholder="请输入地址"
                fieldProps={{
                  rows: 3,
                }}
              />
              <ProFormText
                name="status"
                label="状态"
                placeholder="请选择状态"
                fieldProps={{
                  options: [
                    { label: '启用', value: 'active' },
                    { label: '禁用', value: 'inactive' },
                  ],
                }}
              />
            </ProForm>
          </Card>
        )}

        {/* 关联信息卡片（示例） */}
        <Card title="关联信息">
          <div className="text-center py-8">
            <p className="text-tertiary">暂无关联信息</p>
          </div>
        </Card>
      </ContentSurface>
    </PageContainer>
  );
};

export default DetailPage;