import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { Space, theme } from 'antd';
import { Link } from 'react-router';

const Signup = () => {
  const { token } = theme.useToken();

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="/logo.png"
          title="LOGGON"
          subTitle="Create an account"
          submitter={{
            searchConfig: {
              submitText: 'Sign up',
            },
          }}
          actions={
            <Space>
              Already have an account?
              <Link to="/login">Sign in</Link>
            </Space>
          }
        >
          <ProFormText
            name="firstName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'First Name'}
            rules={[
              {
                required: true,
                message: 'Please enter your first name!',
              },
            ]}
          />
          <ProFormText
            name="lastName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Last Name'}
            rules={[
              {
                required: true,
                message: 'Please enter your last name!',
              },
            ]}
          />
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Email'}
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
              strengthText:
                'Password should contain numbers, letters and special characters, at least 8 characters long.',
              statusRender: (value) => {
                const getStatus = () => {
                  if (value && value.length > 12) {
                    return 'ok';
                  }
                  if (value && value.length > 6) {
                    return 'pass';
                  }
                  return 'poor';
                };
                const status = getStatus();
                if (status === 'pass') {
                  return (
                    <div style={{ color: token.colorWarning }}>
                      Strength: Medium
                    </div>
                  );
                }
                if (status === 'ok') {
                  return (
                    <div style={{ color: token.colorSuccess }}>
                      Strength: Strong
                    </div>
                  );
                }
                return (
                  <div style={{ color: token.colorError }}>Strength: Weak</div>
                );
              },
            }}
            placeholder={'Password'}
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Confirm Password'}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          />
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default Signup;