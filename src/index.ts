import { getTranscript, getStudentIDs, addStudent, addGrade, deleteStudent } from './dataService';

const main = async () => {
  try {
    // Add a student
    const newStudent = await addStudent('John Doe');
    console.log('Added student:', newStudent);

    // Get student IDs by name
    const studentIds = await getStudentIDs('John Doe');
    console.log('Student IDs for John:', studentIds);

    // Add a grade for the student
    await addGrade(newStudent.studentID, 'Math', 90);
    console.log(`Grade added for student ${newStudent.studentID}`);

    // Get the transcript for the student
    const transcript = await getTranscript(newStudent.studentID);
    console.log('Transcript:', transcript);

    // Delete the student
    await deleteStudent(newStudent.studentID);
    console.log(`Student with ID ${newStudent.studentID} deleted.`);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
