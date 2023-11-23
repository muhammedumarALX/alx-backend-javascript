const fs = require('fs');

const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const linesOfFile = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentBatch = {};
      const fieldNames = linesOfFile[0].split(',');
      const studentPropNames = fieldNames
        .slice(0, fieldNames.length - 1);
      for (const line of linesOfFile.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord
          .slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];
        if (!Object.keys(studentBatch).includes(field)) {
          studentBatch[field] = [];
        }
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);
        studentBatch[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object
        .values(studentBatch)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(studentBatch)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
