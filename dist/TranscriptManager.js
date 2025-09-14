"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = initialize;
exports.getAll = getAll;
exports.addStudent = addStudent;
exports.getTranscript = getTranscript;
exports.getStudentIDs = getStudentIDs;
exports.deleteStudent = deleteStudent;
exports.addGrade = addGrade;
exports.getGrade = getGrade;
let students = [];
let nextID = 1;
function initialize() {
    students = [
        { student: { studentID: nextID++, studentName: "Sardor" }, grades: [] },
        { student: { studentID: nextID++, studentName: "Jasur" }, grades: [] },
        { student: { studentID: nextID++, studentName: "Jasur" }, grades: [] },
        { student: { studentID: nextID++, studentName: "Nigora" }, grades: [] }
    ];
}
function getAll() { return students; }
function addStudent(name) {
    const newStudent = {
        student: { studentID: nextID, studentName: name },
        grades: []
    };
    students.push(newStudent);
    return nextID++;
}
function getTranscript(studentID) {
    return students.find(s => s.student.studentID === studentID);
}
function getStudentIDs(studentName) {
    return students.filter(s => s.student.studentName === studentName)
        .map(s => s.student.studentID);
}
function deleteStudent(studentID) {
    const index = students.findIndex(s => s.student.studentID === studentID);
    if (index === -1)
        throw new Error(`No student with id = ${studentID}`);
    students.splice(index, 1);
}
function addGrade(studentID, course, grade) {
    const transcript = getTranscript(studentID);
    if (!transcript)
        throw new Error(`Student not found: ${studentID}`);
    if (transcript.grades.find(g => g.course === course))
        throw new Error(`Grade already exists for course ${course}`);
    transcript.grades.push({ course, grade });
}
function getGrade(studentID, course) {
    const transcript = getTranscript(studentID);
    if (!transcript)
        throw new Error(`Student not found: ${studentID}`);
    const gradeObj = transcript.grades.find(g => g.course === course);
    if (!gradeObj)
        throw new Error(`Grade not found for ${course}`);
    return gradeObj.grade;
}
