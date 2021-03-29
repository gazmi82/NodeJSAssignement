import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(props) {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});
  const [urlData, setUrlData] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/login/github/callback${props.location.search}`
      )

      .then((response) => {
        setUserData(response.data);

        let staredUrl = response.data.starred_url.substr(
          0,
          response.data.starred_url.indexOf("{")
        );
        setUrlData(staredUrl);
      });
  }, []);

  async function ListStarredRepos() {
    axios.get(urlData).then((response) => {
      setData(response.data);
      console.log(response);
    });
  }

  return (
    <>
      <div className="w-75 mr-auto ml-auto pt-5">
        <div className="content text-left ">
          <div className="d-flex justify-content-between w-25">
            <img width="50px" height="50px" src={userData.avatar_url} />
            <h2>{userData.name}</h2>
          </div>
          <div className="pt-4">
            <h5>Follwers: {userData.followers}</h5>
            <h5>Following: {userData.following}</h5>
            <h5>Public repos: {userData.public_repos}</h5>
          </div>

          <h3 className="pt-4">
            Get github starred Repos Using Hapijs & React
          </h3>

          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">URL</th>
                <th scope="col">N° of stars</th>
                <th scope="col">Owner</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).length !== 0 &&
                data.map((el, index) => (
                  <tr key={index}>
                    <td>{el.name}</td>
                    <td>{el.url}</td>
                    <td className="text-center">{el.stargazers_count}</td>
                    <td>{el.owner.login}</td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div
            className="btn btn-primary mt-4"
            onClick={() => ListStarredRepos()}
          >
            <span>Pull Starred Repo</span>
          </div>
        </div>
      </div>
    </>
  );
}
