import { useEffect, useState } from "react";
import axios from "axios"

function App() {

  const [students, setStudents] = useState([]);


  //Task 1
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  //Task 4
  const [editingId, setEditingId] = useState(null);

  const editStudent = (student) =>{
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  }

  const updateStudent = () =>{
    axios
    .put(`http://localhost:5000/students/${editingId}`, {
      name: name,
      course: course,
      age: age,
    })
    .then(() =>{
      axios
      .get("http://localhost:5000/students")
      .then((response) =>{
        setStudents(response.data);
      });
      setEditingId(null);
      setName("");
      setCourse("");
      setAge("");
    });
  }

  useEffect(() =>{

    axios
    .get("http://localhost:5000/students")
    .then((response) =>{
      setStudents(response.data);
    });

  }, []);

//Task 1
  const addStudent = () => (
    axios
    .post("http://localhost:5000/students", {
      name: name,
      course: course,
      age: age,
    })
    .then((response) =>{
      setStudents([...students, response.data])

      setName("");
      setCourse("");
      setAge("");
    })
  )

  //Task 3
  const deleteStudent = (id) => {
    axios
    .delete(`http://localhost:5000/students/${id}`)
    .then(() =>{
      axios
      .get("http://localhost:5000/students")
      .then((response) =>{
        setStudents(response.data);
      })
    })
  }



  return(
    <div>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>

      

      <input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
      <br /><br />

      <input placeholder="Course" value={course} onChange={(event) => setCourse(event.target.value)}/>
      <br /><br />

      <input placeholder="Age" value={age} onChange={(event) => setAge(event.target.value)}/>
      <br /><br />

      {/* <button onClick={addStudent}>Add Student</button> */}

      {editingId === null ? (
        <button onClick={addStudent}>Add Student</button>
      ) : (
        <button onClick={updateStudent}>Update Student</button>
      )} 

      <h2>Students</h2>
      
      {/* <p>No students yet.</p> */}


      {students.map((student) =>(
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button onClick={() => editStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
          
          <hr />



        </div>
        
      ))}

      

    </div>
  )
}

export default App;