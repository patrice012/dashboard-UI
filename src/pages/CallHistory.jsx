import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { useHistory } from "../hooks/history-hooks";
import { callEndpoint } from "../../server/endpoint";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import fetchData from "../hooks/fetchData";
import { useState } from "react";
import { Link } from "react-router-dom";





const CallDetail = (props) => {
  const id = props.id
  const { deleteHistory } = useHistory();

  const queryClient = useQueryClient();

  const mutation = useMutation((id) => deleteHistory(id), {
    onSuccess: () => {
      // Invalidate the query to trigger a re-fetch and update the UI
      queryClient.invalidateQueries({ queryKey: ["call"] });
    },
  });

  const handleRemoveClick = () => {
    
    // e.preventDefault();
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
          <Link to={`update/${id}`} state={{ some: "value" }}><HiOutlinePencil /></Link>
          </div>
        </th>
      </tr>
      

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
