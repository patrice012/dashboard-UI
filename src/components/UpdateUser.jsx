import { useContext, useState } from "react";
import fetchData from "../utils/fetchData";
import { callEndpoint } from "../../server/endpoint";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../contexts/userContext";

const UpdateUser = (props) => {
    const url = `${callEndpoint}/${props.id}`
    console.log(url, 'url')
    const [editUser, seteditUser] = useState({})
    const {user, manageUser} = useContext(UserContext)
    // const data = fetchData(url)
    console.log(user, 'editUser')
    const {
        isLoading,
        isError,
        error,
        data,
        isSuccess,
      } = useQuery({
        queryKey: ["updateUser", props.id],
        queryFn: () => fetchData(url),
        networkMode:'always' // remove this line before 
      });

      
    // Handle form input changes and update editUser state
    const handleUpdateField = (e) => {
        const { name, value } = e.target;
        seteditUser((editUser) => ({
          ...editUser,
          [name]: value,
        }));
    console.log(e.target.value, 'event update fied')
}


const resetFormFields = () => {
    document.querySelector('.update--form').reset()
    console.log('reset from field')
}

return (
    <dialog id="updateModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Update</h3>
            {isLoading ? (<h3>Loading...</h3>) : isError ? (<h3>{error}</h3>): 
            (isSuccess && 
            <form  className="add-user--form update--form" name="userForm">
                <div className="join add-user--fields">
                    <input
                    className="input input-bordered join-item"
                    placeholder="Name"
                    name="username"
                    required
                    value={editUser.name || data.name}
                    onChange={(e) => handleUpdateField(e)}
                    />

                    <input
                    className="input input-bordered join-item"
                    placeholder="Language"
                    name="language"
                    required
                    value={editUser.language || ""}
                    onChange={(e) => handleUpdateField(e)}
                    />

                    <input
                    className="input input-bordered join-item"
                    placeholder="Occupation"
                    name="occupation"
                    required
                    value={editUser.occupation || ""}
                    onChange={(e) => handleUpdateField(e)}
                    />

                    <input
                    className="input input-bordered join-item"
                    placeholder="Objective"
                    name="objective"
                    required
                    value={editUser.objective || ""}
                    onChange={(e) => handleUpdateField(e)}
                    />

                    <input
                    className="input input-bordered join-item"
                    placeholder="Subscription"
                    name="subscription"
                    required
                    value={editUser.subscription || ""}
                    onChange={(e) => handleUpdateField(e)}
                    /> 

                    <select name="state" className="select select-bordered">
                        <option>United State</option>
                        <option>France</option>
                        <option>Germany</option>
                    </select>
                    
                    <label className="label">
                    <span className="label-text-alt">Select State</span>
                    </label>
                </div>
                <button className="btn">Save</button>
            </form>)
        }
            

            <div className="modal-action">
                <form method="dialog">
                    <button onClick={resetFormFields}  className="btn">Cancel</button>
                </form>
            </div>
        </div>
    </dialog>
    );
}

export default UpdateUser;
