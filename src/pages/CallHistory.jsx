import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { useHistory } from "../hooks/history-hooks";
import { callEndpoint } from "../../server/endpoint";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import fetchData from "../hooks/fetchData";
import { useState } from "react";

const CallDetail = ({
  id,
  name,
  contry,
  flag,
  profil_img,
  language,
  occupation,
  objective,
  subscription,
  selected,
}) => {
  const { deleteHistory, updateHistory } = useHistory();

  const queryClient = useQueryClient();

  const mutation = useMutation((id) => deleteHistory(id), {
    onSuccess: () => {
      // Invalidate the query to trigger a re-fetch and update the UI
      queryClient.invalidateQueries({ queryKey: ["call"] });
    },
  });

  const handleClick = (e) => {
    
    console.log(e, 'id for object')
    e.preventDefault();
    return mutation.mutate(id);
  };




    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
      id,
      name,
      contry,
      language,
      occupation,
      objective,
      subscription,
    });


 const handleEditClick = () => {
   setIsEditing(true);
 };

 const handleSaveClick = () => {
   // Send a request to update the user object on the server
   updateHistory(id, editedUser);

   // Exit edit mode
   setIsEditing(false);
 };


 const handleCancelClick = () => {
   // Reset the edited user to the current user data
   setEditedUser({
     id,
     name,
     contry,
     language,
     occupation,
     objective,
     subscription,
   });

   // Exit edit mode
   setIsEditing(false);
 };

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setEditedUser((prevUser) => ({
       ...prevUser,
       [name]: value,
     }));
   };














  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <label>
              <input
                defaultChecked
                // checked={selected}
                type="checkbox"
                className="checkbox"
              />
            </label>
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={profil_img} alt="profile picture" />
              </div>
            </div>
            <div>
              <div className="user">
                <span className="user--name">{name}</span>
                <span>
                  <img src={flag} />
                </span>
              </div>
              <div className="user--email">{contry}</div>
            </div>
          </div>
        </td>
        <td>{language}</td>
        <td>{occupation}</td>
        <th>{objective}</th>
        <th>{subscription}</th>
        <th>
          <div className="row-action">
            <div>
              <HiOutlineTrash
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              />
            </div>

            <dialog id="my_modal_2" className="modal delete-user">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm object deletion.</h3>
                <form>
                  <input value={id} hidden readOnly />
                  <button
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Confirm
                  </button>
                </form>
                <p className="py-4">Press ESC key or click outside to close</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button id="closeBtn">close</button>
              </form>
            </dialog>

            <div>
              <HiOutlinePencil onClick={handleEditClick} />
            </div>
          </div>
        </th>
      </tr>



      {isEditing && (
        <tr>
          <td colSpan="6">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
            </div>
            {/* Repeat this pattern for other fields */}
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </td>
        </tr>
      )}
    </>
  );
};

const CallHistory = () => {
  const [page, setPage] = useState(0);
  // Queries
  const url = `${callEndpoint}`;
  // const url = `${callEndpoint}?page=${page}`;
  const {
    isLoading,
    isError,
    error,
    data,
    isSuccess,
    isPreviousData,
  } = useQuery({
    queryKey: ["call", url],
    queryFn: () => fetchData(url),
    keepPreviousData: true,
    networkMode:'always' // remove this line before 
  });

  return (
    <section>
      <div className="overflow-x-auto max-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>{error}</p>
        ) : (
          <table className="table callHistory">
            <thead className="">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
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
              {isSuccess &&
                data.map((history) => {
                  return <CallDetail key={history.id} {...history} />;
                })}
            </tbody>
            <tfoot>
              <tr>
                <th>
                  <button
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
                    className="join-item footer--btn previous--btn"
                  >
                    Previous
                  </button>
                </th>
                <th></th>

                <th>
                  <div className="join">
                    <button
                      onClick={() => {
                        if (!isPreviousData && data.hasMore)
                          setPage((old) => old + 1);
                      }}
                      disabled={isPreviousData || !data?.hasMore}
                      className="join-item "
                    >
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
    </section>
  );
};

export default CallHistory;
