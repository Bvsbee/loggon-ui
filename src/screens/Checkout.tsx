import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import fetchCart from "../api/cart/fetchCart";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import cartCheckout from "../api/cart/cartCheckout";

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
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const Checkout = () => {
  const nav = useNavigate();

  const { Option } = Select;

  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["checkout"],
    queryFn: () => fetchCart(user?.id),
    enabled: !!user?.id,
  });

  const {
    mutate,
    isError: isOrderError,
    error: orderError,
  } = useMutation({
    mutationKey: ["orderCheckout"],
    mutationFn: async () => cartCheckout(user?.id),
  });

  if (!user?.id) {
    return <div>Please log in to proceed with checkout.</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const stateOptions = states?.map((s) => {
    return (
      <Option key={s} value={s}>
        {s}
      </Option>
    );
  });
  const orderItems = data?.map((item) => (
      <div key={item.id} style={summaryItemStyle}>
        <div>
          <div style={{ fontWeight: 'bold', textAlign: 'left'}}>{item.product?.name}</div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Quantity: {item.quantity} × ${Number(item.product?.price).toFixed(2)}
          </div>
        </div>
        <div style={{ fontWeight: 'bold' }}>
          ${(Number(item.product?.price) * item.quantity).toFixed(2)}
        </div>
      </div>
  ));

  const orderSummary = () => {
    const TAX_RATE = 0.08;
    const SHIPPING_FEE = 5.0;

    let subtotal = 0;

    data?.forEach((item) => {
      const price = parseFloat(item.product?.price || "0");
      subtotal += price * item.quantity;
    });

    const tax = subtotal * TAX_RATE;
    const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
    const total = subtotal + tax + shipping;

    return (
      <div style={{ marginTop: '20px' }}>
        <div style={summaryItemStyle}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={summaryItemStyle}>
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div style={summaryItemStyle}>
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div style={totalRowStyle}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    );
  };

  const handleCompleteOrder = () => {
    mutate();
    nav("/");
  };

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
                  <Select>{stateOptions}</Select>
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
            <Button onClick={handleCompleteOrder} {...submitButtonProps}>
              Complete Order
            </Button>
          </Form>
        </Card>

        <Card {...orderSummaryCardProps}>
          <div style={sectionTitleStyle}>Order Summary</div>
          {orderItems}

          <hr />
          {orderSummary()}
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
