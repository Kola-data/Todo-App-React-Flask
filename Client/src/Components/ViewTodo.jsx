import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios' 

function ViewTodo() {
  const [todos, setTodo] = useState([])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const fetchTodo = async () => {
    const response = await axios.get('http://127.0.0.1:8090/api/view_todo_list')
    try{
      setTodo(response.data || [])
      console.log(response.data || '')
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchTodo()
  }, [])

  const deleteTodo = async (id) => {
    try{
      const response = await axios.delete(`http://127.0.0.1:8090/api/delete_todo/${id}`)
      if (response){
        console.log('Todo deleted')
        window.location.reload()
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <div className='py-3 px-20 flex justify-between bg-gray-200'>
        <p className='text-2xl font-bold pt-2'>Welcome to Todo Web App</p>
        <Link to={'/add-todo'} className='bg-yellow-700 text-white py-3 px-5 
        hover:bg-yellow-600 hover:text-white rounded-md'>Add new todo</Link>
      </div>
      <div className="flex justify-center items-center py-5">
        <div className="bg-gray-50 rounded-md py-5 px-5 w-[400px] h-[500px] overflow-hidden">
          <p className="pb-2 text-center text-xl text-gray-800">All of your todo's list</p>
          { todos.map(todo => (
            <div key={todo.id}>
              <div className='flex justify-between'>
                <div className="w-9/12">
                  <h2 className="break-words text-lg font-semibold text-gray-600">{todo.title}</h2>
                  <p className="break-words whitespace-normal py-2 text-gray-700">
                    {todo.description}
                  </p>
                  <p className=" break-words text-gray-600"> {formatDate(todo.date)} </p>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-transparent'>aaa</p>
                  <Link to={`/edit-todo/${todo.id}`} className='w-[80px] bg-green-600 text-white rounded-sm py-[3px] text-center'>Edit</Link>
                  <button onClick={() => deleteTodo(todo.id)} className='w-[80px] bg-red-600 text-white rounded-sm py-[3px] cursor-pointer'>Remove</button>
                </div>
                
              </div>
              <p className='border-b-2 text-black pt-2'></p>
            </div>
          )) }
        </div>
      </div>

    </div>
  )
}

export default ViewTodo