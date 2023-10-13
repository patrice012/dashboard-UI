import { useContext, useEffect, useState } from "react";
import { callEndpoint } from "../../server/endpoint";
import fetchData from "../utils/fetchData";
import UpdateUser from "../components/EditUser";
import { UIFeedBackContext } from "../contexts/toastContext";
import { ConfirmAction } from "../components/UserConfirmation";
import deleteRequest from "../utils/delete";
import { UserDetail } from "./User";
import { UsersListContext } from "../contexts/usersListContext";

const UserList = () => {
    const [page, setPage] = useState(0);

    const [queryState, setQueryState] = useState({
        isLoading: true,
        isError: false,
        error: null,
    });
    const [showDeleteCheck, setShowDeleteCheck] = useState({
        state: false,
        isDeleted: false,
    });
    const [isUpdating, setIsUpdating] = useState({
        state: false,
        id: null,
        isUpdated: false,
    });
    const { showFeedBack } = useContext(UIFeedBackContext);
    const { users, manageUsers } = useContext(UsersListContext);
    const url = `${callEndpoint}`;



    // Function to fetch data
    const fetchDataFromServer = () => {
        fetchData(url)
            .then((users) => {
                manageUsers(users);
                setQueryState((prev) => ({ ...prev, isLoading: false }));
            })
            .catch((error) =>
                setQueryState((prev) => ({
                    ...prev,
                    isLoading: false,
                    isError: true,
                    error: error.message,
                }))
            );
    };

    // UseEffect for initial mount
    useEffect(() => {
        fetchDataFromServer();
    }, []);

    // UseEffect to refetch data when conditions change
    useEffect(() => {
        return fetchDataFromServer();
    }, [isUpdating.isUpdated, showDeleteCheck.isDeleted]);

    const closeDeleteModal = () => {
        setShowDeleteCheck((prev) => ({ ...prev, state: false }));
    };

    const handleRemoveClick = (id) => {
        const userUrl = `${callEndpoint}/${id}`;

        const confirmation = new Promise((resolve) => {
            setShowDeleteCheck((prev) => ({ ...prev, state: true }));
            resolve(true);
        });
        confirmation.then(() => {
            const deletionModale = document.getElementById("ConfirmDeletion");
            deletionModale.addEventListener("click", (e) => {
                if (e.originalTarget.id === "confirmBtn") {
                    deleteRequest(userUrl)
                        .then((response) => {
                            if (response.ok) {
                                showFeedBack(`delete success`);
                                setShowDeleteCheck((prev) => ({
                                    ...prev,
                                    isDeleted: !prev.isDeleted,
                                }));
                            } else {
                                showFeedBack(
                                    `Failed to delete user: ${response.statusText} `
                                );
                            }
                            setShowDeleteCheck((prev) => ({
                                ...prev,
                                state: false,
                            }));
                        })
                        .catch((error) => {
                            showFeedBack(
                                `Failed to delete user: ${error.statusText} `
                            );
                        });
                }
            });
        });
    };

    // update user part
    const handleUpdate = (id) => {
        setIsUpdating((prev) => ({ ...prev, state: true, id: id }));
    };

    return (
        <section>
            <div className="overflow-x-auto max-container">
                {queryState.isLoading ? (
                    <p>Loading...</p>
                ) : queryState.isError ? (
                    <p>{queryState.error}</p>
                ) : (
                    <table className="table UserList">
                        <thead className="">
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                    </label>
                                    <label>
                                        <span>Learners</span>
                                        <img src="/src/assets/Icon.svg" />
                                    </label>
                                </th>
                                <th>
                                    <label>
                                        <span>Language</span>
                                        <img src="/src/assets/Icon.svg" />
                                    </label>
                                </th>
                                <th>
                                    <label>
                                        <span>Occupation</span>
                                        <img src="/src/assets/Icon.svg" />
                                    </label>
                                </th>
                                <th>
                                    <label>
                                        <span>Objective</span>
                                        <img src="/src/assets/Icon.svg" />
                                    </label>
                                </th>
                                <th>
                                    <label>
                                        <span>Subscription</span>
                                        <img src="/src/assets/Icon.svg" />
                                    </label>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <UserDetail
                                        key={user.id}
                                        {...user}
                                        handleRemoveClick={handleRemoveClick}
                                        handleUpdate={handleUpdate}
                                    />
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>
                                    <button
                                        onClick={() =>
                                            setPage((old) =>
                                                Math.max(old - 1, 0)
                                            )
                                        }
                                        disabled={page === 0}
                                        className="join-item footer--btn previous--btn"
                                    >
                                        Previous
                                    </button>
                                </th>
                                <th></th>

                                <th>
                                    <div className="join">
                                        <button className="join-item ">
                                            Page {page + 1} of 10
                                        </button>
                                    </div>
                                </th>
                                <th></th>
                                <th></th>
                                <th>
                                    <button className="join-item footer--btn next--btn">
                                        Next
                                    </button>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </div>
            <ConfirmAction
                checked={showDeleteCheck.state}
                closeDeleteModal={closeDeleteModal}
            />
            {isUpdating.state && (
                <UpdateUser
                    showModal={isUpdating.state}
                    id={isUpdating.id}
                    setIsUpdating={setIsUpdating}
                />
            )}
        </section>
    );
};

export default UserList;
