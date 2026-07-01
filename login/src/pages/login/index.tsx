import { Row, Col, Form, Input, Button, App, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login, type LoginParams } from '@/services/api';

export function Login() {
  // 状态管理
  const [loading, setLoading] = useState(false);
  // 显示成功失败 
  const { message } = App.useApp();

  // 登录提交函数
  const handleSubmit = async (values: LoginParams) => {
  // 开始转圈
    setLoading(true);                      
    try {
      const res = await login({ ...values, type: 'account' });
      if (res.status === 'ok') {
        message.success('登录成功！');
        window.location.href = 'https://cs.hrbust.edu.cn/';
      } else {
        message.error(res.message || '登录失败'); 
            }
    } catch {
      message.error('网络错误，请重试');    
    } finally {
      // 不转圈
      setLoading(false);                   
    }
  };

  // 
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col style={{ width: 420 }}>
        <Typography.Title level={3}>登录</Typography.Title>

        {/* onFinish校验通过后调handleSubmit */}
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },  
              { min: 3, message: '用户名至少3位' },         
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            {/* loading={true}时按钮转圈*/}
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <Row justify="center">
          <Col>
            没有账号？<Link to="/register">去注册</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
