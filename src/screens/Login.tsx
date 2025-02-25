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
              submitText: 'Sign in',// default login was in chineses from antD
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
                          sStrength: Medium
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
            remember me breh
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              forgot my shit again!!
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default Login;
