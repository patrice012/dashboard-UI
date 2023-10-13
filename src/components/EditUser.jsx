import { useEffect, useState, useContext } from "react";
import fetchData from "../utils/fetchData";
import { callEndpoint } from "../../server/endpoint";
import putRequest from "../utils/update";
import { UIFeedBackContext } from "../contexts/toastContext";

const UpdateUser = ({ id, showModal, setIsUpdating }) => {
    const url = `${callEndpoint}/${id}`;

    const [updateData, setUpdateData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { showFeedBack } = useContext(UIFeedBackContext);

    
    useEffect(() => {
        fetchData(url)
            .then((data) => {
                setUpdateData({ ...data });
                setIsLoading(false);
            });
    }, [url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = putRequest(url, updateData);
        response.then((data) => showFeedBack(`${data.name} was updated`));
        setIsUpdating((prev) => ({ ...prev, state:false, id:null, isUpdated: !prev.isUpdated })); // Set isUpdated to true on record update
    };

    return (
        <>
            <input
                checked={showModal}
                readOnly={true}
                type="checkbox"
                id="my_modal_6"
                className="modal-toggle"
            />
            <div className="modal" id="creationModal">
                <div className="modal-box">
                    {isLoading ? (
                        <p>Loading data. Please wait...</p>
                    ) : (
                        <>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="add-user--form"
                                name="userForm"
                            >
                                <div className="join add-user--fields">
                                    <input
                                        className="input input-bordered join-item"
                                        placeholder="Name"
                                        name="username"
                                        required
                                        value={updateData.name || ""}
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                name: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        className="input input-bordered join-item"
                                        placeholder="Language"
                                        name="language"
                                        required
                                        value={updateData.language || ""}
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                language: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="input input-bordered join-item"
                                        placeholder="Occupation"
                                        name="occupation"
                                        required
                                        value={updateData.occupation || ""}
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                occupation: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="input input-bordered join-item"
                                        placeholder="Objective"
                                        name="objective"
                                        required
                                        value={updateData.objective || ""}
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                objective: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="input input-bordered join-item"
                                        placeholder="Subscription"
                                        name="subscription"
                                        required
                                        value={updateData.subscription || ""}
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                subscription: e.target.value,
                                            })
                                        }
                                    />
                                    <select
                                        name="state"
                                        className="select select-bordered"
                                        value={updateData.country || ""}
                                        onChange={(e) =>
                                            setUpdateData({
                                                ...updateData,
                                                country: e.target.value,
                                            })
                                        }
                                    >
                                        <option>United State</option>
                                        <option>France</option>
                                        <option>Germany</option>
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">
                                            Select State
                                        </span>
                                    </label>
                                </div>
                                <button className="btn">Create</button>
                            </form>
                            <div className="modal-action">
                                <label
                                    htmlFor="my_modal_6"
                                    className="btn"
                                    onClick={() => {
                                        setIsUpdating({
                                            state: false,
                                            id: null,
                                            isUpdated: false,
                                        });
                                    }}
                                >
                                    Close!
                                </label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default UpdateUser;
