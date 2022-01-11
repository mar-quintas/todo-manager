import React from 'react';   
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react';
import axios from "axios";


const ToAdd = (props) => {

  const [addTaskForm, setaddTaskForm] = useState({
    title:"",
    ready:"",
    folder_id:"",
  })

  function addTask(event){
    axios({
      method: "POST",
      url:"/api/v1.0/todos",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data:{
        title: addTaskForm.title,
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

    setaddTaskForm(({
      title:"",
      ready:"",
      folder_id:""}))

    event.preventDefault()
  }

    function handleChange(event) {
      const {value, name} = event.target
      setaddTaskForm(prevNote => ({
          ...prevNote, [name]: value})
    )}

   return (
       <div>
        <Form className="addTask">
          <Row>
            <Col lg={true}><Form.Control
            onChange={handleChange}
            text={addTaskForm.title}
            name='title'
            type="text"
            placeholder="Your task!"
            value={addTaskForm.title}/></Col>
            <Col md="auto"><Button onClick={addTask} variant="primary" name="add" type="submit">Add</Button></Col>
          </Row>
        </Form>
       </div>
   );
};

export default ToAdd;
