import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from "axios";


function EditTitle (props) {
  let todo = props.todo
  const [getTitle, setTitle] = useState(todo.title)
  const [editMode, setEditMode] = useState(false)


  return(
    <>
    {!editMode ?
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
      <div id={todo.id}>
       <Form>
         <Row>
           <Col lg={true}><Form.Control value={getTitle} type="text" onChange={e => setTitle(e.target.value)}/></Col>
           <Col md="auto"><Button onClick={()=>{props.editTitle(todo.id, getTitle, todo.ready); setEditMode(false)}} variant="primary" name="save">Save</Button></Col>
           <Col md="auto"><Button onClick={()=>setEditMode(false)} variant="primary" name="delete">Cancel</Button></Col>
         </Row>
       </Form>
      </div>
    )}
    </>
  );
}

export default EditTitle;
