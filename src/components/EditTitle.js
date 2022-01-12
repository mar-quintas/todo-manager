import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from "axios";


function EditTitle (props) {

  const [getTitle, setTitle] = useState(props.title)

  return(
    <div id={props.id}>
     <Form>
       <Row>
         <Col lg={true}><Form.Control value={getTitle} type="text" onChange={e => setTitle(e.target.value)}/></Col>
         <Col md="auto"><Button onClick={()=>{props.editTitle(props.id, getTitle, props.ready); props.setEditMode(false)}} variant="primary" name="save">Save</Button></Col>
         <Col md="auto"><Button onClick={()=>props.setEditMode(false)} variant="primary" name="delete">Cancel</Button></Col>
       </Row>
     </Form>
    </div>
  );
}

export default EditTitle;
