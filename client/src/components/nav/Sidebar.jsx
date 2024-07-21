import { NavLink } from "react-router-dom";


function Sidebar() {
    return ( 
 <div>
  <ul className="nav nav-tabs">
   
    <li className="nav-item">
      <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
    </li>

    <li className="nav-item">
      <NavLink className="nav-link" to="/user/wishlist">Wishlist</NavLink>
    </li>

    <li className="nav-item">
      <NavLink className="nav-link" to="/user/enquiries">Enquiries</NavLink>
    </li>



    <li className="nav-item">
      <NavLink className="nav-link" to="/ad/create">Create Ad</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/user/profile">Profile</NavLink>
    </li>

    <li className="nav-item">
      <NavLink className="nav-link" to="/user/settings">Settings</NavLink>
    </li>

  </ul>
</div>


     );
}

export default Sidebar;