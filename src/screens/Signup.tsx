import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Form, Layout, Tag, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useState } from "react";
import loggonAPI from "../api/api";

const Signup = () => {
  const { Content } = Layout;
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [signupError, setSignupError] = useState<string | null>(null);

  const onFinish = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await loggonAPI.post("/user/create", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      if (response.data?.userId && response.data?.token) {
        message.success("Account created successfully!");
        nav("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error?.response?.data?.message) {
        setSignupError(error.response.data.message);
      } else if (error?.message) {
        setSignupError(error.message);
      } else {
        setSignupError("An unknown error occurred, please try again later.");
      }
    }
  };

  return (
    <Content>
      <Card>
        <LoginForm
          title="Create an account"
          onFinish={onFinish}
          form={form}
          submitter={{
            searchConfig: {
              submitText: "Sign up",
            },
          }}
          style={{ padding: 20 }}
        >
          <ProFormText
            name="firstName"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder="First Name"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
            ]}
          />
          <ProFormText
            name="lastName"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder="Last Name"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
            ]}
          />
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
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must contain uppercase , lowercase, number and special character",
              },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          />
        </LoginForm>
        <div>{signupError && <Tag color="red">{signupError}</Tag>}</div>
        <Col>
          <div>
            <text>Already have an account? </text>
            <Link style={{ color: "blue" }} to="/login">
              Sign in
            </Link>
          </div>
        </Col>
      </Card>
    </Content>
  );
};

export default Signup;
