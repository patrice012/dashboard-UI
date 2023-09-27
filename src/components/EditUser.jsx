import { useState } from "react";
import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { callEndpoint } from "../../server/endpoint";
import { useParams } from "react-router-dom";

const UpdateUser = (props) => {
  let { id } = useParams();
  const url = `${callEndpoint}/${id}`;
  const queryClient = useQueryClient();

  // Fetch user data and store it in a query
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["user", url],
    queryFn: () => fetchData(url),
    networkMode: "always",
  });

  // Initialize editUser state with fetched data
  const [editUser, setEditUser] = useState(isSuccess ? data : {});

  // Handle form input changes and update editUser state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

    // Define a mutation to update user data
    // const updateUserMutation = useMutation((objectData) => updatedUser(url, objectData),
    // {
    //   onSuccess: () => {
    //     // Invalidate the query to trigger a re-fetch and update the UI
    //     queryClient.invalidateQueries({ queryKey: ["user"] });
    //   },
    // });

      // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the mutation to update user data
      await updateUserMutation.mutateAsync(editUser);

      // Invalidate the user query to refetch data
      queryClient.invalidateQueries(["user", url]);

      // Redirect to the user's profile page or another appropriate location
      // You can use history.push("/user-profile") or similar here
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

    return (
<>
      <section>
        <div className="max-content">
        <form onSubmit={(e)=> {handleSubmit(e)}}  className="add-user--form" name="userForm">
            <div className="join add-user--fields">
              <input
              onChange={(e) => handleChange(e)}
                className="input input-bordered join-item"
                placeholder="Name"
                name="name"
                required
                value={editUser.name || ''}
              />
  
              <input
              onChange={(e) => handleChange(e)}

                className="input input-bordered join-item"
                placeholder="Language"
                name="language"
                required
                value={editUser.language || ""}

              />
              <input
              onChange={(e) => handleChange(e)}

                className="input input-bordered join-item"
                placeholder="Occupation"
                name="occupation"
                required
                value={editUser.occupation || ""}


              />
              <input
              onChange={(e) => handleChange(e)}

                className="input input-bordered join-item"
                placeholder="Objective"
                name="objective"
                required
                value={editUser.objective || ""}


              />
              <input
              onChange={(e) => handleChange(e)}

                className="input input-bordered join-item"
                placeholder="Subscription"
                name="subscription"
                required
                value={editUser.subscription || ""}


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
            <button className="btn">Create</button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </section>
</>
    );
  }

export default UpdateUser;
