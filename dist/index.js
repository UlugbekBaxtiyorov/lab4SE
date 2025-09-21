"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataService_1 = require("./dataService");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Add a student
        const newStudent = yield (0, dataService_1.addStudent)('John Doe');
        console.log('Added student:', newStudent);
        // Get student IDs by name
        const studentIds = yield (0, dataService_1.getStudentIDs)('John Doe');
        console.log('Student IDs for John:', studentIds);
        // Add a grade for the student
        yield (0, dataService_1.addGrade)(newStudent.studentID, 'Math', 90);
        console.log(`Grade added for student ${newStudent.studentID}`);
        // Get the transcript for the student
        const transcript = yield (0, dataService_1.getTranscript)(newStudent.studentID);
        console.log('Transcript:', transcript);
        // Delete the student
        yield (0, dataService_1.deleteStudent)(newStudent.studentID);
        console.log(`Student with ID ${newStudent.studentID} deleted.`);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
main();
