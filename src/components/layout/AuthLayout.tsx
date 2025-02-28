import { Outlet } from "react-router";
import styles from "../../styles/AuthLayout.module.css";
import { Footer, Header } from "antd/es/layout/layout";

const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <Header className={styles.header}>Loggon</Header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer className={styles.footer}>
        © 2025 Loggon. All rights reserved
      </Footer>
    </div>
  );
};

export default AuthLayout;
