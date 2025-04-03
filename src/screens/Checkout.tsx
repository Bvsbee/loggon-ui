import { Button, Card, Col, Form, Input, Row, Select } from "antd";

const checkoutFormCardProps = {
  style: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: 0,
    marginBottom: 20,
  },
  bodyStyle: {
    padding: 25,
  },
  bordered: false,
};

// Card styling props for the order summary panel
const orderSummaryCardProps = {
  style: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: 0,
  },
  bodyStyle: {
    padding: 25,
  },
  bordered: false,
};

// Style props for section titles within cards
const sectionTitleStyle = {
  color: "#3a4825",
  fontSize: 18,
  marginBottom: 20,
  paddingBottom: 10,
  borderBottom: "1px solid #eee",
  fontWeight: "bold",
};

// Form item styles for consistent spacing
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  style: { marginBottom: 20 },
};

// Style for form labels
const labelStyle = {
  color: "#3a4825",
  fontWeight: "bold",
  marginBottom: 8,
};

// Style for the "Complete Order" button
const submitButtonProps = {
  type: "primary",
  size: "large",
  style: {
    backgroundColor: "#b57842",
    borderColor: "#b57842",
    borderRadius: 30,
    fontWeight: "bold",
    width: "100%",
    marginTop: 20,
    height: 50,
  },
};

// Style for order summary items
const summaryItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

// Style for the final total row
const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 0 8px 0",
  marginTop: 10,
  borderTop: "1px solid #ddd",
  fontWeight: "bold",
  fontSize: 18,
  color: "#3a4825",
};

const Checkout = () => {
  const [form] = Form.useForm();

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "30px 20px",
        backgroundColor: "#fcf9e8",
      }}
    >
      <h1 style={{ color: "#3a4825", textAlign: "center", marginBottom: 30 }}>
        Checkout
      </h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: 30 }}
      >
        <Card {...checkoutFormCardProps}>
          <div style={sectionTitleStyle}>1. Shipping Information</div>
          <Form layout="vertical">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  {...formItemLayout}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a First Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Last Name",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="emailAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Email Address",
                    },
                    {
                      type: "email",
                      message: "Please Enter a Valid Email Address",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Phone Number",
                    },
                    {
                      pattern: /^[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{4}$/,
                      message:
                        "Phone number must be 10 digits long and may include dashes",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Street Address"
                  name="streetAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Street Address",
                    },
                  ]}
                  {...formItemLayout}
                  style={{ width: "205%" }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a State",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a City",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Zip Code",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Country"
                  name="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Country",
                    },
                  ]}
                  {...formItemLayout}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button {...submitButtonProps}>Complete Order</Button>
          </Form>
        </Card>

        <Card {...orderSummaryCardProps}>
          <div style={sectionTitleStyle}>Order Summary</div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
