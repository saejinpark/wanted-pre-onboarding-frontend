import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../App";
import Button from "./Button";

const SignUpBlock = styled.section`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  form {
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 15px;

    fieldset {
      background: white;
      border: 0;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    legend {
      padding: 5px;
      background-color: gray;
      color: white;
      border-radius: 5px;
      font-weight: bold;
    }
    input {
      outline: 0;
      width: 100%;
      font-size: 24px;
    }
    a {
      /* 공통 스타일 */
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      outline: none;
      border: none;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      cursor: pointer;

      /* 크기 */
      height: 2.25rem;
      width: 100%;
      font-size: 1rem;

      /* 색상 */
      background: #228be6;
      &:hover {
        background: #339af0;
      }
      &:active {
        background: #1c7ed6;
      }
    }
  }
`;

function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const navigate = useNavigate();
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmChangeHandler = (e) => {
    setConfirm(e.target.value);
  };

  const apiUrl = useContext(API_URL);

  const signUpHandler = (e) => {
    e.preventDefault();
    const body = { email, password };
    axios
      .post(`${apiUrl}/auth/signup`, body, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        const { statusText } = res;
        if (statusText === "Created") {
          navigate("/signin");
        }
      })
      .catch((e) => {
        alert("이미 존재하는 계정 입니다.");
      });
  };

  return (
    <SignUpBlock>
      <h1>Sign Up</h1>
      <hr />
      <form onSubmit={signUpHandler}>
        <fieldset>
          <legend>아이디</legend>
          <input
            type="email"
            name="email"
            pattern=".*@.*"
            onChange={emailChangeHandler}
            required
          />
        </fieldset>
        <fieldset>
          <legend>비밀번호</legend>
          <input
            type="password"
            name="password"
            pattern=".{8,}"
            onChange={passwordChangeHandler}
            required
          />
        </fieldset>
        <fieldset>
          <legend>비밀번호 확인</legend>
          <input
            type="password"
            name="confirm"
            pattern=".{8,}"
            onChange={confirmChangeHandler}
            required
          />
        </fieldset>
        {/.*@.*/.test(email) &&
        /.{8,}/.test(password) &&
        password === confirm ? (
          <Button>회원가입</Button>
        ) : (
          <Button inactive>회원가입</Button>
        )}
      </form>
    </SignUpBlock>
  );
}

export default SignUp;
