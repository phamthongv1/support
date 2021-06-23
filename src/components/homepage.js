/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./login";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  // CHECK LOGIN
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        // CHECK TOKEN
        const verified = await axios.get("/v1/auth/refresh-tokens", {
          headers: { Authorization: token },
        });
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <div className="App">
      {isLogin ? (
        <Home setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
