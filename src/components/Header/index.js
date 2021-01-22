import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import firebase from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  LockOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderComponent = () => {
  const [current, setCurrent] = useState("");
  const [userName, setUserName] = useState("Account");

  const dispatch = useDispatch();
  const history = useHistory();
  let { auth } = useSelector((state) => ({ ...state }));
  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "AUTH_LOGOUT",
      payload: null,
    });
    toast.success("You are now logged out");
    setTimeout(() => {
      history.push("/");
    }, 5000);
  };

  useEffect(() => {
    if (auth) {
      setUserName("Hello, " + auth.name.split(" ")[0]);
    }
  }, [auth]);

  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  const { SubMenu } = Menu;
  const { Item } = Menu;

  return (
    <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="app" icon={<AppstoreOutlined />}>
        Account
      </Item>
      <Item key="About">About</Item>
      {auth && auth.loggedIn ? (
        <SubMenu
          key="SubMenu"
          icon={<LockOutlined />}
          title={userName}
          className="float-right"
        >
          <Item key="auth/login" icon={<UserOutlined />} onClick={handleLogout}>
            Logout
          </Item>
          <Item key="auth/profile" icon={<UserAddOutlined />}>
            <Link to="/auth/profile">Profile</Link>
          </Item>
        </SubMenu>
      ) : (
        <SubMenu
          key="SubMenu"
          icon={<LockOutlined />}
          title="Account"
          className="float-right"
        >
          <Item key="auth/login" icon={<UserOutlined />}>
            <Link to="/auth/login">Login</Link>
          </Item>
          <Item key="auth/register" icon={<UserAddOutlined />}>
            <Link to="/auth/register">Register</Link>
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default HeaderComponent;
