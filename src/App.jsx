import { useEffect, useState } from 'react'
import supabase from './supabase-client'


// so sending the .single() in the end means something like when u sendit like u get only the one that u get but when u dont use single u get all the data items that u have added 

function App() { 
  const [todoList , setTodoList] = useState([]);
  const [newTodo , setNewTodo] = useState("")
  const addtodo = async () => {
    const newTodoData = {
      name : newTodo ,
      isCompleted : false
    }
    const {data , error}  = await supabase.from("todo").insert([newTodoData]).single();
    if (error) {
      console.log("Error while adding the todo" , error)
    } else {
      console.log(data)
      console.log("todo has been added successfully")
      console.log(todoList)
      setTodoList((prev)=>[...prev , newTodoData])
      setNewTodo("");
    }

  }
  const getAllTodos = async () => {
    const {data , error} = await supabase.from("todo").select("*")
    if (error) {
      console.log("An error has been occured " , error)
    }
    setTodoList(data)
    console.log(data) 
  }

  


  const handleCompleteTask = async (id) => {
    const { data, error } = await supabase
      .from("todo")
      .update({ isCompleted: true })
      .eq("id", id)
      .select(); // optional but useful
  
    if (error) {
      console.log("Error while ticking the todo");
    } else {
      console.log("Updated todo:", data);
      setTodoList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isCompleted: true } : item
        )
      );
    }
  };
  
  useEffect(()=>{
    getAllTodos()
  },[newTodo])

  return (
    <div style={{
      padding : '20px'
    }}>
      <h1>To do list</h1>
      <div style={{
        gap : "10px" ,
        display :'flex' ,
        flexDirection : 'col' ,
        

      }}>
        <input type="text" style={{
           padding: '10px',
           backgroundColor: '#333',
           marginBottom: '10px',
           borderRadius: '8px',
        }} onChange={(e)=> setNewTodo(e.target.value)} placeholder='new todo...' />
        <button onClick={addtodo} style={{
           padding: '10px',
           backgroundColor: '#333',
           marginBottom: '10px',
           borderRadius: '8px',
        }} >Add Todo Item</button>
        </div>
        <div>

        <div style={{ display: "flex", gap: "40px" }}>
  {/* Todo Section */}
  <div>
    <h2 style={{ color: 'white' }}>Todo</h2>
    {
      todoList?.filter(x => !x.isCompleted).map((x) => (
        <div
          key={x.id}
          style={{
            width: '500px',
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            padding: '10px',
            backgroundColor: '#333',
            marginBottom: '10px',
            borderRadius: '8px',
            justifyContent : 'space-between',
            alignItems : 'center'
          }}
        >
          <span className='text1' style={{ color: 'white' }}>{x.name}</span>
          <div style={{
            gap : "5px" , 
            display : 'flex'
          }}>
            <button
              style={{
                padding: '10px',
                borderRadius: '10px',
                color: 'yellow',
                backgroundColor: '#555',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleCompleteTask(x.id)}
            >
              Done
            </button>
            <DeleteButton id={x.id} setTodoList={setTodoList}/>
          </div>
        </div>
          
          
      ))
    }
  </div>

  {/* Completed Section */}
  <div>
    <h2 style={{ color: 'white' }}>Completed</h2>
    {
      todoList?.filter(x => x.isCompleted).map((x) => (
        <div
          key={x.id}
          style={{
            width: '500px',
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            padding: '10px',
            backgroundColor: '#222',
            marginBottom: '10px',
            borderRadius: '8px',
            justifyContent : 'space-between',
            alignItems : 'center'
          }}
        >
          <span className='text1' style={{ color: 'lightgreen' }}>{x.name}</span>
          <div style={{
            display : "flex" ,
            gap : "10px"
          }}>
          <p style={{ color: 'white' }}>✔️ Completed</p>
          <DeleteButton id={x.id} setTodoList={setTodoList}/>
          </div>
        </div>
      ))
    }
  </div>
</div>

    </div>
    </div>
  )

}

function DeleteButton ({id , setTodoList }) {
  const handleDeleteTodo = async () => {
    const {data , error} = await supabase.from('todo').delete().eq('id' , id)
    if (error) {
      console.log("Error while deleting the todo list" , error)
    } else {
      console.log(data)
      setTodoList((prev)=> prev.filter((item) =>  item.id !== id))
    }

  }
  return (
    <button
              style={{
                padding: '10px',
                borderRadius: '10px',
                color: 'red',
                backgroundColor: '#555',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={handleDeleteTodo}
            >
              Delete
          </button>
  )
}


export default App
