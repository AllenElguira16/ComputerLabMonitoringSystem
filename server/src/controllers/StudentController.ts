import {
  Controller,
  Get,
  Inject,
  Post,
  BodyParams,
  Put,
  Delete,
  PathParams
} from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import SocketService from "services/SocketService";
import Student from "models/Student";
// import { User } from "type";

@Controller("/students")
class StudentController {
  constructor(
    @Inject(Student)
    private studentModel: MongooseModel<Student>,
    private socketService: SocketService
  ) {}

  @Get()
  async fetch() {
    return await this.studentModel.find();
  }

  /**
   * Add new Student to the database
   * @param studentForm contains new Student info
   */
  @Post()
  async addStudent(@BodyParams() studentForm: StudentForm) {
    try {
      const { schoolID, firstname, lastname, course } = studentForm;
      if (
        schoolID === "" &&
        firstname === "" &&
        lastname === "" &&
        course === ""
      )
        throw "Input Fields are Empty";

      // Check if user exists
      if ((await this.studentModel.countDocuments({ schoolID })) !== 0)
        throw "SchoolID already exists!";

      const student = new this.studentModel({
        schoolID,
        firstname,
        lastname,
        course
      });
      await student.save();
    } catch (error) {
      if (error) return { error };
    }
    return { success: "Student added!" };
  }

  @Put()
  async editStudent(@BodyParams() studentForm: Student) {
    try {
      const { _id, schoolID, firstname, lastname, course } = studentForm;
      if (
        schoolID === "" &&
        firstname === "" &&
        lastname === "" &&
        course === ""
      )
        throw "Input Fields are Empty";

      const studentModel = await this.studentModel.findById(_id);
      if (studentModel) {
        const student: Student = {
          _id: studentModel._id.toString(),
          schoolID: studentModel.schoolID,
          firstname: studentModel.firstname,
          lastname: studentModel.lastname,
          course: studentModel.course
        };
        // console.table(student);
        // console.table(studentForm);
        // console.log(student._id === studentForm._id);
        if (this.isEquivalent(studentForm, student))
          throw "No changes have been made";

        let isSameID = student.schoolID === schoolID;
        // Check if user exists
        if (
          !isSameID &&
          (await this.studentModel.countDocuments({ schoolID })) !== 0
        )
          throw "SchoolID already exists!";
      }

      await this.studentModel
        .findByIdAndUpdate(_id, {
          schoolID,
          firstname,
          lastname,
          course
        })
        .exec();
      // await student.exec();
      // console.log();
    } catch (error) {
      if (error) return { error };
    }
    return { success: "Student Edited!" };
  }

  isEquivalent(a: any, b: any) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  @Delete("/:id")
  async deleteStudent(@PathParams() { id }: Pick<StudentForm, "id">) {
    try {
      await this.studentModel.findByIdAndDelete(id);
    } catch (error) {
      if (error) return { error };
    }
    return { success: "Student Deleted!" };
  }

  @Post("/login")
  async login(@BodyParams() { schoolID }: Pick<StudentForm, "schoolID">) {
    try {
      const student = await this.studentModel.findOne({ schoolID });
      if (!student) throw "Student not found!";

      this.socketService.closeWindow();
      return { success: student };
    } catch (error) {
      if (error) return { error };
    }
  }
}

export default StudentController;
