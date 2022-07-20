import React, { useEffect, useState } from "react";

import styles from "./Address.module.scss";
import classnames from "classnames/bind";

import ViewAddress from "./View";
import EditAddress from "./Edit";
import HeaderAddress from "./HeaderAddress";
import PageAccountAddress from "~/layout/components/PageAccountAddress";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser } from "../User/UserSlice";

const cx = classnames.bind(styles);

function Address() {
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.values);

  const currentUser = userList.filter(
    (item) => item.id === parseInt(params.id, 10)
  );
  console.log(currentUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, params.id]);

  return (
    <PageAccountAddress title="Thông tin địa chỉ" userId={params.id}>
      <div className={cx("col l-7")}>
        <HeaderAddress
          setEdit={setEdit}
          edit={edit}
          currentUser={currentUser}
        />
        <div className={cx("address-table")}>
          {edit ? (
            <EditAddress setEdit={setEdit} currentUser={currentUser} />
          ) : (
            <ViewAddress currentUser={{ ...currentUser[0] }} />
          )}
        </div>
      </div>
    </PageAccountAddress>
  );
}

export default Address;
