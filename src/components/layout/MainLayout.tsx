import { Button } from "antd";
import styles from "../../styles/MainLayout.module.css";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <Button>layout</Button>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
