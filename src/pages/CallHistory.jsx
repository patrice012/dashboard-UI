import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { useHistory } from "../hooks/history-hooks";
import { callEndpoint } from "../../server/endpoint";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import fetchData from "../hooks/fetchData";


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
  const { deleteHistory } = useHistory();

  const queryClient = useQueryClient();

  const mutation = useMutation((id) => deleteHistory(id), {
    onSuccess: () => {
      // Invalidate the query to trigger a re-fetch and update the UI
      queryClient.invalidateQueries({ queryKey: ["call"] });
    },
  });

  const handleClick = () => {
    return mutation.mutate(id);
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
                
                <button onClick={handleClick}>Confirm</button>
                <p className="py-4">Press ESC key or click outside to close</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <div>
              <HiOutlinePencil />
            </div>
          </div>
        </th>
      </tr>
    </>
  );
};

const CallHistory = () => {
  // Queries
  const url = callEndpoint;
  const query = useQuery({
    queryKey: ["call", url],
    queryFn: fetchData,
  });

  return (
    <section>
      <div className="overflow-x-auto max-container">
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
            {query.isLoading && (
              <tr>
                <th>Loading...</th>
              </tr>
            )}
            {!query.isError && (
              <tr>
                <th>{query.error}</th>
              </tr>
            )}
            {query.isSuccess &&
              query.data.map((history) => {
                return (
                  <CallDetail key={[history.id, history.state]} {...history} />
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <button className="join-item footer--btn previous--btn">
                  Previous
                </button>
              </th>
              <th></th>

              <th>
                <div className="join">
                  <button className="join-item ">Page 1 of 10</button>
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
      </div>
    </section>
  );
};

export default CallHistory;
