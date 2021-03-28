import React from "react";
import "./Main";

export default function Profile() {
  return (
    <>
      <div className="w-75 mr-auto ml-auto pt-5">
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
