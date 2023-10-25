
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Tabs, message } from "antd";
import { request } from "../../server/request";



const { useForm } = Form;
const { TextArea } = Input;
console.log(TextArea);

const Dashboard = () => {
  let items = [
    {
      label: "Information",
      key: "info",
      children: <Information />,
    },
    {
      label: "Password",
      key: "pass",
      children: <Password />,
    },
  ];
  return (
    <Fragment>
      <Tabs className="container" defaultActiveKey="info" centered>
        {items.map((item) => (
          <Tabs.TabPane className="continaer" tab={item.label} key={item.key}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Fragment>
  );
};


const Information = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  console.log(userData);
  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await request.get("auth/me");

      if (response && response.data) {
        setUserData(response.data);
        form.setFieldsValue(response.data);
      }
    } catch (err) {
      console.error(err);
      message.error("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const submit = async (values) => {
    try {
      setLoading(true);
      const response = await request.put("auth/update", values);
      message.success("Edited succesfully");
      if (response && response.data) {
        message.success("Information saved successfully!");
        setUserData(response.data);
      } else {
        message.error("Failed to save information. Please try again.");
      }
    } catch (err) {
      console.error(err);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col className="container text-center" style={{ padding: "20px 10px" }}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={submit}
          className="container text-center"
        >
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
              {
                pattern: /^[+]\d+$/, // Telefon raqamni belgilangan regex bilan solishtirish
                message: "+998999400807",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};


const Password = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    try {
      setLoading(true);
      const response = await request.put("auth/password", values);

      if (response && response.data) {
        message.success("Password changed successfully!");
        form.resetFields();
      } else {
        message.error("Failed to change password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="container"
      style={{ padding: "20px 10px" }}
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={submit}
    >
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "Please fill this field!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: "Please fill this field!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" >
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Dashboard;
