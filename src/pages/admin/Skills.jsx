import { Button, Form, Input, Modal, Table } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ROLE, USER_ID } from "../../utils";
import { useFetch } from "../../hook";
import { request } from "../../server/request";
const { confirm } = Modal;

const Skills = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (percent) => <p>{percent} %</p>,
    },
    {
      title: "Actions",
      width: 200,
      render: ({ _id }) => (
        <>
          <Button onClick={() => editSkills(_id)} type="primary">
            <EditOutlined />
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => deleteSkills(_id)} type="primary" danger>
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [current, setCurrentPage] = useState(1);

  const {
    data: skills,
    loading,
    recall: getSkills,
    total,
  } = useFetch(`skills${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selected) {
        request.put(`skills/${selected}`, values).then((data) => {
          console.log(data);
          getSkills();
          setIsModalOpen(false);
        });
      } else {
        request.post("skills", values).then((res) => {
          console.log(res);
          getSkills();
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

  function editSkills(id) {
    showModal();
    setSelected(id);
    request.get(`skills/${id}`).then((res) => {
      console.log(res);
      form.setFieldsValue(res.data);
    });
  }

  function deleteSkills(id) {
    console.log(id);
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        request.delete(`skills/${id}`).then((res) => {
          console.log(res);
          toast.success(`User ${id} deleted successfully !`);
          getSkills();
        });
      },
    });
  }

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Skills</h1>
            <Button
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              onClick={openFormModal}
              type="primary"
            >
              <AiOutlineUserAdd /> Add Skills
            </Button>
          </div>
        )}
        dataSource={skills}
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
      <Modal
        title="User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected ? "Save Skills" : "Add Skills"}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          name="user"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                message: "The input is not valid name!",
              },
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            name="percent"
            label="Percent"
            rules={[
              {
                message: "The input is not valid percent!",
              },
              {
                required: true,
                message: "Please input your percent!",
              },
            ]}
          >
            <Input placeholder="Percent" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Skills;
