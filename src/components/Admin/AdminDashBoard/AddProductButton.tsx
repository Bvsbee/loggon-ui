import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";

interface AddProductButtonProps {
  handleModalVisibility: () => void;
  visible: boolean;
}

const AddProductButton = ({
  handleModalVisibility,
  visible,
}: AddProductButtonProps) => {
  const { Content } = Layout;
  const { Dragger } = Upload;

  const { Item } = Form;

  const [form] = Form.useForm();

  const onSubmit = () => {
    handleModalVisibility();
  };

  return (
    <Content>
      <Button onClick={handleModalVisibility}>Add New Product</Button>
      <Modal open={visible} onOk={onSubmit} onCancel={handleModalVisibility}>
        <Form form={form}>
          <Row gutter={6}>
            <Col span={20}>
              <Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input a Name!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={20}>
              <Item
                name="category"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select a Category!",
                  },
                ]}
              >
                <Select style={{ width: "100%" }}></Select>
              </Item>
            </Col>
            <Col span={20}>
              <Item
                name="quantity"
                label="Quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input a Quantity!",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={20}>
              <Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please input a Price!",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={20}>
              <Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input a Description!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={20}>
              <Item
                name="productPicture"
                label="Product Picture"
                rules={[
                  {
                    required: true,
                    message: "Please input a Product Picture!",
                  },
                ]}
              >
                <Dragger style={{ width: "100%" }}></Dragger>
              </Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Content>
  );
};

export default AddProductButton;
