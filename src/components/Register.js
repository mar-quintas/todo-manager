import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'

function Register(props) {

    let navigate = useNavigate();

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
      navigate('/');
    }

    function handleChange(event) {
      const {value, name} = event.target
      setregisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h2>Register</h2>
          <Container>
            <Form.Group className="register">
              <Stack gap={2}>
                <Form.Control onChange={handleChange}
                      type="email"
                      text={registerForm.email}
                      name="email"
                      placeholder="Email"
                      value={registerForm.email} />
                <Form.Control onChange={handleChange}
                      type="password"
                      text={registerForm.password}
                      name="password"
                      placeholder="Password"
                      value={registerForm.password} />
                <Form.Control onChange={handleChange}
                      type="password"
                      text={registerForm.confirmation}
                      name="confirmation"
                      placeholder="Pass Confirmation"
                      value={registerForm.confirmation} />
                <Button variant="success" onClick={registerIn}>Submit</Button>
            </Stack>
          </Form.Group>
        </Container>
      </div>
    );
}

export default Register;
