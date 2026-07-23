import { App, Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { REGISTER } from '../../graphql/auth';
import '../../auth.less';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [register] = useMutation(REGISTER);

  const checkConfirm = (_: unknown, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('两次输入的密码不匹配!');
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values: RegisterForm): Promise<void> => {
    setLoading(true);
    try {
      await register({
        variables: {
          input: { name: values.name, email: values.email, password: values.password },
        },
      });
      message.success('注册成功！');
      navigate('/login');
    } catch {
      message.error('注册失败，邮箱可能已被注册');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Typography.Title level={1} style={{ marginBottom: 44, textAlign: 'center' }}>
          注册
        </Typography.Title>

        <Form form={form} onFinish={handleSubmit} size="large">
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" autoComplete="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, min: 6, message: '密码至少6位' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="至少6位密码" autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[{ validator: checkConfirm }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" autoComplete="new-password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 20 }}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div className="auth-footer">
        已有账号？<Link to="/login">去登录</Link>
      </div>
    </div>
  );
}
