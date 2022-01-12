import React from 'react';
import { useState, useEffect } from 'react'
import axios from "axios";
import useToken from './useToken'


function useTodosData (props) {
    const { token, removeToken, setToken } = useToken();
    const [todosData, setTodosData] = useState([]);

  function getData () {
    axios({
      method: "GET",
      url: "/api/v1.0/todos",
      headers: {
        Authorization: 'Bearer ' + token}
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

  function deleteData(id) {
      axios({
        method: "DELETE",
        url:"/api/v1.0/todo/" + id,
        headers: {
          Authorization: 'Bearer ' + token},
      })
      .then((response) => {
        getData()
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  function editData(id, title, ready){
      if (ready){ready=false} else {ready=true}
      axios({
        method: "PUT",
        url:"/api/v1.0/todo/" + id,
        headers: {
          Authorization: 'Bearer ' + token},
        data: {
          title: title,
          ready: ready,
        }
      })
      .then((response) => {
        getData()
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  function editTitle(id, title, ready){
      axios({
        method: "PUT",
        url:"/api/v1.0/todo/" + id,
        headers: {
          Authorization: 'Bearer ' + token},
        data: {
          title: title,
          ready: ready,
        }
      })
      .then((response) => {
        getData()
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }


  return {
    todosData,
    getData,
    deleteData,
    editData,
    editTitle
  };
}

export default useTodosData;
