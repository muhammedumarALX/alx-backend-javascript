export default function getListStudentIds(param) {
  if (Array.isArray(param)) {
    const id = param.map((item) => item.id);
    return id;
  }

  return [];
}
