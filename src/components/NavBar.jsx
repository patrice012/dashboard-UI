import { userEndpoint } from "../../server/endpoint";
import { useQuery } from "@tanstack/react-query";

import fetchData from "../hooks/fetchData";


const NavBar = () => {

  const endpoint = `${userEndpoint}/1`;


    const query = useQuery({
      queryKey: ["profil", endpoint],
      queryFn: fetchData,
    });


  return (
    <div className="navbar">
      {query.isError && <p className="error">{query.error}</p>}
      {query.isLoading && <p className="error">Loading...</p>}
      {query.isSuccess && (
        <div className="max-container">
          <div className="">
            <p className="btn btn-ghost normal-case text-l">
              <span className="intro">Hello, {query.data.name}</span>
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
                  <img src={query.data.profil_img} className="profil" />
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
      )}
    </div>
  );
};

export default NavBar;
