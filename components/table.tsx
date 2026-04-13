/**
 * Table 组件
 * 基于 Ant Design Table 组件，提供企业级数据表格功能
 */

import React, { useMemo } from 'react';
import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// 表格数据类型
export interface TableDataType {
  key: React.Key;
  [key: string]: any;
}

// 表格列配置
export interface TableColumn<RecordType = TableDataType> {
  title: React.ReactNode;
  dataIndex: string;
  key: string;
  width?: number;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode;
  sorter?: boolean | ((a: RecordType, b: RecordType) => number);
  sortDirections?: ('ascend' | 'descend')[];
  filters?: Record<string, (string | number)[]>;
  onFilter?: (value: any, record: RecordType) => boolean;
  defaultSortOrder?: 'ascend' | 'descend';
  editable?: boolean;
  copyable?: boolean;
}

// 表格属性
export interface TableProps<RecordType = TableDataType>
  extends Omit<AntdTableProps<RecordType>, 'columns' | 'dataSource'> {
  columns: TableColumn<RecordType>[];
  dataSource: RecordType[];
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: React.Key[];
    onChange?: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void;
    onSelect?: (record: RecordType, selected: boolean, selectedRows: RecordType[]) => void;
    onSelectInvert?: () => void;
  };
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    pageSizeOptions?: string[];
    showLessItems?: boolean;
    hideOnSinglePage?: boolean;
  };
  loading?: boolean;
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  scroll?: { x?: number | string; y?: number | string };
  title?: (data: RecordType[]) => React.ReactNode;
  footer?: (data: RecordType[]) => React.ReactNode;
  summary?: (data: RecordType[]) => React.ReactNode;
}

// 基础表格组件
export const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  rowSelection,
  pagination = {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
    pageSizeOptions: ['10', '20', '50', '100'],
  },
  loading = false,
  bordered = true,
  size = 'middle',
  scroll,
  title,
  footer,
  summary,
  ...props
}) => {
  // 处理分页配置
  const finalPagination = useMemo(() => {
    if (pagination === false) return false;

    const defaultPagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) =>
        `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100'],
      ...pagination,
    };

    return defaultPagination;
  }, [pagination]);

  // 处理列配置
  const finalColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      align: col.align || 'left',
      ellipsis: col.ellipsis || false,
      sorter: col.sorter || false,
      width: col.width,
      fixed: col.fixed,
      render: col.render,
    }));
  }, [columns]);

  return (
    <AntdTable<TableDataType>
      columns={finalColumns}
      dataSource={dataSource}
      rowKey="key"
      pagination={finalPagination}
      loading={loading}
      bordered={bordered}
      size={size}
      scroll={scroll}
      title={title}
      footer={footer}
      summary={summary}
      rowSelection={rowSelection}
      {...props}
    />
  );
};

// 高级表格组件，带工具栏
export interface AdvancedTableProps<RecordType = TableDataType> extends TableProps<RecordType> {
  toolbar?: {
    title?: string;
    actions?: React.ReactNode[];
    search?: {
      visible?: boolean;
      fields?: string[];
      onSearch?: (keyword: string) => void;
    };
    filters?: React.ReactNode[];
  };
}

export const AdvancedTable: React.FC<AdvancedTableProps> = ({
  toolbar,
  ...tableProps
}) => {
  const { title: toolbarTitle, actions = [], search, filters = [] } = toolbar || {};

  return (
    <div className="bg-background rounded-lg border border-border">
      {/* 工具栏 */}
      {toolbar && (
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {toolbarTitle && (
              <h3 className="text-lg font-semibold text-foreground">
                {toolbarTitle}
              </h3>
            )}

            <div className="flex items-center space-x-4">
              {/* 操作按钮 */}
              <div className="flex items-center space-x-2">
                {actions}
              </div>

              {/* 搜索框 */}
              {search?.visible && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索..."
                    className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => search.onSearch?.(e.target.value)}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
              )}

              {/* 筛选器 */}
              <div className="flex items-center space-x-2">
                {filters}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 表格主体 */}
      <div>
        <Table {...tableProps} />
      </div>
    </div>
  );
};

// 选择表格组件
export interface SelectionTableProps<RecordType = TableDataType> extends TableProps<RecordType> {
  selectedKeys?: React.Key[];
  onSelect?: (selectedKeys: React.Key[], selectedRows: RecordType[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void;
}

export const SelectionTable: React.FC<SelectionTableProps> = ({
  selectedKeys = [],
  onSelect,
  onSelectAll,
  ...tableProps
}) => {
  return (
    <Table<RecordType>
      {...tableProps}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedKeys,
        onChange: onSelect,
        onSelectAll,
      }}
    />
  );
};

// 数据表格组件（带操作列）
export interface DataTableProps<RecordType = TableDataType> extends TableProps<RecordType> {
  actions?: {
    title: string;
    actions: Array<{
      label: string;
      icon?: React.ReactNode;
      type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
      danger?: boolean;
      onClick: (record: RecordType) => void;
    }>;
  };
}

export const DataTable: React.FC<DataTableProps> = ({
  actions,
  ...tableProps
}) => {
  // 添加操作列
  const actionColumn = useMemo(() => {
    if (!actions) return [];

    return [{
      title: actions.title,
      key: 'action',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {actions.actions.map((action, index) => (
            <button
              key={index}
              type="button"
              className={`px-3 py-1 rounded text-sm transition-colors ${
                action.type === 'primary'
                  ? 'bg-primary text-white hover:bg-primary-hover'
                  : action.type === 'danger'
                  ? 'bg-error text-white hover:bg-error-hover'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => action.onClick(record)}
            >
              {action.icon && <span className="mr-1">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      ),
    }];
  }, [actions]);

  const finalColumns = useMemo(() => {
    return [...tableProps.columns, ...actionColumn];
  }, [tableProps.columns, actionColumn]);

  return (
    <Table
      {...tableProps}
      columns={finalColumns}
      rowSelection={tableProps.rowSelection}
    />
  );
};

