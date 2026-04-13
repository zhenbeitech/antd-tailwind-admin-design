/**
 * 列表页面模板
 * AntD ProTable + Tailwind CSS 最佳实践
 *
 * 使用方式：
 * 1. 复制此文件到 pages 目录
 * 2. 修改相关的类型和接口定义
 * 3. 实现 request 和 columns 方法
 */

import React, { useRef, type ActionType } from 'react';
import { PageContainer, ContentSurface } from '@/components/layout';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Space, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';

// 定义数据类型
interface DataType {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// 定义查询参数类型
interface QueryParams {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: string;
}

// 新增/编辑表单类型
interface FormDataType {
  name?: string;
  email?: string;
  status?: 'active' | 'inactive';
}

const ListPage: React.FC = () => {
  // 表格引用
  const actionRef = useRef<ActionType>();
  // 模态框引用
  const modalFormRef = useRef<any>();

  // 表格列配置
  const columns: ProColumns<DataType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      hideInTable: false,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      valueEnum: {
        active: { text: '启用', status: 'Success' },
        inactive: { text: '禁用', status: 'Error' },
      },
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <select {...rest} className="w-full p-2 border border-gray-300 rounded">
            <option value="active">启用</option>
            <option value="inactive">禁用</option>
          </select>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      render: (date: string) => (
        <span className="text-tertiary">
          {new Date(date).toLocaleString()}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 加载数据
  const request = async (params: QueryParams) => {
    try {
      const { current = 1, pageSize = 10, ...restParams } = params;

      // 构建查询参数
      const queryParams = {
        page: current,
        size: pageSize,
        ...restParams,
      };

      // 调用 API
      const response = await fetch('/api/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryParams),
      });

      const data = await response.json();

      return {
        data: data.data || [],
        success: true,
        total: data.pagination?.total || 0,
      };
    } catch (error) {
      message.error('加载数据失败');
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 新增记录
  const handleCreate = () => {
    modalFormRef.current?.open();
  };

  // 编辑记录
  const handleEdit = (record: DataType) => {
    modalFormRef.current?.open(record);
  };

  // 删除记录
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      onOk: async () => {
        try {
          await fetch(`/api/items/${id}`, {
            method: 'DELETE',
          });
          message.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  // 提交表单
  const handleFinish = async (values: FormDataType) => {
    try {
      const method = modalFormRef.current?.record?.id ? 'PUT' : 'POST';
      const url = modalFormRef.current?.record?.id
        ? `/api/items/${modalFormRef.current?.record.id}`
        : '/api/items';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      message.success('保存成功');
      modalFormRef.current?.close();
      actionRef.current?.reload();
    } catch (error) {
      message.error('保存失败');
    }
  };

  return (
    <PageContainer>
      <ContentSurface>
        {/* 工具栏 */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">数据列表</h1>
            <p className="text-sm text-tertiary">管理所有数据项</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            新增
          </Button>
        </div>

        {/* 表格 */}
        <ProTable<DataType>
          actionRef={actionRef}
          rowKey="id"
          columns={columns}
          request={request}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
          }}
          search={{
            labelWidth: 120,
          }}
          dateFormatter="string"
          headerTitle={
            <div>
              <h2 className="text-lg font-medium">数据列表</h2>
              <p className="text-sm text-tertiary">点击表格头进行排序</p>
            </div>
          }
          options={{
            density: true,
            fullScreen: true,
            reload: true,
            setting: true,
          }}
        />

        {/* 新增/编辑表单 */}
        <ModalForm<FormDataType>
          title={modalFormRef.current?.record?.id ? '编辑' : '新增'}
          modalProps={{
            destroyOnClose: true,
          }}
          onFinish={handleFinish}
          ref={modalFormRef}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">名称</label>
              <input
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="请输入名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <input
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="请输入邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">状态</label>
              <select
                name="status"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="active">启用</option>
                <option value="inactive">禁用</option>
              </select>
            </div>
          </div>
        </ModalForm>
      </ContentSurface>
    </PageContainer>
  );
};

export default ListPage;