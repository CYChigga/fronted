import { Form, InputNumber, Select, Cascader, DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';
import type { Moment } from 'moment';
//RangePicker日期范围选择
const { RangePicker } = DatePicker;
const { Option } = Select;

// 定义接口约束表单输入 
interface RawFormValues {
  dateRange?: [Moment, Moment] | null;  // 日期对象
  type?: string;                        // 订单类型
  city?: (string | number)[];          // 级联选择结果
  amount?: number | null;              // 订单金额
}

// 城市级联数据
const cityOptions = [
  {
    value: 'shandong',
    label: '山东',
    children: [
      { value: 'jinan', label: '济南' },
      { value: 'qingdao', label: '青岛' },
    ],
  },
  {
    value: 'heilongjiang',
    label: '哈尔滨省',
    children: [
      { value: 'haerbin', label: '哈尔滨' },
      { value: 'daqing', label: '大庆' },
    ],
  },
];

function App() {
  //获取表单实例
  const [form] = Form.useForm();
  // 定义表单提交后的回调函数
  const onFinish = (values: RawFormValues) => {
    // 时间范围初始为undefined
    let dateRange: [number, number] | undefined;
    // 判断对象是否存在undefined不存在
    if (values.dateRange) {
      dateRange = [
        //获取起始日期对象的时间戳，结束日期对象的时间戳
        values.dateRange[0].valueOf(),
        values.dateRange[1].valueOf(),
      ];
    }

    // 结果对象
    const result = {
      dateRange,
      type: values.type || undefined,
      city: values.city || undefined,
      amount: values.amount ?? undefined,
    };

    // 打印结果
    console.log('表单数据:', JSON.stringify(result, null, 2));
    console.log('类型检查:');
    console.log('  dateRange:', typeof result.dateRange, result.dateRange);
    console.log('  type:     ', typeof result.type, result.type);
    console.log('  city:     ', typeof result.city, result.city);
    console.log('  amount:   ', typeof result.amount, result.amount);
    alert('提交成功，打开控制台看看');
  };

  return (
    // 表单容器
    <div style={{ padding: 40, maxWidth: 520, margin: '0 auto' }}>
      <h2>订单筛选</h2>
      {/* 表单绑定form实例  提交后调用onFinish函数 */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* 下单时间，选完后转成时间戳输出 */}
        <Form.Item label="下单时间" name="dateRange">
          {/* 时间范围选择器  allowClear允许清除 清空后值变为undefined*/}
          <RangePicker allowClear style={{ width: '100%' }} />
        </Form.Item>

        {/* 订单类型下拉框*/}
        <Form.Item
          label="订单类型"
          name="type"
          // 验证规则必填
          rules={[{ required: true, message: '请选择订单类型' }]}
        >
          {/* placeholder未选择时显示 */}
          <Select allowClear placeholder="请选择订单类型">
            <Option value="online">线上</Option>
            <Option value="offline">线下</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>

        {/* 收货城市 */}
        <Form.Item
          label="收货城市"
          name="city"
          rules={[{ required: true, message: '请选择收货城市' }]}
        >
          {/* allowClear显示清除按钮 清空后值变为undefined */}
          {/* placeholder未选择时显示 */}
          <Cascader
            allowClear
            // 数据源
            options={cityOptions}
            placeholder="请选择收货城市"
          />
        </Form.Item>

        {/* 订单金额 */}
        <Form.Item
          label="订单金额"
          name="amount"
          // required必选字段 错误时显示提示信息
          rules={[{ required: true, message: '请输入订单金额' }]}
          //组件获取输入值后进行转换 null或空字符串转换为undefined
          normalize={(value) => (value === null || value === '' ? undefined : value)}
        >
          {/* 数字输入框*/}
          <InputNumber
            allowClear={true} // 允许清除
            placeholder="请输入订单金额"
            style={{ width: '100%' }}
            min={0}
            precision={2}
          />
        </Form.Item>

        <Form.Item>
          {/* 提交按钮 htmlType="submit"触发表单提交 */}
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button
            htmlType="button"
            // 将表单恢复到 initialValues 状态（
            onClick={() => form.resetFields()}
            style={{ marginLeft: 8 }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
