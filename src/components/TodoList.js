import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from "axios";
import EditTitle from './EditTitle'

function TodoList (props){

  useEffect(() => { props.getData() },[])

  const [editMode, setEditMode] = useState(false)



  return (
    <>
      { props.todosData.map((todo) => (
         !editMode ?
           <div id={todo.id}>
            <Form>
              <Row>
                <Col md="auto"><Form.Check aria-label="option 1" defaultChecked={todo.ready} onChange={()=>props.editData(todo.id, todo.title, todo.ready)} /></Col>
                <Col lg={true}><Form.Control type="text" value={todo.title} disabled/></Col>
                <Col md="auto"><Button variant="primary" onClick={()=>setEditMode(true)} name="edit">Edit</Button></Col>
                <Col md="auto"><Button onClick={()=>{props.deleteData(todo.id)}} variant="primary" name="delete">Delete</Button></Col>
              </Row>
            </Form>
           </div>
           :(
             <>
              <EditTitle setEditMode={setEditMode} editTitle={props.editTitle} id={todo.id} title={todo.title} ready={todo.ready}/>

             </>
           )

      ))}
    </>
  );
};

export default TodoList;
