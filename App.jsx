import axios from "axios"; 
import { useEffect, useState } from "react";

const API ="http://localhost:5000/students"

function App(){

  const [students, setStudents]=useState([]);
  const [name,setName]=useState("");
  const [course,setCourse]=useState("");
  const [age,setAge]=useState("");
  const [editingId,setEditingId]=useState(null);

  const getStudents=async()=>{
    const res=await axios.get(API);
  };

  useEffect(()=>{
    getStudents();
  }, []);

  const handleSubmit=async ()=>{
    if(editingId){
      await axios.put(`${API}/${editingId}`,{name,course,age});
    }else{
      await axios.post(API,{name,course,age});
    }
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
    getStudents();
  };
  

  const handleEdit= (student)=>{
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  }

  const handleDelete=async(id)=>{
    await axios.delete(`${API}/${id}`);
    getStudents();
  }


  useEffect(() =>{

    axios 
      .get("http://localhost:5000/students")
      .then((response)=>{
        setStudents(response.data);
      });
  },[]);


  return (
    <div>
     <h1>Student Management System</h1>

     <input placeholder="Name" value={name} onChange={(e)=>{
        setName(e.target.value)}}/>
      <br></br>  
     <input placeholder="Course" value={course} onChange={(e)=>{
        setCourse(e.target.value)}}/>
        <br></br> 
     <input placeholder="Age" value={age} onChange={(e)=>{
        setAge(e.target.value)}}/>
     <br></br> 
     <button onClick={handleSubmit}>
       {editingId ? "Update Student" : "Add Student"}
     </button>
      
     <h2>Students</h2>
      <br></br>
     {students.map((student)=>(
      <div key={student.id}>
        <p>{student.name} | {student.course} | {student.age}</p>  
        <br></br>
        <button onClick={() => handleEdit(student)}>Edit</button>
        
        <button onClick={() => handleDelete(student._id)}>Delete</button>
      </div>

     ))}
    </div>
  );
}

export default App;