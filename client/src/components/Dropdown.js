import { Menu, Dropdown, message } from "antd";
import "antd/dist/antd.css";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

export default function DropdownView(props) {
  const { error, loading, isAuthanticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    message.success("Muvafaqqiyatli Tizimdan Chiqildi");
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/login">Kirish</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/signup">Ro'yxatdan o'tish</Link>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Profil</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/card">Savatcha</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/" onClick={logoutHandler}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={!isAuthanticated ? menu : menu2}
      placement="bottomCenter"
      trigger={["click"]}
    >
      <Link
        to="/"
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        {props.children}
        {/* <DownOutlined /> */}
      </Link>
    </Dropdown>
  );
}
