import {Route , Routes} from 'react-router-dom';
import NavBar from '../components/NavBar';
import OutComes from '../pages/OutComes'
import ContentAction from '../pages/Action';
import UserList from './UsersList';
import UpdateUser from '../components/EditUser';





const Content = () => {
  return (
    <>
  <OutComes/>
  <ContentAction/>
  <UserList/>
    </>
  );
};

const Dashboard = () => {
  
  return (
    <main>
      <div className="drawer lg:drawer-open dashboard">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  content-bg">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open pannel
          </label>
          <>
            <NavBar />
              <Routes>
                <Route exact path="/" element={<Content />} />
                <Route path="/update/:id" element={<UpdateUser/>}/>
              </Routes>
              </>

          
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
