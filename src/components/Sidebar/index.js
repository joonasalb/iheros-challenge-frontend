import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import { signOut } from "../../store/modules/auth/actions";
import Logo from "../../assets/logo.png";
import Button from "react-bootstrap/Button";
import "./styles.scss";

const activeStyle = {
  color: "#079",
  fontWeight: "bold",
};

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar pl-4">
      <div className="sidebar-header pl-4">
        <h4>!Heros Challenge</h4>
        <img src={Logo} alt="" width="100" height="100" />
      </div>
      <div className="sidebar-menu">
        <NavLink
          to="/dashboard"
          activeStyle={activeStyle}
          className="navlink"
          exact
        >
          <b>Hérois</b>
        </NavLink>
        
        <NavLink
          to="/threats"
          activeStyle={activeStyle}
          exact
          className="navlink"
        >
          <b>Ameaças</b>
        </NavLink>
      </div>

      <div className="sidebar-footer mt-4">
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(signOut());
          }}
        >
          <HiOutlineX size={18} />
          Sair
        </Button>
      </div>
    </div>
  );
}
