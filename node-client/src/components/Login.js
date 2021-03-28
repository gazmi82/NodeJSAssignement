import { Api } from "./Api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Login() {
  const URL_PARAMS = new URLSearchParams(window.location.search);
  const TOKEN = URL_PARAMS.get("token");

  // Show an element
  const show = (selector) => {
    document.querySelector(selector).style.display = "block";
  };

  // Hide an element
  const hide = (selector) => {
    document.querySelector(selector).style.display = "none";
  };

  if (TOKEN) {
    hide(".contentUnauthorized");
    show(".contentAuthorized");
  }

  function Login(params) {
    useEffect(() => {
      Api.get(`/`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  return (
    <>
      <div className="w-75 mr-auto ml-auto pt-5 contentUnauthorized">
        <div className="content text-left">
          <h2>Login 🔒</h2>
          <div className="btn btn-dark mt-4" onClick={Login()}>
            <span>Login with github</span>
          </div>
        </div>
      </div>

      <div className="w-75 mr-auto ml-auto pt-5 contentAuthorized">
        <div className="content text-left ">
          <h2>Profile</h2>
          <h3 className="pt-4">Get github starred Repos Using Hapijs & Vue</h3>

          <div className="btn btn-primary  mt-4">
            <span>Pull Starred Repo</span>
          </div>

          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">URL</th>
                <th scope="col">N° of stars</th>
                <th scope="col">Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>btbgr</td>
                <td>gdrfvbdg</td>
                <td>drgdg</td>
                <td className="text-center">bvtrbg</td>
                <td>gbgdg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
