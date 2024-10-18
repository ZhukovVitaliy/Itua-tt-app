import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import authStore from "../stores/AuthStore";

const SideMenu: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/logout") {
      authStore.logout();
      navigate("/singin");
    } else {
      navigate(key);
    }
  };

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    authStore.isAuthenticated && { key: "/departments", label: "Departments" },
    authStore.isAuthenticated && { key: "/employee", label: "Employee" },
    authStore.isAuthenticated
      ? { key: "/logout", label: "Sign Out", style: { marginLeft: "auto" } }
      : { key: "/singin", label: "Sign In", style: { marginLeft: "auto" } },
  ].filter(Boolean);

  return (
    <Menu
      onClick={handleMenuClick}
      defaultSelectedKeys={[window.location.pathname]}
      mode="horizontal"
      items={menuItems}
    />
  );
});

export default SideMenu;
