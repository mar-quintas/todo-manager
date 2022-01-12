import { BrowserRouter, Route, Routes, useParams, UseNavigate } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import useToken from './components/useToken'
import './App.css'
import NavBar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList'
import ToAdd from './components/ToAdd'
import Container from 'react-bootstrap/Container'
import useTodosData from './components/useTodosData'

function App() {
  // NO los esta destructurando en el mismo orden que los exporto...
  const { token, removeToken, setToken } = useToken();
  const { todosData, getData, deleteData, editData, editTitle } = useTodosData();

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar token={token} removeToken={removeToken}/>
            <Routes>
              {!token && token!=="" && token!== undefined?
              <>
                <Route exact path="/register" element={<Register setToken={setToken}/>}></Route>
                <Route exact path="/login" element={<Login setToken={setToken}/>}>
                </Route>
              </>
              :(<>

                <Route path="/" element={<Profile token={token}/>}></Route>
                <Route path="/profile" element={
                  <Container>
                    <ToAdd getData={getData} token={token}/>
                    <TodoList editTitle={editTitle} editData={editData} deleteData={deleteData} todosData={todosData} getData={getData} token={token}/>
                  </Container>
                }></Route>
              </>)}
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
