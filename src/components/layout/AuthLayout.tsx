import { Outlet } from "react-router";
import styles from "../../styles/AuthLayout.module.css";
import { Footer } from "antd/es/layout/layout";

const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContent}>
        <header className={styles.header}>Loggon</header>
      </div>

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
