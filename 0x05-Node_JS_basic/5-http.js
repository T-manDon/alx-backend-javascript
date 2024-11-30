const http = require('http');
const { readFile } = require('fs');

const hostname = '127.0.0.1';
const port = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let totalStudents = 0;

  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      let output = '';
      const lines = data.toString().split('\n');

      lines.forEach((line, index) => {
        if (line && index > 0) { // Skip the header row
          totalStudents += 1;
          const [name, , , field] = line.split(',');

          if (!students[field]) {
            students[field] = [];
            fields[field] = 0;
          }

          students[field].push(name);
          fields[field] += 1;
        }
      });

      output += `Number of students: ${totalStudents}\n`;
      for (const [field, count] of Object.entries(fields)) {
        output += `Number of students in ${field}: ${count}. `;
        output += `List: ${students[field].join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((output) => res.end(output))
      .catch(() => {
        res.statusCode = 404;
        res.end('Cannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
