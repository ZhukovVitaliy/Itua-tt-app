import { makeAutoObservable } from "mobx";
import { getAllEmployees, getFilterEmployees } from "../services/ituaService";
import {
  ICompanyUser,
  IUsersCompanyCollection,
} from "../types/usersCompanyCollection";

class EmployeeStore {
  employees: ICompanyUser[] = [];
  filteredEmployees: ICompanyUser[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllEmployees() {
    try {
      const data: IUsersCompanyCollection = await getAllEmployees();
      this.employees = data["hydra:member"];
      this.filteredEmployees = this.employees;
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  }

  async fetchFilteredEmployees(filters: Record<string, string>) {
    try {
      const data: IUsersCompanyCollection = await getFilterEmployees(filters);
      this.filteredEmployees = data["hydra:member"];
    } catch (error) {
      console.error("Failed to fetch filtered employees", error);
    }
  }
}

const employeeStore = new EmployeeStore();
export default employeeStore;
