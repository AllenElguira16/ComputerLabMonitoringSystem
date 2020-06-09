import React from "react";
import { action, observable } from "mobx";
import Axios, { AxiosResponse } from "axios";

class PCStore {
  @observable
  public pc_no?: string;

  @observable
  public isSet?: boolean;

  @action.bound
  public async getPCNo() {
    const {data}: AxiosResponse = await Axios.get("/pc");
    this.pc_no = data;
    this.isSet = data === undefined || data === '';
  }

  @action.bound
  public async setPCNo(pc_no: string|null) {
    await Axios.get(`http://localhost:8000/pc/set?pc_no=${pc_no}`);
    await this.getPCNo();
  }
}

export default React.createContext(new PCStore());
