import { App, Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { LOGIN, type LoginData } from '../../graphql/auth';
import { setToken } from '../../utils/auth';
import '../../auth.less';

interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const [login] = useMutation<LoginData>(LOGIN);

  const handleSubmit = async (values: LoginForm): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await login({
        variables: { email: values.email, password: values.password },
      });

      if (!data?.login.success) {
        message.error(data?.login.message || '登录失败');
        return;
      }

      // 登录成功后存token
      if (data.login.token) {
        setToken(data.login.token);
      }

      message.success(`登录成功${data.login.user?.name}`);
    } catch {
      message.error('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Typography.Title level={1} style={{ marginBottom: 44, textAlign: 'center' }}>
          用户登录
        </Typography.Title>

        <Form onFinish={handleSubmit} size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效邮箱' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" autoComplete="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" autoComplete="current-password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 20 }}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div className="auth-footer">
        没有账号？<Link to="/register">去注册</Link>
      </div>
    </div>
  );
}