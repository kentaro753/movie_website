import "../App.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/search" className="left-menu-icon fas fa-search"></NavLink>
      <NavLink to="/home" className="left-menu-icon fas fa-home"></NavLink>
      {/* <NavLink to="/users" className="left-menu-icon fas fa-users"></NavLink> */}
      <NavLink to="/favorite" className="left-menu-icon fas fa-bookmark" ></NavLink>
      {/* <NavLink to="/tv" className="left-menu-icon fas fa-tv"></NavLink> */}
      {/* <NavLink to="/hourglass-start" className="left-menu-icon fas fa-hourglass-start" ></NavLink> */}
      {/* <NavLink to="/shopping-cart" className="left-menu-icon fas fa-shopping-cart" ></NavLink> */}
    </div>
  );
}

export default Sidebar;
