import {
  Button,
  Card,
  Space,
  Statistic,
  Switch,
  Table,
  TableProps,
} from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '@/contexts';

// 商品数据类型
type DataType = {
  id: number;
  title: string;
  description: string;
  price: number;
  status: boolean;
};
const GoodsList = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const dataSource: DataType[] = Array(10)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      title: `商品${i}`,
      description: `商品${i}的描述`,
      price: 1000,
      status: i % 2 === 0,
    }));
  const onEdit = (id: number) => {
    // 跳转到商品编辑页
    navigate('/admin/goods/edit', { state: { id } });
  };
  const onDetail = (id: number) => {
    // 跳转到商品详情页
    navigate('/admin/goods/detail', { state: { id } });
  };
  const onDelete = (id: number) => {
    // 删除前弹出确认提示，确认后调用删除接口，目前未作接口配置，暂时做个演示
    appContext?.modal.confirm({
      title: '删除确认',
      content: '您确定要删除该商品吗？',
      onCancel: () => {
        appContext?.message.info('已取消删除');
      },
      onOk: () => {
        appContext?.message.success(`确认删除商品${id}`);
      },
    });
  };
  // 定义商品列表展示项及操作功能
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '商品名称',
      dataIndex: 'title',
      width: 500,
    },
    {
      title: '商品简介',
      dataIndex: 'description',
    },
    {
      title: '商品单价',
      dataIndex: 'price',
      render: (value: number) => {
        return (
          <Statistic
            valueStyle={{ fontSize: '16px' }}
            value={value}
            prefix="￥"
            precision={2}
          />
        );
      },
    },
    {
      title: '上架状态',
      dataIndex: 'status',
      render: (value: boolean) => {
        return (
          <Switch
            checkedChildren="上架"
            unCheckedChildren="下架"
            checked={value}
          />
        );
      },
    },
    {
      title: '操作',
      width: 150,
      render: (_, col) => {
        return (
          <Space>
            <Button type="link" onClick={() => onEdit(col.id)}>
              编辑
            </Button>
            <Button type="link" onClick={() => onDetail(col.id)}>
              详情
            </Button>
            <Button type="link" onClick={() => onDelete(col.id)} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Card>
      <Table
        rowKey={(row) => row.id}
        dataSource={dataSource}
        columns={columns}
      />
    </Card>
  );
};
export default GoodsList;
