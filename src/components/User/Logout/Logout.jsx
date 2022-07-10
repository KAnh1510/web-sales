import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import { deleteAuthUser, getAuthUser } from "../AuthSlice";
import "./Logout.scss";

const Logout = ({ setConfirmLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.values);

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);

  const handleLogoutBtn = () => {
    navigate("/account/login");
    dispatch(deleteAuthUser({ id: currentUser[0].id }));
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

export default Logout;
