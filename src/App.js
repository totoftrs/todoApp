import { useState } from "react";
import "./styles.css";

const student_list = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe"
  },
  {
    id: 2,
    firstName: "steve",
    lastName: "Doe"
  }
];
export default function App() {
  const [students, setStudents] = useState(student_list);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [edit, setEdit] = useState(false);

  const [updateStudent, setUpdateStudent] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents((prev) => [
      ...prev,
      { id: students.length + 1, firstName, lastName }
    ]);
  };
  const first = (e) => {
    setFirstname(e.target.value);
  };
  const second = (e) => {
    setLastname(e.target.value);
  };

  const handleClick = (id) => () => {
    setStudents(students.filter((x) => x.id !== id));
  };

  const handleEdit = (student) => () => {
    setEdit(!edit);
    setUpdateStudent(student);
    console.log();
  };

  const updateFirst = (e) => {
    setUpdateStudent({ ...updateStudent, firstName: e.target.value });
  };

  const updateSecond = (e) => {
    setUpdateStudent({ ...updateStudent, lastName: e.target.value });
  };

  const handleChange = (index) => () => {
    setStudents((prev) => {
      const copyList = [...prev];
      copyList[index] = {
        id: updateStudent.id,
        firstName: updateStudent.firstName,
        lastName: updateStudent.lastName
      };
      return copyList;
    });
  };
  return (
    <div className="App">
      <h1> Students List </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="firstname" onChange={first} />
        <input type="text" placeholder="lastname" onChange={second} />
        <button> student</button>
      </form>

      {students.map((student, index) => (
        <div key={index} className="student">
          <div> {student.id} </div>
          <div> {student.firstName} </div>
          <div> {student.lastName} </div>
          <button onClick={handleClick(student.id)}>delete</button>
          {edit && student.id === updateStudent.id && (
            <form onSubmit={handleChange(index)}>
              <input
                type="text"
                defaultValue={updateStudent.firstName}
                onChange={updateFirst}
              />
              <input
                type="text"
                defaultValue={updateStudent.lastName}
                onChange={updateSecond}
              />
              <button> student</button>
            </form>
          )}
          <button onClick={handleEdit(student)}>edit</button>
        </div>
      ))}
    </div>
  );
}
