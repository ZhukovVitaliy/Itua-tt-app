import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tree, Avatar, Tooltip, Button } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";

import departmentStore from "../../stores/departmentStore";
import { Department } from "../../types/departments";

import styles from "./DepartmentPage.module.css";

interface TreeNode {
  title: JSX.Element;
  key: string;
  children?: TreeNode[];
}

const buildTreeData = (departments: Department[]): TreeNode[] => {
  const deptMap: Record<number, Department & { children: Department[] }> = {};

  departments.forEach((dept) => {
    deptMap[dept.id] = { ...dept, children: [] };
  });

  const treeData: Department[] = [];

  departments.forEach((dept) => {
    if (
      dept.parent &&
      typeof dept.parent === "object" &&
      deptMap[dept.parent.id]
    ) {
      deptMap[dept.parent.id].children.push(deptMap[dept.id]);
    } else {
      treeData.push(deptMap[dept.id]);
    }
  });

  const convertToTreeNodes = (departments: Department[]): TreeNode[] => {
    return departments.map((department) => ({
      title: (
        <div className={styles.departmentRow}>
          <span>{department.title}</span>
          <div className={styles.departmentActions}>
            <span className={styles.departmentChief}>
              Керівник: {department.chief?.fullName}
            </span>
            <Avatar
              src={department.chief?.image?.contentUrl || ""}
              alt={department.chief?.fullName || ""}
              icon={<UserOutlined />}
            />
            <Tooltip title="Редагувати">
              <Button
                shape="circle"
                icon={<EditOutlined />}
                size="small"
                style={{ marginLeft: 8 }}
              />
            </Tooltip>
            <Tooltip title="Видалити">
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                size="small"
                style={{ marginLeft: 8 }}
              />
            </Tooltip>
          </div>
        </div>
      ),
      key: `dept-${department.id}`,
      children: department.children
        ? convertToTreeNodes(department.children)
        : [],
    }));
  };

  return convertToTreeNodes(treeData);
};

const DepartmentTree: React.FC = observer(() => {
  useEffect(() => {
    departmentStore.fetchDepartments();
  }, []);

  return (
    <div className={styles.departmentTreeContainer}>
      <h3>Структура компанії</h3>
      <Tree
        treeData={buildTreeData(departmentStore.departments)}
        defaultExpandAll
        showLine={false}
        className={styles.departmentTree}
      />
    </div>
  );
});

export default DepartmentTree;
