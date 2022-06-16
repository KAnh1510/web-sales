import React, { useState } from "react";

import styles from "./Address.module.scss";
import classnames from "classnames/bind";
import PageAccountAddress from "../Layout/components/PageAccountAddress";
import ViewAddress from "./View";
import Button from "../Button";
import EditAddress from "./Edit";
import HeaderAddress from "./Header";

const cx = classnames.bind(styles);

function Address() {
  const [edit, setEdit] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  return (
    <PageAccountAddress title="Thông tin địa chỉ">
      <div className={cx("col l-7")}>
        <HeaderAddress setEdit={setEdit} edit={edit} />
        <div className={cx("address-table")}>
          {edit ? (
            <EditAddress setEdit={setEdit} setAddAddress={setAddAddress} />
          ) : (
            <ViewAddress />
          )}
        </div>
      </div>
      <div className={cx("col l-5")}>
        <div
          className={cx("btn-addAddress")}
          onClick={() => setAddAddress(!addAddress)}
        >
          <Button className={cx("add-newaddress")}>Nhập địa chỉ mới</Button>
        </div>
        {addAddress ? (
          <EditAddress setEdit={setEdit} setAddAddress={setAddAddress} />
        ) : null}
      </div>
    </PageAccountAddress>
  );
}

export default Address;
