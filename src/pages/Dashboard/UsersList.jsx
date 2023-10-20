import { useContext, useEffect, useState } from "react";
import { callEndpoint } from "../../../server/endpoint";
import UpdateUser from "../../components/EditUser";
import { UIFeedBackContext } from "../../contexts/toastContext";
import { ConfirmAction } from "../../components/UserConfirmation";
import deleteRequest from "../../utils/delete";
import { UserDetail } from "./User";
import { UsersListContext } from "../../contexts/usersListContext";
import { useFetch } from "../../hooks/useFetch";
import { mergeArray } from "../../utils/mergeArray";

const UserList = ({ setSelectes }) => {
    const [page, setPage] = useState(0);

    const [queryState, setQueryState] = useState({
        isLoading: true,
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
    const { users } = useContext(UsersListContext);
    const url = callEndpoint;

    const { request, data, error } = useFetch(url);

    // update user's list after update or delete action
    useEffect(() => {
        const abortCont = new AbortController();
        request();
        setQueryState((prev) => ({
            ...prev,
            isLoading: false,
            error: error?.message,
        }));
        return () => abortCont.abort();
    }, [isUpdating.isUpdated, showDeleteCheck.isDeleted, users]);

    const closeDeleteModal = () => {
        setShowDeleteCheck((prev) => ({ ...prev, state: false }));
    };

    const handleRemoveClick = (id) => {
        const userUrl = callEndpoint + "/" + id;

        const confirmation = new Promise((resolve) => {
            setShowDeleteCheck((prev) => ({ ...prev, state: true }));
            resolve(true);
        });
        confirmation.then(() => {
            const deletionModale = document.getElementById("ConfirmDeletion");
            deletionModale.addEventListener("click", (e) => {
                if (e.target.id === "confirmBtn") {
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

    // update selected elements
    const selectedList = data?.map((ele) => ({
        id: ele.id,
        selected: ele.selected,
    }));
    const savedData = sessionStorage.getItem("selection");
    if (savedData == null || savedData == "undefined") {
        sessionStorage.setItem("selection", JSON.stringify(selectedList));
    }
    const handleSelecte = (index) => {
        let selected = JSON.parse(sessionStorage.getItem("selection"));
        selected[index].selected = !selected[index].selected;
        sessionStorage["selection"] = JSON.stringify(selected);
        setSelectes(selected);
    };

    return (
        <section>
            <div className="overflow-x-auto max-container">
                {queryState.isLoading ? (
                    <p>Loading...</p>
                ) : queryState.error ? (
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
                            {data?.map((user, index) => {
                                return (
                                    <UserDetail
                                        key={user.id}
                                        index={index}
                                        {...user}
                                        handleRemoveClick={handleRemoveClick}
                                        handleUpdate={handleUpdate}
                                        handleSelecte={handleSelecte}
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
            {showDeleteCheck.state && (
                <ConfirmAction
                    checked={showDeleteCheck.state}
                    closeDeleteModal={closeDeleteModal}
                />
            )}
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
