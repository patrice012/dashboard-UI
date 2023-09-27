import { callEndpoint } from "../../server/endpoint";
import { useQueryClient } from "@tanstack/react-query";
import CreateUser from "../components/CreateUser";



const ContentAction = () => {
  const url = callEndpoint;

  const queryClient = useQueryClient();
  
  // function to send user data for POST request
  async function createUser(url ,data) {

    if (data == {}) throw new Error('Data is empty')
    const response = await fetch(url, {
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    // trigger re-render of user List 
    if (response.ok) {
      queryClient.invalidateQueries(["call"]);

    }
    return response
  }

  // create user data
  const handleCreate = (e) => {
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

    const response = createUser(url, data);
    response.then((response) => {
      if (response.ok) {
        // The user was successfully added, send UI alert to user
        console.log('delete success')
      } else {
        // Handle errors if the deletion was not successful
        console.error("Failed to create user:", response.statusText);
      }
    })
    .catch((error) => {
      // Handle fetch errors here
      console.error("Failed to create user:", error);
    });
    // reset form fields
    e.target.reset();
    // hide modal after submission
    const modal = document.getElementById('creationModal')
    if (modal) modal.close()
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
            onClick={() => document.getElementById("creationModal").showModal()}
          >
            <img src="/src/assets/plus.svg" />
            <span>Add User</span>
          </button>
          <CreateUser modalId={1} handleSubmit={handleCreate}/>

          <span>1 row selected</span>
        </div>
        <div className="form-control action--search">
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
