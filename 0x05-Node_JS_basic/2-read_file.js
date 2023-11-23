const fs = require('fs');

const countStudents = ((filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(filePath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const linesOfFile = fs
    .readFileSync(filePath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const studentBatch = {};
  const fieldNames = linesOfFile[0].split(',');
  const studentNames = fieldNames.slice(0, fieldNames.length - 1);

  for (const line of linesOfFile.slice(1)) {
    const studentRecord = line.split(',');
    const studentValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!Object.keys(studentBatch).includes(field)) {
      studentBatch[field] = [];
    }
    const studentEntries = studentNames
      .map((propName, index) => [propName, studentValues[index]]);
    studentBatch[field].push(Object.fromEntries(studentEntries));
  }

  const totalStudents = Object
    .values(studentBatch)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(studentBatch)) {
    const eachStudentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${eachStudentNames}`);
  }
});

module.exports = countStudents;
