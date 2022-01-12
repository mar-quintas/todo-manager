import { BrowserRouter, Route, Routes, useParams, UseNavigate, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import useToken from './components/useToken'
import './App.css'
import NavBar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList'
import ToAdd from './components/ToAdd'
import Stack from 'react-bootstrap/Stack'
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
          <Container>
            <Routes>
              {!token && token!=="" && token!== undefined?
              <>
                <Route path="*" element={<Navigate to="/login"/>}></Route>
                <Route exact path="/register" element={<Register setToken={setToken}/>}></Route>
                <Route exact path="/login" element={<Login setToken={setToken}/>}>
                </Route>
              </>
              :(<>
                <Route path="*" element={<Navigate to="/"/>}></Route>
                <Route path="/" element={
                    <Stack gap={4}>
                      <h1>Add your tasks!</h1>
                      <ToAdd getData={getData} token={token}/>
                      <TodoList editTitle={editTitle} editData={editData} deleteData={deleteData} todosData={todosData} getData={getData} token={token}/>
                    </Stack>
                }></Route>
              </>)}
            </Routes>
          </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
