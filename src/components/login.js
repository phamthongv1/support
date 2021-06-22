/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [checked, setChecked] = useState(false)
  const [isRegister, setIsRegister] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
      if(checked){
        localStorage.setItem('name', JSON.stringify(user.name));
        localStorage.setItem('password', JSON.stringify(user.password));
      }
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleRegister = (value) => {
    setUser({ name: "", email: "", password: "" });
    setIsRegister(value);
  };

  const isRememberMe = (e) => {
    setChecked(checked ? false : true)
  };

  return (
    <>
      {isRegister ? (
        <SignUp
          handleRegister={handleRegister}
          onChangeInput={onChangeInput}
          registerSubmit={registerSubmit}
        />
      ) : (
        <SignIn
          handleRegister={handleRegister}
          onChangeInput={onChangeInput}
          loginSubmit={loginSubmit}
          isRememberMe={isRememberMe}
          checked={checked}
        />
      )}
    </>
  );
}
