import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from "axios";
import EditTodos from './EditTodos'
import Stack from 'react-bootstrap/Stack'

function TodoList (props){

  useEffect(() => { props.getData() },[])

  return (
    <Stack gap={3}>
    <>
      { props.todosData.map((todo) => (
          <EditTodos key={todo.id} todo={todo} deleteData={props.deleteData} editData={props.editData} editTitle={props.editTitle}/>
      ))}
    </>
    </Stack>
  );
};

export default TodoList;
