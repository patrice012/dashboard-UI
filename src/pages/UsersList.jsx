import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { callEndpoint } from "../../server/endpoint";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { useContext, useState } from "react";
import UpdateUser from "../components/UpdateUser";
import {UIFeedBackContext} from '../contexts/toastContext';
// import { Link } from "react-router-dom";


const ConfirmAction = () => {
  return (
    <dialog id="ConfirmDeletion" className="modal">
        <div className="modal-box">
          <button id="confirmBtn">Confirm action</button>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  )
}



const UserDetail = (props) => {
  const id = props.id
  const url = `${callEndpoint}/${id}`
  const queryClient = useQueryClient();
  const {showFeedBack} = useContext(UIFeedBackContext);

  async function deleteUser(url) {
    const response = await fetch(url, {
      method: 'DELETE'
    });
    if (response.ok) {
      // update the list of user to match the current DB state
      queryClient.invalidateQueries(["call"]);
    }
    return response
  }

  const handleRemoveClick = () => {
    // toggle modal
    // ask for confirmation
    const deletionModale = document.getElementById('ConfirmDeletion')
    deletionModale.showModal()
    // confirm deletion
    const confirmation = new Promise((resolve,reject) => {
      deletionModale.addEventListener('click', (e) => {
        // close modal only if the user clicked the explicite boutton
        if (e.target.id === 'confirmBtn') {
          if (e.originalTarget.id === 'confirmBtn') resolve('Confirm')
          else reject('Cancel')
        }
      })
    })
    // check user response
    confirmation
    .then(
      (respnse => {
          if (respnse === 'Confirm') {
            // delete user
            deleteUser(url)
            .then((response) => {
              if (response.ok) {
                // The user was successfully deleted, send UI alert to user
                showFeedBack(`${props.name} was delete success`)
              } else {
                // Handle errors if the deletion was not successful
                showFeedBack(`Failed to create user: ${response.statusText} `)
              }
            })
            .catch((error) => {
              // Handle fetch errors here
                showFeedBack(`Failed to create user: ${error} `)
            })
          }
        }
      )
    )
    .catch((error) => showFeedBack(`Failed to create user: ${error} `))
    .finally(() => {
      // hide modal confirmation
      document.getElementById('ConfirmDeletion').close()
    })
  };

  // update user
  const [isEditing, setIsEditing] = useState(false)
  const handleUpdateClick = () => {
    setIsEditing(true)
    const updateComponent = document.getElementById('updateModal')
    if (updateComponent) updateComponent.showModal()
    else console.log('not found')
  }


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
                <img src={props.profil_img} alt="profile picture" />
              </div>
            </div>
            <div>
              <div className="user">
                <span className="user--name">{props.name}</span>
                <span>
                  <img src={props.flag} />
                </span>
              </div>
              <div className="user--email">{props.contry}</div>
            </div>
          </div>
        </td>
        <td>{props.language}</td>
        <td>{props.occupation}</td>
        <th>{props.objective}</th>
        <th>{props.subscription}</th>
        <th>
          <div className="row-action">
            <div>
            <HiOutlineTrash onClick={handleRemoveClick}/>
          </div>
          <div>
            <HiOutlinePencil onClick={handleUpdateClick}/>
          </div>
          {/* <Link to={`update/${id}`} state={{ some: "value" }}><HiOutlinePencil /></Link> */}
          </div>
        </th>
      </tr>

      <ConfirmAction/>
      <UpdateUser id={id} setIsEditing={setIsEditing}/>
    </>
  );
};



const UserList = () => {
  const [page, setPage] = useState(0);
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
          <table className="table UserList">
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
                data.map((user) => {
                  return <UserDetail key={user.id} {...user} />;
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

export default UserList;
