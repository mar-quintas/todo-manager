import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTodosData from './useTodosData'

function ToAdd (props) {

  const [addTaskForm, setaddTaskForm] = useState({
    title:"",
    ready:"",
    folder_id:"",
  })

  function AddTask(event){
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
      props.getData()
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
            <Col xs={true}><Form.Control
            onChange={handleChange}
            text={addTaskForm.title}
            name='title'
            type="text"
            placeholder="Add task!"
            value={addTaskForm.title}/></Col>
            <Col xs={"auto"}><Button onClick={AddTask} variant="success" name="add" type="submit">Add</Button></Col>
          </Row>
        </Form>
       </div>
   );
};

export default ToAdd;
