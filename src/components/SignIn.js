import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../App";
import Button from "./Button";

const SignInBlock = styled.section`
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

function SignIn(props) {
  const { setAccessToken } = props;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const apiUrl = useContext(API_URL);

  const signInHandler = (e) => {
    e.preventDefault();
    const body = { email, password };
    axios
      .post(`${apiUrl}/auth/signin`, body, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        const { statusText, data } = res;
        const { access_token } = data;
        if (statusText === "OK") {
          localStorage.setItem("access_token", access_token);
          setAccessToken(access_token);
          navigate("/");
        }
      });
  };

  return (
    <SignInBlock>
      <h1>Sign In</h1>
      <hr />
      <form onSubmit={signInHandler}>
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
        {/.*@.*/.test(email) && /.{8,}/.test(password) ? (
          <Button>로그인</Button>
        ) : (
          <Button inactive>로그인</Button>
        )}
        <a href="/signup">회원가입</a>
      </form>
    </SignInBlock>
  );
}

export default SignIn;
