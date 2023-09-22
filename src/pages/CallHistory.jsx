import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { useHistory } from "../hooks/history-hooks";

const CallDetail = () => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src="/src/assets/user.svg"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="user">
                <span className="user--name">Hart Hagerty</span>
                <span>
                  <img src="/src/assets/flag.png" />
                </span>
              </div>
              <div className="user--email">United States</div>
            </div>
          </div>
        </td>
        <td>English</td>
        <td>Freelance</td>
        <th>Fluent</th>
        <th>Free Trial</th>
        <th>
          <div className="row-action">
            <div>
              <HiOutlineTrash />
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
  const { histories } = useHistory();

  

  const historyList = histories.map((history) => {
    return <CallDetail key={history.id} {...history} />;
  });
  return (
    <section>
      <div className="overflow-x-auto max-container">
        <table className="table callHistory">
          {/* head */}
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
          <tbody>{historyList}</tbody>
          {/* foot */}
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
