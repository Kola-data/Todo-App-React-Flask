import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const navigate = useNavigate()
  const handleTodoSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post("http://127.0.0.1:8090/api/add_todo", {title, description, date})
      if (response) navigate('/');
      console.log('todo added successfully...')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="justify-items-center pt-20">
      <div className="bg-gray-100 w-fit py-10 px-10">
        <p className="text-gray-800 text-center text-2xl font-bold pb-3">
          Add New Todo
        </p>
        
        
        <form onSubmit={handleTodoSubmit} className="flex flex-col">
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
            Add Todo
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTodo