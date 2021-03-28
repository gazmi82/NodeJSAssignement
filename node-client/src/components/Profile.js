import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/login/github/callback${props.location.search}`
      )

      .then((response) => {
        let user = response.data;
        let sUrl = user.starred_url;
        console.log(response);
        let staredUrl = sUrl.substr(0, sUrl.indexOf("{"));
      });
  });
  return (
    <>
      <div className="w-75 mr-auto ml-auto pt-5">
        <div className="content text-left ">
          <div className="d-flex justify-content-between w-25">
            <img width="50px" height="50px" src={user.login} />
            <h2>{props.user}gazmi82</h2>
          </div>
          <div className="pt-4">
            <h5>{props.user}follwers</h5>
            <h5>{props.user}following</h5>
          </div>

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
