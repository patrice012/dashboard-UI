const CreateUser = ({ handleUserCreation, showModal, setShowModal }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get("username"),
            country: formData.get("state"),
            flag: formData.get("flag"),
            profil_img: "/src/assets/user.svg",
            language: formData.get("language"),
            occupation: formData.get("occupation"),
            objective: formData.get("objective"),
            subscription: formData.get("subscription"),
        };
        // reset form fields
        e.target.reset();
        handleUserCreation(data);
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
                    <form
                        onSubmit={handleSubmit}
                        className="add-user--form"
                        name="userForm"
                    >
                        <div className="join add-user--fields">
                            <input
                                className="input input-bordered join-item"
                                placeholder="Name"
                                name="username"
                                required
                            />

                            <input
                                className="input input-bordered join-item"
                                placeholder="Language"
                                name="language"
                                required
                            />
                            <input
                                className="input input-bordered join-item"
                                placeholder="Occupation"
                                name="occupation"
                                required
                            />
                            <input
                                className="input input-bordered join-item"
                                placeholder="Objective"
                                name="objective"
                                required
                            />
                            <input
                                className="input input-bordered join-item"
                                placeholder="Subscription"
                                name="subscription"
                                required
                            />
                            <select
                                name="state"
                                className="select select-bordered"
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
                                setShowModal(!showModal);
                            }}
                        >
                            Close!
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateUser;
