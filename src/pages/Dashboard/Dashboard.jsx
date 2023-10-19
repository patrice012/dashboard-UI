import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar";
import OutComes from "./OutComes";
import ContentAction from "./Action";
import UserList from "./UsersList";
import UIFeedback from "../../components/Toast";
import { useContext } from "react";
import { UIFeedBackContext } from "../../contexts/toastContext";
import { UsersListProvider } from "../../contexts/usersListContext";
import { SideNavBar } from "../../components/SideNavBard/SideNavBard";

const Content = () => {
    return (
        <>
            <OutComes />
            <UsersListProvider>
                <ContentAction />
                <UserList />
            </UsersListProvider>
        </>
    );
};

const Dashboard = () => {
    const { feedBack } = useContext(UIFeedBackContext);

    return (
        <main>
            <div className="drawer lg:drawer-open dashboard">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content  content-bg">
                    {/* Page content here */}
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        Open pannel
                    </label>
                    <>
                        {feedBack.state && <UIFeedback {...feedBack} />}
                        <NavBar />
                        <Routes>
                            <Route exact path="/" element={<Content />} />
                            {/* <Route path="/update/:id" element={<UpdateUser/>}/> */}
                        </Routes>
                    </>
                </div>
                <div className="drawer-side sideBar">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <SideNavBar />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
