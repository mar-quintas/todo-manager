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

  return (
    <>
      { props.todosData.map((todo) => (
          <EditTitle todo={todo} editData={props.editData} editTitle={props.editTitle}/>
      ))}
    </>
  );
};

export default TodoList;
