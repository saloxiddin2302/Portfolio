import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { TOKEN, USER } from "../../../const";
import { adminRoutes } from "../../../const/menus";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import PropTypes from 'prop-types'; 


const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    navigate("/");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ color: "white", textAlign: "center", padding: "20px 5px" }} className="logo">
          LOGO
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={[
            ...adminRoutes.map((route, i) => ({
              key: i,
              icon: <Link to={"/" + route.url}>{route.icon}</Link>,
              label: route.label,
            })),
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="antd-header"
          style={{
            padding: "20px 10px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "20px 10px",
            }}
          >
            <Link to="/">User-Info</Link>
            <button className="logoutBtn" onClick={logout}>
              {/* <HiOutlineLogout className="logoutSvg" /> */}
              <CloseOutlined />
              {/* Logout */}
            </button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

// AdminLayout.propTypes = {
//   children: PropTypes.node.isRequired, // children prop validation
// };

export default AdminLayout;
