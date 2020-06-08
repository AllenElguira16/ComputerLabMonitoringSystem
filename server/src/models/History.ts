import {Model, ObjectID, Ref} from "@tsed/mongoose";
import { Property, Default } from "@tsed/common";
import Student from "./Student";

@Model()
class History {
  @ObjectID("id")
  public _id!: string;

  @Property()
  @Ref(Student)
  public student!: Student;

  @Property()
  @Default(Date.now())
  public timeEntered!: Date;
}

export default History;
