import React from "react";
import { action, observable } from "mobx";
import Axios, { AxiosResponse } from "axios";

class HistoryStore {
  @observable
  public histories: History[] = [];

  @action.bound
  public async getHistories() {
    const { data }: AxiosResponse<History[]> = await Axios.get("/history");
    this.histories = data;
    // return data;
  }
}

export default React.createContext(new HistoryStore());
