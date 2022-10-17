import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { API_URL } from "../App";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";

const TodoListSection = styled.section`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  ul {
    padding: 0;
    max-height: 600px;
    overflow: hidden;
  }
  li {
    list-style: none;
  }
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const accessToken = localStorage.getItem("access_token");
  const apiUrl = useContext(API_URL);
  loadTodos();
  function loadTodos() {
    axios
      .get(`${apiUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setTodos(data);
      });
  }
  return (
    <TodoListSection>
      <h1>TodoList</h1>
      <hr />
      <ul>
        {todos.map((item) => {
          const { id } = item;
          return (
            <li key={id}>
              <TodoItem item={item} loadTodos={loadTodos} />
            </li>
          );
        })}
      </ul>
      <TodoCreate loadTodos={loadTodos} />
    </TodoListSection>
  );
}

export default TodoList;
