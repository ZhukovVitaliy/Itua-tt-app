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
      const data: DepartmentResponse = await getDepartments();
      this.departments = data["hydra:member"];
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  }
}

const departmentStore = new DepartmentStore();
export default departmentStore;
