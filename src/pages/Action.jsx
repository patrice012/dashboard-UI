import { useHistory } from "../hooks/history-hooks";
import { callEndpoint } from "../../server/endpoint";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import CreateUser from "../components/CreateUser";



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


  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData, 'formdata')
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
          <CreateUser modalId={1} handleSubmit={handleCreate}/>

          <span>1 row selected</span>
        </div>
        <div className="form-control action--search">
          {/* <input type="text" placeholder="Search" className="input" /> */}
          <form>
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
