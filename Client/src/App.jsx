import {BrowserRouter, Routes, Route} from "react-router-dom"
import AddTodo from "./Components/AddTodo"
import ViewTodo from "./Components/ViewTodo"
import EditTodo from "./Components/EditTodo"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewTodo />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/edit-todo/:id" element={<EditTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
