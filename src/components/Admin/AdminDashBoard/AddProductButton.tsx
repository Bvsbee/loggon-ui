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
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/fetch/useFetchCategories";
import { addProduct } from "../../../api/product/createProduct";
import Product from "../../../classses/Product";

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

  const woodOptions = [
    {
      label: "Hardwood",
      options: [
        { label: "Oak", value: "oak", category: "Hardwood" },
        { label: "Maple", value: "maple", category: "Hardwood" },
        { label: "Walnut", value: "walnut", category: "Hardwood" },
      ],
    },
    {
      label: "Softwood",
      options: [
        { label: "Pine", value: "pine", category: "Softwood" },
        { label: "Cedar", value: "cedar", category: "Softwood" },
        { label: "Fir", value: "fir", category: "Softwood" },
      ],
    },
  ];

  const onFinish = async (values: Product) => {
    try {
      const result = await addProduct(values);
      form.resetFields();
      console.log("New product:", result);
    } catch (error: Error) {
      console.error("Error adding product:", error);
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        // Assuming the API returns an array of categories with id and name
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectChange = (value: string) => {
    const foundWood = woodOptions
      .flatMap((group) => group.options)
      .find((wood) => wood.value === value);

    if (foundWood) {
      // Set in State (optional, for display/debugging)
      setSelectedWood({ name: foundWood.value, category: foundWood.category });

      // Update form field manually
      form.setFieldsValue({
        wood: { name: foundWood.value, category: foundWood.category },
      });
    }
  };

  const [selectedWood, setSelectedWood] = useState<{
    name: string;
    category: string;
  } | null>(null);

  return (
    <Content>
      <Button onClick={handleModalVisibility}>Add New Product</Button>
      <Modal open={visible} onOk={onSubmit} onCancel={handleModalVisibility}>
        <Form form={form} onFinish={onFinish}>
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
                    required: false,
                    message: "Please input a Description!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={20}>
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
