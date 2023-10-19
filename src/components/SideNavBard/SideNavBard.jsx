import { NavLink } from "react-router-dom"

export const SideNavBar = () => {
    return (
        <nav className="menu min-h-full text-base-content bg-main">
    {/* Sidebar content here */}
    <h2 className="admin">Admin</h2>

    <ul className="link--container">
        <li className="sideBard-link">
            <div>
                <img
                    className={"sideBard-icon" + {}}
                    src="src/assets/Call.svg"
                />

                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Live calls
                </NavLink>
            </div>

            <div className="sideBard-icon--left">
                <img className="sideBard-icon" src="src/assets/tree-dots.svg" />
            </div>
        </li>
        <li className="sideBard-link">
            <div>
                <img className="sideBard-icon" src="src/assets/contacts.svg" />
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Tutor online
                </NavLink>
            </div>
        </li>
        <li className="sideBard-link">
            <div>
                <img
                    className="sideBard-icon"
                    src="src/assets/subscription.svg"
                />
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Active subscription
                </NavLink>
            </div>
        </li>
        <li className="sideBard-link">
            <div>
                <img className="sideBard-icon" src="src/assets/Activity.svg" />
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Earning/Spending
                </NavLink>
            </div>
        </li>
    </ul>
</nav>
    )
}
