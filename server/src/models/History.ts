import { Model, ObjectID } from "@tsed/mongoose";
import { Property, Default } from "@tsed/common";

@Model()
class History {
  @ObjectID("id")
  public _id!: string;

  @Property()
  public schoolID!: string;

  @Property()
  @Default(Date.now())
  public timeEntered!: Date;
}

export default History;
