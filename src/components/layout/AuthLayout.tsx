import { Outlet } from "react-router";
import styles from "../../styles/AuthLayout.module.css";
import { Flex, Layout } from "antd";

const AuthLayout = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header className={styles.header}>LoggOn</Header>

      <Content>
        <Outlet />
      </Content>

      <Footer className={styles.footer}>
        © {new Date().getFullYear()} LoggOn. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default AuthLayout;
