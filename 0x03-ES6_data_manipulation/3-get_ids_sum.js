export default function getStudentIdsSum(getListStudents) {
  const sum = getListStudents.reduce((accumulator, student) => accumulator + student.id, 0);

  return sum;
}
