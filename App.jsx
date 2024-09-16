import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleEdit = (e, id) => { 
    let t = todos.filter(i => i.id === id); 
    setTodo(t[0].todo);

    let newTodos = todos.filter(item => {
        return item.id !== id;
    }); 
    setTodos(newTodos);

    // Move saveToLS here, after the state is updated
    setTimeout(() => {
        saveToLS();
    }, 0); 
};

const handleDelete = (e, id) => {
  const confirmation = confirm(`Are you sure you want to delete?`);

  if (confirmation) {
      let newTodos = todos.filter(item => {
          return item.id !== id;
      });

      setTodos(newTodos);

      // Move saveToLS here, after the state is updated
      setTimeout(() => {
          saveToLS();
      }, 0);

      alert(`Item has been deleted.`);
  } else {
      alert(`Item has not been deleted.`);
  }
};
const handleAdd = ()=>{

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
    

  }
  

  const handleCheckbox =  (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted
      setTodos(newTodos)
        saveToLS()
  }
  

  const handleChange = (e)=>{
setTodo(e.target.value)
  }
  
  

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto p-5 bg-violet-200 min-h-[80vh] md:w-1/2 my-6 rounded-xl">
      <h1 className='font-bold text-center text-xl'>ITask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold my-3 '>Add a Todo</h2>
              </div>
              <div className='flex '> <input onChange={handleChange} type="text" value={todo} name="" id="" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className=' mx-2 rounded-full bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold '>Save</button>
   </div>
   <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-3'></div>
  
        <h2 className="text-xl font-bold my-5">Your Todos</h2>
        <div className='todos'>
          {todos.length ===0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item=>{
            

          
          return <div key={item.id} className="todo flex  justify-between my-3 ">
            <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
           
            </div>
           <div className="buttons flex h-full ">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-2 text-sm font-bold'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-2 text-sm font-bold'><AiFillDelete /></button>
            </div>
          </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
