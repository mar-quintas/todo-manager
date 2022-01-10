import { useState } from 'react';
import axios from "axios";

function Register(props) {

    const [registerForm, setregisterForm] = useState({
      email: "",
      password: "",
      confirmation:""
    })

    function registerIn(event) {
      axios({
        method: "POST",
        url:"/register",
        data:{
          email: registerForm.email,
          password: registerForm.password,
          confirmation: registerForm.confirmation
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setregisterForm(({
        email: "",
        password: "",
        confirmation:""}))

      event.preventDefault()
    }

    function handleChange(event) {
      const {value, name} = event.target
      setregisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h2>Register</h2>
          <form className="register">
            <input onChange={handleChange}
                  type="email"
                  text={registerForm.email}
                  name="email"
                  placeholder="Email"
                  value={registerForm.email} />
            <input onChange={handleChange}
                  type="password"
                  text={registerForm.password}
                  name="password"
                  placeholder="Password"
                  value={registerForm.password} />
            <input onChange={handleChange}
                  type="password"
                  text={registerForm.confirmation}
                  name="confirmation"
                  placeholder="Pass Confirmation"
                  value={registerForm.confirmation} />

          <button onClick={registerIn}>Submit</button>
        </form>
      </div>
    );
}

export default Register;
