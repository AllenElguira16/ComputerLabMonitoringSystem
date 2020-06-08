interface Student {
  id?: string;
  schoolID: string;
  firstname: string;
  lastname: string;
  course: string;
}

type StudentForm = Omit<Student, "id">;

interface ServerResponse {
  error?: string;
  success?: string;
}

interface History {
  id?: string;
  student: Student;
  timeEntered: Date;
}
