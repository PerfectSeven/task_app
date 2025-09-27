import { NavLink } from "react-router-dom";

function Sidebar(){
    return(
        <nav className="side-bar">
            <ul className="nav-links">
              <li>
                <NavLink to="/"
                 end className={({isActive }) => (isActive ? "active-link" : "")} >
                 Home
                 </NavLink>
              </li>
              <li className="highlight">
                <NavLink to="/Todo" end className={({isActive }) => (isActive ? "active-link" : "")}
                >Tasks
                </NavLink>
              </li>
              <li>
                <NavLink to="/rewards" end className={({isActive }) => (isActive ? "active-link" : "")}>Rewards</NavLink>
              </li>
              <li>
                <NavLink to="#"  >Messages</NavLink>
              </li>
            </ul>
          </nav>
    );
}
export default Sidebar;