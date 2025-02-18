import { Button, Card, Modal } from "antd";
import { useState } from "react";

const Test = () => {
  const [modal, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Card>
        <Button onClick={handleModal}>Button</Button>
      </Card>
      <Modal></Modal>
    </>
  );
};

export default Test;
