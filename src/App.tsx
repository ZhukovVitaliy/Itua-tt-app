import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import SideMenu from "./components/SideMenu";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import DepartmentPage from "./pages/DepartmentPage/DepartmentPage";

import styles from "./App.module.css";

const App: React.FC = observer(() => (
  <div className={styles.appContainer}>
    <SideMenu />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/singin" element={<LoginPage />} />
      <Route path="/departments" element={<DepartmentPage />} />
      <Route path="/employee" element={<EmployeePage />} />
    </Routes>
  </div>
));

export default App;
