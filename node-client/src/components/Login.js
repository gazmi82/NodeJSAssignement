import { Api } from "./Api";
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

export default function Login() {
  const headers = {
    "Content-Type": "application/json",
  };

  const handleLogin = () => {
    Api.get("/authorize", { headers: headers }).then((response) => {
      let uri = response.request.responseURL;
      window.location = uri;
    });
  };

  return (
    <>
      <div className="w-75 mr-auto ml-auto pt-5">
        <div className="content text-left">
          <h2>Login 🔒</h2>
          <button className="btn btn-dark mt-4" onClick={handleLogin}>
            <span>Login with github</span>
          </button>
        </div>
      </div>
    </>
  );
}
