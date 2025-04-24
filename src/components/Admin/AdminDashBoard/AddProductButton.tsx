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
import { useState } from "react";
import { addProduct } from "../../../api/product/createProduct";
import Product from "../../../utils/models/ProductModel";
import { PlusOutlined } from "@ant-design/icons";

interface AddProductButtonProps {
  handleModalVisibility: () => void;
  visible: boolean;
  refetch: () => void;
}

const { Option, OptGroup } = Select;

interface Category {
  id: string;
  name: string;
}

const AddProductButton = ({
  handleModalVisibility,
  visible,
  refetch,
}: AddProductButtonProps) => {
  const { Content } = Layout;
  const { Dragger } = Upload;

  const { Item } = Form;

  const [form] = Form.useForm();

  const onSubmit = () => {
    form.submit();
    handleModalVisibility();
    refetch();
  };

  const dimensionOptions = [
    { label: "2x4", value: "2x4" },
    { label: "2x6", value: "2x6" },
    { label: "4x4", value: "4x4" },
    { label: "4x8", value: "4x8" },
    { label: "6x6", value: "6x6" },
    { label: "8x10", value: "8x10" },
    { label: "10x12", value: "10x12" },
    { label: "12x12", value: "12x12" },
  ];

  const woodOptions = [
    {
      label: "Hardwood",
      options: [
        { label: "Oak", value: "Oak", category: "Hardwood" },
        { label: "Maple", value: "Maple", category: "Hardwood" },
        { label: "Walnut", value: "Walnut", category: "Hardwood" },
      ],
    },
    {
      label: "Softwood",
      options: [
        { label: "Pine", value: "Pine", category: "Softwood" },
        { label: "Cedar", value: "Cedar", category: "Softwood" },
        { label: "Fir", value: "Fir", category: "Softwood" },
      ],
    },
  ];

  const [imageUrl, setImageUrl] = useState<string>();
  const beforeUpload = async (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result as string); // Save the base64 string
    };

    reader.readAsDataURL(file);
    return false; // Prevent the default upload behavior and handle manually
  };

  const onFinish = async (values: Product) => {
    if (!imageUrl) {
      // show an error or disable the submit button instead
      return message.error("Please upload a product image first");
    }

    try {
      const result = await addProduct({ ...values, image: imageUrl });
      form.resetFields();
      console.log("New product:", result);
    } catch (error: Error) {
      console.error("Error adding product:", error);
    }

    refetch();
  };

  const handleSelectChange = (value: string) => {
    const foundWood = woodOptions
      .flatMap((group) => group.options)
      .find((wood) => wood.value === value);

    if (foundWood) {
      // Set in State (optional, for display/debugging)
      setSelectedWood({ name: foundWood.value });

      // Update form field manually
      form.setFieldsValue({
        wood: { name: foundWood.value },
      });
    }
  };

  const [selectedWood, setSelectedWood] = useState<{
    name: string;
  } | null>(null);

  return (
    <Content>
      <Button
        icon={<PlusOutlined />}
        style={{ backgroundColor: "#5c7a3d", color: "white" }}
        onClick={handleModalVisibility}
      >
        Add New Product
      </Button>
      <Modal open={visible} onOk={onSubmit} onCancel={handleModalVisibility}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={6}>
            <Col span={12}>
              <Item
                name="species"
                label="Species"
                rules={[
                  {
                    required: true,
                    message: "Please input a Species!",
                  },
                ]}
              >
                <Select placeholder="Select wood" onChange={handleSelectChange}>
                  {woodOptions.map((group) => (
                    <OptGroup key={group.label} label={group.label}>
                      {group.options.map((wood) => (
                        <Option key={wood.value} value={wood.value}>
                          {wood.label}
                        </Option>
                      ))}
                    </OptGroup>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input a Species!",
                  },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
              <Item
                name="dimensions"
                label="Dimensions"
                rules={[
                  {
                    required: true,
                    message: "Please input a Quantity!",
                  },
                ]}
              >
                <Select options={dimensionOptions}></Select>
              </Item>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
              <Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: "Please input a Description!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={24}>
              <Item
                name="image"
                label="Product Picture"
                rules={[
                  {
                    required: false,
                    message: "Please input a Product Picture!",
                  },
                ]}
              >
                <Dragger
                  beforeUpload={beforeUpload}
                  style={{ width: "100%" }}
                ></Dragger>
              </Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Content>
  );
};

export default AddProductButton;
