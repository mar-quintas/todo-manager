import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import useToken from './components/useToken'
import './App.css'
import NavBar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // NO los esta destructurando en el mismo orden que los exporto...
  const { token, removeToken, setToken } = useToken();

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
              </>)}
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
