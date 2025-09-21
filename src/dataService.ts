import { remoteGet, remotePost, remoteDelete } from './remoteService';

export type Student = { studentID: number, studentName: string };
export type CourseGrade = { course: string, grade: number };
export type Transcript = { student: Student, grades: CourseGrade[] };

export const getTranscript = async (id: number): Promise<Transcript> => {
  return remoteGet(`/transcripts/${id}`);
};

export const getStudentIDs = async (name: string): Promise<number[]> => {
  return remoteGet(`/studentids?name=${name}`);
};

export const addStudent = async (name: string): Promise<Student> => {
  return remotePost(`/transcripts`, { name });
};

export const addGrade = async (id: number, course: string, grade: number) => {
  console.log('ID type:', typeof id);  // Log the type of id
  return remotePost(`/transcripts/${id}/${course}`, { 'grade': grade });
};

export const deleteStudent = async (id: number) => {
  return remoteDelete(`/transcripts/${id}`);
};
