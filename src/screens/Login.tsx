import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Form, Layout } from "antd";
import { Link, useNavigate } from "react-router";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { registerUser } from "../api/authAPI";
const Login = () => {
  const { Content } = Layout;

  const [form] = Form.useForm();
  const nav = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await registerUser(values);

      if (response.token && response.userId) {
        nav("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Content>
      <Card>
        <LoginForm
          title="Login"
          onFinish={onFinish}
          form={form}
          submitter={{
            searchConfig: {
              submitText: "Login",
            },
          }}
          style={{ padding: 20 }}
        >
          <ProFormText
            name="email"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder="Email"
            rules={[
              {
                required: true,
                message: "Please enter your Email Address",
              },
            ]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
            placeholder="Password"
          />
        </LoginForm>
        <Col>
          <div>
            <text>Don't Have An Account? </text>
            <Link to="/signup">Sign up now!</Link>
          </div>
        </Col>
      </Card>
    </Content>
  );
};
export default Login;
