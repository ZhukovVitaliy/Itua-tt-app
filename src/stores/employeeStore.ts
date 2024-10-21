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
      const data: IUsersCompanyCollection | null = await getAllEmployees();
      if (data) {
        this.employees = data["hydra:member"];
        this.filteredEmployees = this.employees;
      } else {
        console.error("No data received for employees");
      }
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  }

  async fetchFilteredEmployees(filters: Record<string, string>) {
    try {
      const data: IUsersCompanyCollection | null = await getFilterEmployees(
        filters
      );
      if (data) {
        this.filteredEmployees = data["hydra:member"];
      } else {
        console.error("No data received for filtered employees");
      }
    } catch (error) {
      console.error("Failed to fetch filtered employees", error);
    }
  }
}

const employeeStore = new EmployeeStore();
export default employeeStore;
