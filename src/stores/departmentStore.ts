import { makeAutoObservable } from "mobx";
import { getDepartments } from "../services/ituaService";
import { Department, DepartmentResponse } from "../types/departments";

class DepartmentStore {
  departments: Department[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchDepartments() {
    try {
      const data: DepartmentResponse | null = await getDepartments();
      if (data) {
        this.departments = data["hydra:member"];
      } else {
        console.error("No data received for departments");
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  }
}

const departmentStore = new DepartmentStore();
export default departmentStore;
