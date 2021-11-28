import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { logOutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const user = useAuth();

  const logout = () => {
    logOutApi();
    setRefreshCheckLogin(true);
  };
  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="Twittor" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Users
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Profile
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Logout
      </Link>

      <Button>Tweet</Button>
    </div>
  );
}
