import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { useHistory } from "../hooks/history-hooks";
// import { useEffect } from "react";
import {useFetch} from "../utils/useFetch";
import { callEndpoint } from "../../server/endpoint";

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
  const { removeHistory, selectHistory } = useHistory();
  // const handleClick = () => {
  //   selectHistory(selected, id).then((re) => console.log(re, "form"));
  //   console.log('click')
  // }
  // console.log(selected, 'selected')

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <label>
              <input
                onChange={() => {
                  selectHistory(selected, id);
                }}
                checked={selected}
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
                onClick={() => {
                  removeHistory(id);
                }}
              />
            </div>
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
  // const { histories, getData } = useHistory();

  const endpoint = callEndpoint;

  // useEffect(() => {
  //   getData(endpoint);
  // }, [endpoint]);
  const { error, isPending, data: histories } = useFetch(endpoint);

  // const historyList = histories.map((history) => {
  //   return <CallDetail key={[history.id, history.state]} {...history} />;
  // });

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
            {isPending && (
              <tr>
                <th>Loading...</th>
              </tr>
            )}
            {/* {!isPending && <tbody>{historyList}</tbody>} */}
            {!isPending &&
              !error &&
              histories.map((history) => {
                return (
                  <CallDetail key={[history.id, history.state]} {...history} />
                );
              })}
            {error && (
              <tr className="error">
                <th>{error}</th>
              </tr>
            )}
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
