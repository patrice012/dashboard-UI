import NavBar from "../components/NavBar";
import {HiOutlineTrash} from 'react-icons/hi';
import {HiOutlinePencil} from 'react-icons/hi2';

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
          <tbody>
            <CallDetail />
            <CallDetail />
            <CallDetail />
            <CallDetail />
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <button className="join-item footer--btn">Previous</button>
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
                <button className="join-item footer--btn">Next</button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};


const Card = () => {
  return (
    <div className="sell-card">
      <div className="card-image">
        <img src="/src/assets/group.svg" />
      </div>
      {/* <img src="/src/assets/group.svg" /> */}

      <div className="card--text">
        <h4>Total Sales</h4>
        <p>$560k</p>
      </div>
    </div>
  );
};

const OutComes = () => {
  return (
    <section className="inline-container">
      <div className="max-container outcomes">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

const ContentAction = () => {
  return (
    <section className="action inline-container">
      <div className="max-container">
        <div className="action--buttons">
          <button className="btn filter">
            <img src="/src/assets/Filters-lines.svg" />
            <span>Filters</span>
          </button>
          <button className="btn add-user">
            <img src="/src/assets/plus.svg" />
            <span>Add User</span>
          </button>
          <span>1 row selected</span>
        </div>
        <div className="form-control action--search">
          <input type="text" placeholder="Search" className="input" />
          <img src="/src/assets/search.svg" />
        </div>
      </div>
    </section>
  );
}

const Content = () => {
  return (
    <>
      <NavBar />
      <OutComes />
      <ContentAction/>
      <CallHistory />
    </>
  );
};

const Dashboard = () => {
  return (
    <main>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  content-bg">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open pannel
          </label>
          <Content />

        </div>
        <div className="drawer-side sideBar">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu min-h-full text-base-content bg-main">
            {/* Sidebar content here */}
            <h2 className="admin">Admin</h2>

            <div className="link--container">
              <li className="sideBard-link">
                <div>
                  <img className="sideBard-icon" src="src/assets/Call.svg" />
                  <a>Live calls</a>
                </div>

                <div className="sideBard-icon--left">
                  <img
                    className="sideBard-icon"
                    src="src/assets/tree-dots.svg"
                  />
                </div>
              </li>
              <li className="sideBard-link">
                <div>
                  <img
                    className="sideBard-icon"
                    src="src/assets/contacts.svg"
                  />
                  <a>Tutor online</a>
                </div>
              </li>
              <li className="sideBard-link">
                <div>
                  <img
                    className="sideBard-icon"
                    src="src/assets/subscription.svg"
                  />
                  <a>Active subscription</a>
                </div>
              </li>
              <li className="sideBard-link">
                <div>
                  <img
                    className="sideBard-icon"
                    src="src/assets/Activity.svg"
                  />
                  <a>Earning/Spending</a>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
