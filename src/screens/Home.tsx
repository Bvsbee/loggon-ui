import { Col, Row } from "antd";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <Row>
        <Col>
          <Link to={"/login"}>Login</Link>
        </Col>
        <Col>
          <Link to={"/signup"}>Sign-up</Link>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
