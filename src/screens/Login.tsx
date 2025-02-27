import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Space, Tabs, theme } from 'antd';
import { useState } from 'react';
import { Link, } from 'react-router'

type LoginType = 'account';

const Login = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('account');


  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="/logo.png"
          //title="LOGGON"
          //subTitle="login"
          actions={
            <Space>
             New here?
             <Link to="/Signup">Register</Link>
            </Space>
          }
          submitter={{
            searchConfig: {
              submitText: 'Sign in',
            },
          }}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'Sign in'} />
            
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'email: admin or user'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}  

                placeholder={'password'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password!',
                  },
                ]}
              />
            </>
          )}
          
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
            Remember Me
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              Forgot my password
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default Login;
