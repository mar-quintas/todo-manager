import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
import axios from "axios";


function ToDo (props){

    const [todosData, setTodosData] = useState([])

    function getTodosData() {
      axios({
        method: "GET",
        url: "/api/v1.0/todos",
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      })
      .then((response) => {
        const res = response.data
        console.log(res)
        setTodosData(res)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
  }


getTodosData()
  return (
    <>
      { todosData.map((todo) => (
           <div>
            <Form id={todo.id}>
              <Row>
                <Col md="auto"><Form.Check aria-label="option 1" defaultChecked={todo.ready} /></Col>
                <Col lg={true}><Form.Control type="text" value={todo.title} disabled/></Col>
                <Col md="auto"><Button variant="primary" name="edit" type="submit">Edit</Button></Col>
                <Col md="auto"><Button variant="primary" name="delete" type="submit">Delete</Button></Col>
              </Row>
            </Form>
           </div>
      ))}
    </>
  );
};

export default ToDo;
