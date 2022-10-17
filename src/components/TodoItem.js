import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdCached } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../App";

const UpdateTodo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  &:hover {
    color: #38d9a9;
  }
  display: none;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemArticle = styled.article`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${UpdateTodo} {
      display: initial;
    }
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.isCompleted &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  input {
    outline: none;
    border-radius: 5px;
    line-height: 32px;
    font-size: 21px;
  }
  ${(props) =>
    props.isCompleted &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ item, loadTodos }) {
  const [todo, setTodo] = useState(item.todo);
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);
  const [open, setOpen] = useState(false);

  const accessToken = localStorage.getItem("access_token");
  const apiUrl = useContext(API_URL);

  useEffect(() => {
    axios
      .put(
        `${apiUrl}/todos/${item.id}`,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const { statusText } = res;
        if (statusText === "OK") {
          loadTodos();
        }
      });
  }, [apiUrl, accessToken, item.id, todo, isCompleted]);

  function completeHandler() {
    setIsCompleted(!isCompleted);
  }

  function deleteHandler() {
    axios
      .delete(`${apiUrl}/todos/${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { statusText } = res;
        if (statusText === "OK") {
          loadTodos();
        }
      });
  }
  function openUpdateTodo() {
    setOpen(!open);
  }
  function updateTodo(e) {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const nextTodo = input.value;
    setTodo(nextTodo);
    setOpen(!open);
  }

  return (
    <TodoItemArticle>
      <CheckCircle isCompleted={isCompleted} onClick={completeHandler}>
        {isCompleted && <MdDone />}
      </CheckCircle>
      <Text isCompleted={isCompleted}>
        {open ? (
          <form onSubmit={updateTodo}>
            <input type="text" />
          </form>
        ) : (
          todo
        )}
      </Text>

      <UpdateTodo onClick={openUpdateTodo}>
        <MdCached />
      </UpdateTodo>
      <Remove onClick={deleteHandler}>
        <MdDelete />
      </Remove>
    </TodoItemArticle>
  );
}

export default TodoItem;
