import { Row, Col, Form, Input, Button, App, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fakeRegister, type RegisterParams } from '@/services/api';

export function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  // 导航
  const navigate = useNavigate();
  // 自定义校验 确认密码必须和密码字段一致
  const checkConfirm = (_: unknown, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('两次输入的密码不匹配!');
    }
    return Promise.resolve();  // 通过校验
  };

  // 注册
  const onFinish = async (values: RegisterParams) => {
    setLoading(true);
    try {
      const res = await fakeRegister(values);
      if (res.status === 'ok') {
        message.success('注册成功！');
        navigate('/login');     // 跳转到登录页（不刷新整页）
      } else {
        message.error(res.message || '注册失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col style={{ width: 420 }}>
        <Typography.Title level={3}>注册</Typography.Title>

        {/* 把实例绑定到表单 */}
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
              size="large"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, min: 6, message: '密码至少6位' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="至少6位密码"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            // 密码字段变化时自动重新校验确认密码 
            dependencies={['password']}   
            // 自定义校验代码
            rules={[{ validator: checkConfirm }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>

          {/* 验证码有就行*/}
          <Form.Item
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="验证码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        <Row justify="center">
          <Col>
            已有账号？<Link to="/login">去登录</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
