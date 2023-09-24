import { useHistory } from "../hooks/history-hooks";
import { callEndpoint } from "../../server/endpoint";
import { useQueryClient, useMutation } from "@tanstack/react-query";



const ContentAction = () => {
  const { createUser } = useHistory();

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (objectData) => createUser(callEndpoint, objectData),
      {
        onSuccess: () => {
          // Invalidate the query to trigger a re-fetch and update the UI
          queryClient.invalidateQueries({ queryKey: ["call"] });
        },
      }
    );


  const handleSumit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("username"),
      contry: formData.get("state"),
      flag: formData.get("flag"),
      profil_img: "/src/assets/user.svg",
      language: formData.get("language"),
      occupation: formData.get("occupation"),
      objective: formData.get("objective"),
      subscription: formData.get("subscription"),
    };

    // createUser(callEndpoint, data);
    // Initiate object creation mutation
    mutation.mutate(data);
    e.target.reset();
  };



  return (
    <section className="action ">
      <div className="max-container">
        <div className="action--buttons">
          <button className="btn filter">
            <img src="/src/assets/Filters-lines.svg" />
            <span>Filters</span>
          </button>
          <button
            className="btn add-user"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <img src="/src/assets/plus.svg" />
            <span>Add User</span>
          </button>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Create User</h3>

              <form
                onSubmit={handleSumit}
                className="add-user--form"
                name="userForm"
              >
                <div className="join add-user--fields">
                  <input
                    className="input input-bordered join-item"
                    placeholder="Name"
                    name="username"
                  />
                  <input
                    className="input input-bordered join-item"
                    placeholder="State"
                    name="state"
                  />

                  <input
                    className="input input-bordered join-item"
                    placeholder="Language"
                    name="language"
                  />
                  <input
                    className="input input-bordered join-item"
                    placeholder="Occupation"
                    name="occupation"
                  />
                  <input
                    className="input input-bordered join-item"
                    placeholder="Objective"
                    name="objective"
                  />
                  <input
                    className="input input-bordered join-item"
                    placeholder="Subscription"
                    name="subscription"
                  />
                  {/* <select className="select select-bordered">
                    <option>United State</option>
                    <option>France</option>
                    <option>Germany</option>
                  </select>
                  <label className="label">
                    <span className="label-text-alt">Select State</span>
                  </label> */}
                  {/* <div className="form-control w-full">
                    <select className="select select-bordered">
                      <option>United State</option>
                      <option>France</option>
                      <option>Germany</option>
                    </select>
                    <label className="label">
                      <span className="label-text-alt">Select State</span>
                    </label>
                  </div> */}
                </div>
                <button className="btn">Create User</button>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>

          <span>1 row selected</span>
        </div>
        <div className="form-control action--search">
          {/* <input type="text" placeholder="Search" className="input" /> */}
          <form onSubmit={(e) => handleSumit(e)}>
            <input
              // onChange={handleChange}
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
