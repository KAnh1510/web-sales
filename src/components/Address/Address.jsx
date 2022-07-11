import React, { useEffect, useState } from "react";

import styles from "./Address.module.scss";
import classnames from "classnames/bind";

import ViewAddress from "./View";
import EditAddress from "./Edit";
import HeaderAddress from "./HeaderAddress";
import PageAccountAddress from "~/layout/components/PageAccountAddress";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../User/UserSlice";

const cx = classnames.bind(styles);

function Address() {
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.values);

  useEffect(() => {
    dispatch(getUser(params.id));
  }, [dispatch, params.id]);

  return (
    <PageAccountAddress title="Thông tin địa chỉ">
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
            <ViewAddress currentUser={currentUser} />
          )}
        </div>
      </div>
    </PageAccountAddress>
  );
}

export default Address;
