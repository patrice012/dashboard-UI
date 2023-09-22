import fetchData from "../utils/fetchData";

import { userEndpoint } from "../../server/endpoint";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState({});

  const endpoint = `${userEndpoint}/1`;

  useEffect(() => {
    fetchData(endpoint)
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, [endpoint]);

  return (
    <div className="navbar">
      <div className="max-container">
        <div className="">
          <p className="btn btn-ghost normal-case text-l">
            <span className="intro">Hello, {user.name}</span>
            <img src="/src/assets/hola.png" />
          </p>
        </div>
        <div className="navbar--search">
          <div className="form-control search--container">
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-24 md:w-auto"
            />
            <img src="/src/assets/search.svg" />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.profil_img} className="profil" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
