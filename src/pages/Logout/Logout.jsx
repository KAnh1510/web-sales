import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "~/components/Button";
import { logout } from "../Login/AuthSlice";
import "./Logout.scss";

const Logout = ({ setConfirmLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    navigate("/account/login");
    dispatch(logout());
  };
  return (
    <div>
      <p>Bạn có chắc chắn muốn đăng xuất ?</p>
      <div>
        <Button className="btn-logout" onClick={handleLogoutBtn}>
          Có
        </Button>
        <Button className="btn-logout" onClick={() => setConfirmLogout(false)}>
          Không
        </Button>
      </div>
    </div>
  );
};

Logout.propTypes = {
  setConfirmLogout: PropTypes.func,
};

export default Logout;
