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
exports.deleteStudent = exports.addGrade = exports.addStudent = exports.getStudentIDs = exports.getTranscript = void 0;
const remoteService_1 = require("./remoteService");
const getTranscript = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, remoteService_1.remoteGet)(`/transcripts/${id}`);
});
exports.getTranscript = getTranscript;
const getStudentIDs = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, remoteService_1.remoteGet)(`/studentids?name=${name}`);
});
exports.getStudentIDs = getStudentIDs;
const addStudent = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, remoteService_1.remotePost)(`/transcripts`, { name });
});
exports.addStudent = addStudent;
const addGrade = (id, course, grade) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ID type:', typeof id); // Log the type of id
    return (0, remoteService_1.remotePost)(`/transcripts/${id}/${course}`, { 'grade': grade });
});
exports.addGrade = addGrade;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, remoteService_1.remoteDelete)(`/transcripts/${id}`);
});
exports.deleteStudent = deleteStudent;
