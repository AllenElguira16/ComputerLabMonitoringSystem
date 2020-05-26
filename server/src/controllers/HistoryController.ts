import {Controller, Get, Inject} from "@tsed/common";
import History from "../models/History";
import {MongooseModel} from "@tsed/mongoose";

@Controller('/history')
class HistoryController {
  constructor(@Inject(History) private history: MongooseModel<History>) {}

  @Get()
  public getHistories() {
    return this.history.find();
  }
}

export default HistoryController;
