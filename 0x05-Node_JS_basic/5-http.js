const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1245;

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

      // Create a formatted output string
      let output = `Number of students: ${totalStudents}\n`;
      for (const [field, group] of Object.entries(studentBatch)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        output += `Number of students in ${field}: ${group.length}. List: ${studentNames}\n`;
      }

      resolve(output);
    }
  });
});

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the list of our students\n');
    countStudents(process.argv[2].toString())
      .then((output) => {
        res.end(output);
      })
      .catch(() => {
        res.statusCode = 404;
        res.end('Cannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain'); // Set Content-Type here
    res.end('Not Found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
