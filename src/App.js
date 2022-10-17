import React, { createContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

export const API_URL = createContext(
  "https://pre-onboarding-selection-task.shop"
);

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <Routes>
          <Route
            path=""
            element={
              !accessToken ? (
                <Navigate replace to="signin" />
              ) : (
                <Navigate replace to="todo" />
              )
            }
          />
          <Route
            path="signin"
            element={<SignIn setAccessToken={setAccessToken} />}
          />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="todo"
            element={accessToken ? <TodoList /> : <Navigate to="/signin" />}
          />
        </Routes>
      </TodoTemplate>
    </>
  );
}

export default App;
