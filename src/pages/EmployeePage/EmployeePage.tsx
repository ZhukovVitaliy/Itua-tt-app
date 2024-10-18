import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { Table, Input, Button, Drawer, Form, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import employeeStore from "../../stores/employeeStore";

interface IFiltersEmployee {
  name: string;
  lastName: string;
  position: string;
  email: string;
  [key: string]: string;
}

const EmployeePage = observer(() => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [filters, setFilters] = useState<IFiltersEmployee>({
    name: "",
    lastName: "",
    position: "",
    email: "",
  });

  useEffect(() => {
    employeeStore.fetchAllEmployees();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const getNonEmptyFilters = () => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim())
    );
  };

  const applyFilters = () => {
    const nonEmptyFilters = getNonEmptyFilters();
    employeeStore.fetchFilteredEmployees(nonEmptyFilters);
    setDrawerVisible(false);
  };

  const resetFilters = () => {
    setFilters({ name: "", lastName: "", position: "", email: "" });
    employeeStore.fetchAllEmployees();
  };

  const columns = [
    { title: "Ім'я", dataIndex: "name", key: "name" },
    { title: "Прізвище", dataIndex: "lastName", key: "lastName" },
    { title: "Посада", dataIndex: "position", key: "position" },
    { title: "E-mail", dataIndex: "email", key: "email" },
  ];

  return (
    <div style={{ padding: "5px" }}>
      <h2>Співробітники</h2>

      <Button
        type="primary"
        icon={<FilterOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Фільтри
      </Button>

      <Drawer
        title="Фільтри"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={isDrawerVisible}
        width={320}
      >
        <Form layout="vertical">
          <Form.Item label="Ім'я">
            <Input
              placeholder="Ім'я"
              value={filters.name}
              onChange={(e: { target: { value: string } }) =>
                handleFilterChange("name", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Прізвище">
            <Input
              placeholder="Прізвище"
              value={filters.lastName}
              onChange={(e: { target: { value: string } }) =>
                handleFilterChange("lastName", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Посада">
            <Input
              placeholder="Посада"
              value={filters.position}
              onChange={(e: { target: { value: string } }) =>
                handleFilterChange("position", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input
              placeholder="E-mail"
              value={filters.email}
              onChange={(e: { target: { value: string } }) =>
                handleFilterChange("email", e.target.value)
              }
            />
          </Form.Item>
          <Space>
            <Button type="primary" onClick={applyFilters}>
              Фільтрувати
            </Button>
            <Button onClick={resetFilters}>Очистити</Button>
          </Space>
        </Form>
      </Drawer>

      <Table
        dataSource={employeeStore.filteredEmployees}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
});

export default EmployeePage;
