import { useState, useEffect } from "react";
import { userEndpoint } from "../../server/endpoint";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const AuthUser = ({ showModal, setShowModal }) => {
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            console.log("Image mime type is not valid");
            return;
        }
        setFile(file);
    };

    // preview image
    useEffect(() => {
        let fileReader,
            isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = userEndpoint;
        const response = fetch(url, { method: "POST", body: formData });
        response
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    };

    const closeModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <input
                checked={showModal}
                readOnly={true}
                type="checkbox"
                id="my_modal_3"
                className="modal-toggle"
            />
            <div className="modal" id="creationModal">
                <div className="modal-box">
                    <form
                        onSubmit={handleSubmit}
                        method="POST"
                        encType="multipart/form-data"
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
                                onChange={changeHandler}
                                type="file"
                                name="image"
                                accept="image/*"
                            />
                        </div>
                        <button className="btn">Create user</button>
                    </form>
                    {fileDataURL ? (
                        <p className="img-preview-wrapper">
                            {<img src={fileDataURL} alt="preview" />}
                        </p>
                    ) : null}
                    <div className="modal-action">
                        <label
                            htmlFor="my_modal_3"
                            className="btn"
                            onClick={closeModal}
                        >
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};
