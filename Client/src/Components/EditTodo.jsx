import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditTodo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const { id } = useParams()
  const fetchEditData = async () => {
    try{
      const response = await axios.get(`http://127.0.0.1:8090/api/edit_todo/${id}`)
      
      setDescription(response.data.description)
      setTitle(response.data.title)
      const formatted = formatDate(response.data.date);
      setDate(formatted)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchEditData()
  }, [])

  const navigate = useNavigate()
  const handleTodoEdit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.put(`http://127.0.0.1:8090/api/edit_todo/${id}`, {title, description, date})
      if (response) navigate('/')
      console.log('todo updated successfully...')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="justify-items-center pt-20">
      <div className="bg-gray-100 w-fit py-10 px-10">
        <p className="text-gray-800 text-center text-2xl font-bold pb-3">
          Update Todo
        </p>
        
        
        <form onSubmit={handleTodoEdit} className="flex flex-col">
          <label htmlFor="" className="text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-80 h-10 outline-none rounded-sm px-3 bg-white"
            placeholder="Enter title"
            required
          />
          <label htmlFor="" className="text-gray-700">
            Description
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            type="number"
           
            className="w-80 outline-none rounded-sm px-3 resize-none bg-white"
            placeholder="Enter description"
            required
          ></textarea>
          <label htmlFor="" className="text-gray-700">
            Date
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-80 h-10 outline-none rounded-sm px-3 bg-white"
            placeholder="Enter date"
            required
          />
          <button
            type="submit"
            className="mt-5 text-white bg-yellow-700 hover:bg-yellow-600 rounded-sm py-2"
          >
            Edit Todo
          </button>
        </form>
      </div>
    </div>
  )
}


export default EditTodo