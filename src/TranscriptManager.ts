export type StudentID = number;
export type Student = { studentID: number, studentName: string };
export type Course = string;
export type CourseGrade = { course: Course, grade: number };
export type Transcript = { student: Student, grades: CourseGrade[] };

let students: Transcript[] = [];
let nextID: number = 1;

export function initialize() {
  students = [
    { student: { studentID: nextID++, studentName: "Sardor" }, grades: [] },
    { student: { studentID: nextID++, studentName: "Jasur" }, grades: [] },
    { student: { studentID: nextID++, studentName: "Jasur" }, grades: [] },
    { student: { studentID: nextID++, studentName: "Nigora" }, grades: [] }
  ];
}

export function getAll(): Transcript[] { return students; }

export function addStudent(name: string): StudentID {
  const newStudent: Transcript = {
    student: { studentID: nextID, studentName: name },
    grades: []
  };
  students.push(newStudent);
  return nextID++;
}

export function getTranscript(studentID: StudentID): Transcript | undefined {
  return students.find(s => s.student.studentID === studentID);
}

export function getStudentIDs(studentName: string): StudentID[] {
  return students.filter(s => s.student.studentName === studentName)
                 .map(s => s.student.studentID);
}

export function deleteStudent(studentID: StudentID) {
  const index = students.findIndex(s => s.student.studentID === studentID);
  if (index === -1) throw new Error(`No student with id = ${studentID}`);
  students.splice(index, 1);
}

export function addGrade(studentID: StudentID, course: Course, grade: number) {
  const transcript = getTranscript(studentID);
  if (!transcript) throw new Error(`Student not found: ${studentID}`);
  if (transcript.grades.find(g => g.course === course))
    throw new Error(`Grade already exists for course ${course}`);
  transcript.grades.push({ course, grade });
}

export function getGrade(studentID: StudentID, course: Course): number {
  const transcript = getTranscript(studentID);
  if (!transcript) throw new Error(`Student not found: ${studentID}`);
  const gradeObj = transcript.grades.find(g => g.course === course);
  if (!gradeObj) throw new Error(`Grade not found for ${course}`);
  return gradeObj.grade;
}
