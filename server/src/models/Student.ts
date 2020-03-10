import { Model, ObjectID } from "@tsed/mongoose";
import { Property, Default } from "@tsed/common";

@Model()
class Student {
  @ObjectID("id")
  public _id!: string;

  @Property()
  public schoolID!: string;

  @Property()
  public firstname!: string;

  @Property()
  public lastname!: string;

  @Property()
  public course!: string;
}

export default Student;
