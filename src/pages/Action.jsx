import { callEndpoint } from "../../server/endpoint";
import { useQueryClient } from "@tanstack/react-query";
import CreateUser from "../components/CreateUser";
import { useContext, useState } from "react";
import { UIFeedBackContext } from "../contexts/toastContext";
import postRequest from "../utils/create";

const ContentAction = () => {
    const [showModal, setShowModal] = useState(false);

    const queryClient = useQueryClient();
    const url = callEndpoint;

  const { showFeedBack } = useContext(UIFeedBackContext);
  
  
    const handleUserCreation = (data) => {
        const response = postRequest(url, data);
        response
            .then((response) => {
                if (response.ok) {
                    setShowModal(false);
                    showFeedBack(`${data.name} was created successfully`);
                    if (response.ok) {
                        queryClient.invalidateQueries(["call"]);
                    }
                } else {
                    showFeedBack(
                        `Failed to create user: ${response.statusText} `
                    );
                }
            })
            .catch((error) => {
                showFeedBack(`Failed to create user: ${error} `);
            });
    };

    return (
        <section className="action ">
            <div className="max-container">
                <div className="action--buttons">
                    <button className="btn filter">
                        <img src="/src/assets/Filters-lines.svg" />
                        <span>Filters</span>
                    </button>

                    <label
                        htmlFor="my_modal_6"
                        className="btn add-user"
                        onClick={() => setShowModal(true)}
                    >
                        open modal
                    </label>

                    <CreateUser
                        handleUserCreation={handleUserCreation}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />

                    <span>1 row selected</span>
                </div>
                <div className="form-control action--search">
                    <form>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input"
                        />
                    </form>
                    <img src="/src/assets/search.svg" />
                </div>
            </div>
        </section>
    );
};

export default ContentAction;
