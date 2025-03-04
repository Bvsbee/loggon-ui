import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space, Layout } from "antd";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
  const { Content } = Layout;

  const [form] = Form.useForm();

  const fields = ["email", "password"];

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      message.success("User registered successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      message.error("Registration failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <Content>
      <Card>
        <Form onFinish={onFinish} form={form}>
          <Row>
            <Space direction="vertical" style={{ display: "flex" }}>
              <Col>
                <Form.Item name="email">
                  <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                    {
                      message:
                        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
                    },
                  ]}
                >
                  <Input.Password
                    style={{ borderRadius: 1 }}
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>

              <Col>
                <div>
                  <text>Don't Have An Account? </text>
                </div>
              </Col>

              <Link to="/signup">Sign up now!</Link>
              <Button type="primary" onClick={form.submit}>
                Login
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </Content>
  );
};
export default Login;
