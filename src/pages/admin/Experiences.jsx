import { Button, Form, Input, Modal, Table } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ROLE, USER_ID } from "../../utils";
import { useFetch } from "../../hook";
import { request } from "../../server/request";
const { confirm } = Modal;

const Experiences = () => {
  const columns = [
    {
      title: "Work Name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: `startDate`,
      key: "startDate",
      render: (startDate) => {
        startDate = startDate.split("T");
        return startDate[0];
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => {
        endDate = endDate.split("T");
        return endDate[0];
      },
    },
    {
      title: "Actions",
      width: 200,
      render: ({ _id }) => (
        <>
          <Button onClick={() => editExperiences(_id)} type="primary">
            <EditOutlined />
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => deleteExperience(_id)} type="primary" danger>
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [current, setCurrentPage] = useState(1);
  const {
    data: experiences,
    loading,
    recall: getExperiences,
    total,
  } = useFetch(`experiences${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selected) {
        request.put(`experiences/${selected}`, values).then((data) => {
          console.log(data);
          getExperiences();
          setIsModalOpen(false);
        });
      } else {
        request.post("experiences", values).then((res) => {
          console.log(res);
          getExperiences();
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

  function editExperiences(id) {
    showModal();
    setSelected(id);
    request.get(`experiences/${id}`).then((res) => {
      console.log(res);
      form.setFieldsValue(res.data);
    });
  }

  function deleteExperience(id) {
    console.log(id);
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        request.delete(`experiences/${id}`).then((res) => {
          console.log(res);
          toast.success(`User ${id} deleted successfully !`);
          getExperiences();
        });
      },
    });
  }

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Experiences</h1>
            <Button
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              onClick={openFormModal}
              type="primary"
            >
              <AiOutlineUserAdd /> Add Experiences
            </Button>
          </div>
        )}
        dataSource={experiences}
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
        okText={selected ? "Save Experiences" : "Add Experiences"}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          name="user"
          initialValues={{ role: "client" }}
        >
          <Form.Item
            name="workName"
            label="Work Name"
            rules={[
              {
                message: "The input is not valid Work Name!",
              },
              {
                required: true,
                message: "Please input your Work Name!",
              },
            ]}
          >
            <Input placeholder="Work Name" />
          </Form.Item>
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[
              {
                message: "The input is not valid Company Name!",
              },
              {
                required: true,
                message: "Please input your Company Name!",
              },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                message: "The input is not valid description!",
              },
              {
                required: true,
                message: "Please input your User Name!",
              },
            ]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="startDate"
            rules={[
              {
                message: "The input is not valid startDate!",
              },
              {
                required: false,
                message: "Please input your startDate!",
              },
            ]}
          >
            <Input placeholder="YY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="endDate"
            rules={[
              {
                message: "The input is not valid description!",
              },
              {
                required: false,
                message: "Please input your User Name!",
              },
            ]}
          >
            <Input placeholder="YY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Experiences;
