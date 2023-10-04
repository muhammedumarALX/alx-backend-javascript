// Define interface
interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  }

  // create students
  const student1: Student = {
    firstName: 'Gbeminiyi',
    lastName: 'Samagbeyi',
    age: 25,
    location: 'Lagos'
  }

  const student2: Student = {
    firstName: 'Grace',
    lastName: 'Samagbeyi',
    age: 62,
    location: 'Lagos',
  }

  // Create an array containing the two students
  const studentsList: Student[] = [student1, student2];

  // render a table and for each elements in the array
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');
  const firstNameRow = document.createElement("td");
  const lastNameRow = document.createElement("td");
  const ageRow = document.createElement("td");
  const locationRow = document.createElement("td");
  firstNameRow.textContent = 'FirstName';
  lastNameRow.textContent = 'LastName';
  ageRow.textContent = 'Age';
  locationRow.textContent = 'Location';

  hrow.appendChild(firstNameRow);
  hrow.appendChild(lastNameRow);
  hrow.appendChild(ageRow);
  hrow.appendChild(locationRow);

  tbody.appendChild(hrow);

  // append a new row to the table
  studentsList.forEach((student) => {
    const row = document.createElement("tr");
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const ageCell = document.createElement("td");
    const locationCell = document.createElement("td");

    firstNameCell.textContent = student.firstName;
    lastNameCell.textContent = student.lastName;
    ageCell.textContent = String(student.age);
    locationCell.textContent = student.location;

    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(ageCell);
    row.appendChild(locationCell);

    tbody.appendChild(row);
  });

  // Append the tbody to the table
  table.appendChild(tbody);
  document.body.appendChild(table);
