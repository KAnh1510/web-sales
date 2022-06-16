/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import styles from "./EditAddress.module.scss";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLocationPin,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function EditAddress(props) {
  const { className, setEdit, setAddAddress } = props;

  const handelChange = () => {};
  return (
    <div className={cx(className)}>
      <div className={cx("edit-address")}>
        <form
          action="/account/addresses/1102813678"
          id="address_form_1102813678"
          method="post"
        >
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              id="address_last_name_1102813678"
              className={cx("form-control", "textbox")}
              name="address[last_name]"
              size="40"
              value="Nguyen"
              placeholder="Họ"
              onChange={handelChange}
            />
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              id="address_first_name_1102813678"
              className={cx("form-control", "textbox")}
              name="address[first_name]"
              size="40"
              value="Anh"
              onChange={handelChange}
              placeholder="Tên"
            />
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faHome} />
            </span>
            <input
              type="text"
              htmlFor="address_company_1102813678"
              className={cx("form-control", "textbox")}
              name="address[company]"
              size="40"
              placeholder="Công ty"
            />
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faHome} />
            </span>
            <input
              type="text"
              id="address_address1_1102813678"
              className={cx("form-control", "textbox")}
              name="address[address1]"
              size="40"
              placeholder="Địa chỉ 1"
            />
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faLocationPin} />
            </span>
            <select
              className={cx("form-control")}
              id="address_country_1102813678"
              name="address[country]"
              data-default="Vietnam"
            >
              <option data-provinces="[]">- Please Select --</option>
              <option data-provinces='["Hồ Chí Minh","Hà Nội","Đà Nẵng","An Giang","Bà Rịa - Vũng Tàu","Bình Dương","Bình Phước","Bình Thuận","Bình Định","Bạc Liêu","Bắc Giang","Bắc Kạn","Bắc Ninh","Bến Tre","Cao Bằng","Cà Mau","Cần Thơ","Gia Lai","Hà Giang","Hà Nam","Hà Tĩnh","Hòa Bình","Hưng Yên","Hải Dương","Hải Phòng","Hậu Giang","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Long An","Lào Cai","Lâm Đồng","Lạng Sơn","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Thanh Hóa","Thái Bình","Thái Nguyên","Thừa Thiên Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Tây Ninh","Vĩnh Long","Vĩnh Phúc","Yên Bái","Điện Biên","Đắk Lắk","Đắk Nông","Đồng Nai","Đồng Tháp"]'>
                Vietnam
              </option>
              <option data-provinces='["Alabama","Alaska","American Samoa","Arizona","Arkansas","Armed Forces Americas","Armed Forces Europe","Armed Forces Pacific","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]'>
                United States
              </option>
              <option data-provinces='["Amnat Charoen","Ang Thong","Bangkok","Bueng Kan","Buriram","Chachoengsao","Chai Nat","Chaiyaphum","Chanthaburi","Chiang Mai","Chiang Rai","Chon Buri","Chumphon","Kalasin","Kamphaeng Phet","Kanchanaburi","Khon Kaen","Krabi","Lampang","Lamphun","Loei","Lopburi","Mae Hong Son","Maha Sarakham","Mukdahan","Nakhon Nayok","Nakhon Pathom","Nakhon Phanom","Nakhon Ratchasima","Nakhon Sawan","Nakhon Si Thammarat","Nan","Narathiwat","Nong Bua Lam Phu","Nong Khai","Nonthaburi","Pathum Thani","Pattani","Pattaya","Phangnga","Phatthalung","Phayao","Phetchabun","Phetchaburi","Phichit","Phitsanulok","Phra Nakhon Si Ayutthaya","Phrae","Phuket","Prachin Buri","Prachuap Khiri Khan","Ranong","Ratchaburi","Rayong","Roi Et","Sa Kaeo","Sakon Nakhon","Samut Prakan","Samut Sakhon","Samut Songkhram","Saraburi","Satun","Sing Buri","Sisaket","Songkhla","Sukhothai","Suphan Buri","Surat Thani","Surin","Tak","Trang","Trat","Ubon Ratchathani","Udon Thani","Uthai Thani","Uttaradit","Yala","Yasothon"]'>
                Thailand
              </option>
            </select>
          </div>
          <div className={cx("input-group")}>
            <span className={cx("input-group-addon")}>
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <input
              type="text"
              id="address_phone_1102813678"
              className={cx("form-control", "textbox")}
              name="address[phone]"
              size="40"
              placeholder="Số điện thoại"
            />
          </div>
          <div className={cx("input-group")}>
            <input
              type="checkbox"
              id="address_default_address_1102813678"
              name="address[default]"
            />{" "}
            Đặt làm địa chỉ mặc định.
          </div>
          <div className={cx("action_bottom")}>
            <input
              className={cx("btn bt-primary")}
              type="submit"
              value="Cập nhật"
              onChange={handelChange}
            />
            <span className={cx("")}>
              hoặc{" "}
              <a
                href="#"
                // eslint-disable-next-line no-sequences
                onClick={() => (setEdit(false), setAddAddress(false))}
              >
                Hủy
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAddress;
