import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from "axios";


function EditTodos (props) {
  let todo = props.todo
  const [getTitle, setTitle] = useState(todo.title)
  const [editMode, setEditMode] = useState(false)


  return(
    <>
    {!editMode ?
      <div id={todo.id}>
       <Form>
         <Row>
           <Col xs="auto"><Form.Check aria-label="option 1" defaultChecked={todo.ready} onChange={()=>props.editData(todo.id, todo.title, todo.ready)} /></Col>
           <Col xs={true}><Form.Control type="text" value={todo.title} disabled/></Col>
           <Col xs="auto"><Button variant="primary" onClick={()=>setEditMode(true)} name="edit">Edit</Button></Col>
           <Col xs="auto"><Button onClick={()=>{props.deleteData(todo.id)}} variant="danger" name="delete">Delete</Button></Col>
         </Row>
       </Form>
      </div>
      :(
      <div id={todo.id}>
       <Form>
         <Row>
           <Col xs={true}><Form.Control value={getTitle} type="text" onChange={e => setTitle(e.target.value)}/></Col>
           <Col xs="auto"><Button onClick={()=>{props.editTitle(todo.id, getTitle, todo.ready); setEditMode(false)}} variant="success" name="save">Save</Button></Col>
           <Col xs="auto"><Button onClick={()=>setEditMode(false)} variant="danger" name="delete">Cancel</Button></Col>
         </Row>
       </Form>
      </div>
    )}
    </>
  );
}

export default EditTodos;