// 使用示例组件
export const TableExample: React.FC = () => {
  // 示例数据
  const dataSource = [
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      status: 'active',
    },
    {
      key: '2',
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
      status: 'inactive',
    },
    {
      key: '3',
      name: '王五',
      age: 28,
      address: '广州市天河区',
      status: 'active',
    },
    {
      key: '4',
      name: '赵六',
      age: 35,
      address: '深圳市南山区',
      status: 'active',
    },
  ];

  // 基础列配置
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={
          status === 'active'
            ? 'text-success bg-success/10 px-2 py-1 rounded'
            : 'text-error bg-error/10 px-2 py-1 rounded'
        }>
          {status === 'active' ? '启用' : '禁用'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 基础表格 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">基础表格</h3>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条数据`,
          }}
        />
      </div>

      {/* 高级表格 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">高级表格</h3>
        <AdvancedTable
          title="用户列表"
          columns={columns}
          dataSource={dataSource}
          toolbar={{
            title: '用户管理',
            actions: [
              <button key="add" className="bg-primary text-white px-4 py-2 rounded">
                新增用户
              </button>,
              <button key="refresh" className="border border-border px-4 py-2 rounded">
                刷新
              </button>,
            ],
            search: {
              visible: true,
              onSearch: (keyword) => console.log('搜索:', keyword),
            },
          }}
        />
      </div>

      {/* 选择表格 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">选择表格</h3>
        <SelectionTable
          columns={columns}
          dataSource={dataSource}
          selectedKeys={['1', '2']}
          onSelect={(keys, rows) => console.log('选中:', keys, rows)}
        />
      </div>

      {/* 数据表格（带操作） */}
      <div>
        <h3 className="text-lg font-semibold mb-3">数据表格</h3>
        <DataTable
          columns={columns}
          dataSource={dataSource}
          actions={{
            title: '操作',
            actions: [
              {
                label: '编辑',
                icon: '✏️',
                type: 'primary',
                onClick: (record) => console.log('编辑:', record),
              },
              {
                label: '删除',
                icon: '🗑️',
                type: 'danger',
                onClick: (record) => console.log('删除:', record),
              },
              {
                label: '查看',
                icon: '👁️',
                onClick: (record) => console.log('查看:', record),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};