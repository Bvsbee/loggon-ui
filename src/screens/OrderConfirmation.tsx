import React from "react";
import { Layout, Typography, Button, Result} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
//orderconfirmation.tsx displays a message to the user that their order has been placed successfully
 
const OrderConfirmation = () => {
  
const nav = useNavigate();


return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '48px 24px',
      textAlign: 'center' 
    }}>
      <Result

        icon={<CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />}
        status="success"
        title="Order Confirmed!"
        subTitle="Thank you for your purchase. Your order has been successfully placed."
        extra={[
          <Button 
            type="primary" 
            key="home"
            onClick={() => nav('/')}
          >Return to Home</Button>,
          <Button 
            key="products"
            onClick={() => nav('/products')}
          >Continue Shopping</Button>
        ]}
      />
    </div>
  );


};
export default OrderConfirmation;