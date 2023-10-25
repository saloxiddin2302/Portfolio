import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useState } from "react";
import { USER_ROLES } from "../../const";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Tabs } from "antd";
import { useFetch } from "../../hook";
import { request } from "../../server/request";

const { confirm } = Modal;

const Users = () => {
  const [activeTab, setActiveTab] = useState("1");
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (client) => (client ? "Ha" : "Yo'q"),
    },
    {
      title: "Actions",
      width: 200,
      render: ({ _id, username }) =>
        activeTab === "1" ? (
          <>
            <Button type="primary" onClick={() => editUser(_id)}>
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteUser(_id, username)}
            >
              <DeleteOutlined />
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => confirmClient(_id)}>
              <EditOutlined />
            </Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={() => rejectClient(_id)}>
              <DeleteOutlined />
            </Button>
          </>
        ),
    },
  ];
  const [form] = Form.useForm();
  const [current, setCurrentPage] = useState(1);
  const {
    data: users,
    loading,
    recall: getUsers,
    total,
  } = useFetch(`users?page=${current}&limit=5`);
  const {
    data: noConfirmedUsers,
    loading: loading2,
    recall: getConfirmedUsers,
  } = useFetch("users?client[in]=true&role[in]=user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      delete values.confirm;
      if (selected) {
        values.password || delete values.password;
        request.put(`users/${selected}`, values).then((data) => {
          console.log(data);
          getUsers();
          setIsModalOpen(false);
        });
      } else {
        request.post("users", values).then((res) => {
          console.log(res);
          getUsers();
          setIsModalOpen(false);
        });
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openFormModal = () => {
    showModal();
    setSelected(null);
    form.resetFields();
  };

  function editUser(id) {
    showModal();
    setSelected(id);
    request.get(`users/${id}`).then((res) => {
      console.log(res);
      form.setFieldsValue(res.data);
    });
  }

  function deleteUser(id, username) {
    console.log(id);
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        request.delete(`users/${id}`).then((res) => {
          console.log(res);
          toast.success(`User ${username} deleted successfully !`);
          getUsers();
        });
      },
    });
  }

  const onChangeTab = (key) => {
    setActiveTab(key);
  };
  const Tab1 = (
    <Table
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>User</h1>
          <Button
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            onClick={openFormModal}
            type="primary"
          >
            <AiOutlineUserAdd /> Add User
          </Button>
        </div>
      )}
      dataSource={users}
      columns={columns}
      loading={loading}
      scroll={{ x: 600 }}
      pagination={{
        current,
        total,
        pageSize: 5,
        onChange: (key) => setCurrentPage(key),
      }}
    />
  );
  const Tab2 = (
    <Table
      dataSource={noConfirmedUsers}
      columns={columns}
      loading={loading2}
      scroll={{ x: 600 }}
    />
  );
  const items = [
    {
      key: "1",
      label: `All Users`,
      children: Tab1,
    },
    {
      key: "2",
      label: `No-confirm clients`,
      children: Tab2,
    },
  ];
  const confirmClient = (id) => {
    confirm({
      title: "Do you Want to confirm these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        request.put(`users/${id}`, { role: "client" }).then(() => {
          getConfirmedUsers();
        });
      },
    });
  };
  const rejectClient = (id) => {
    confirm({
      title: "Do you Want to reject these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        request.put(`users/${id}`, { client: false }).then(() => {
          getConfirmedUsers();
          getUsers();
        });
      },
    });
  };
  return (
    <>
      <Tabs ActiveKey={selected} items={items} onChange={onChangeTab} />
      <Modal
        title="User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected ? "Save User" : "Add User"}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          name="user"
          initialValues={{ role: "client" }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                message: "The input is not valid First Name!",
              },
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                message: "The input is not valid Last Name!",
              },
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="User Name"
            rules={[
              {
                message: "The input is not valid User Name!",
              },
              {
                required: true,
                message: "Please input your User Name!",
              },
            ]}
          >
            <Input placeholder="User Name" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please input your role !",
              },
            ]}
          >
            <Select
              options={USER_ROLES.map((role, i) => ({
                label: role,
                value: role,
                key: i,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: selected ? false : true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: selected ? false : true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
