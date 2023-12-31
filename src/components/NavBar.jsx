import { userEndpoint } from "../../server/endpoint";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { AuthUser } from "./AuthUser";

const NavBar = () => {
    const _id = localStorage.getItem("authID");
    const url = `${userEndpoint}/${_id}`;
    const [reloadUserData, setReloadUserData] = useState(false);
    const [queryState, setQueryState] = useState({
        isLoading: true,
        error: null,
    });
    const [toggleModal, setToggleModal] = useState(false);
    const { request, data: user, error } = useFetch(url);

    // logging the user for the first time
    useEffect(() => {
        //loggin if ID is null
        if (_id === null || _id === undefined || user == null) {
            setToggleModal(true);
        }
    }, []);

    useEffect(() => {
        const abortCont = new AbortController();
        request();
        setQueryState((prev) => ({
            ...prev,
            isLoading: false,
            error: error?.message,
        }));
        return () => abortCont.abort();
    }, [reloadUserData]);

    // toggle modal
    const handleModalShow = () => {
        setToggleModal((prev) => !prev);
    };

    return (
        <>
            <div className="navbar">
                <div className="max-container">
                    <div className="">
                        {queryState.isLoading ? (
                            "Loading..."
                        ) : queryState.error ? (
                            queryState.error
                        ) : (
                            <p className="btn btn-ghost normal-case text-l">
                                <span className="intro">
                                    Hello, {user?.username}
                                </span>
                                <img src="/src/assets/hola.png" />
                            </p>
                        )}
                    </div>
                    {queryState.isLoading ? (
                        "Loading..."
                    ) : queryState.error ? (
                        queryState.error
                    ) : (
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
                                <label
                                    tabIndex="0"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={user?.picture}
                                            className="profil"
                                        />
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
                                    <li onClick={handleModalShow}>
                                        <a>Create account</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <AuthUser
                showModal={toggleModal}
                setShowModal={setToggleModal}
                setReloadUserData={setReloadUserData}
            />
        </>
    );
};

export default NavBar;
