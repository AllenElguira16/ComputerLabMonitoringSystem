import React from "react";
import { action, observable } from "mobx";
import Axios, { AxiosResponse } from "axios";

class StudentStore {
  @observable public students: Student[] = [];
  @observable public isLoggedIn: boolean = false;

  @action.bound
  public async setAsLoggedIn(bool: boolean) {
    this.isLoggedIn = bool;
  }

  @action.bound
  public async getStudents() {
    const { data }: AxiosResponse<Student[]> = await Axios.get("/students");
    this.students = data;
    // return data;
  }

  @action.bound
  public async addStudent(student: StudentForm) {
    const { data } = await Axios.post("/students", student);
    return data;
  }

  @action.bound
  public async editStudent(student: StudentForm) {
    const { data } = await Axios.put("/students", student);
    return data;
  }

  @action.bound
  public async deleteStudent(studentID: StudentForm["schoolID"]) {
    const { data } = await Axios.delete(`/students/${studentID}`);
    return data;
  }

  // Auth
  @action.bound
  public async login(schoolID: Student["schoolID"]) {
    const { data } = await Axios.post("/students/login", { schoolID });
    return data;
  }
}

export default React.createContext(new StudentStore());
