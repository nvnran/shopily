import React from "react";
import { Menu } from "antd";
import { auth } from "../Firebase";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import {
  HomeOutlined,
  AppstoreOutlined,
  LockOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const { SubMenu } = Menu;
const { Item } = Menu;

class HeaderComponent extends React.Component {
  state = {
    current: "home",
    auth: {},
  };

  handleLogout = () => {
    auth.signOut();
    let dispatch = useDispatch();
    toast.success("You are now logged out");
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    console.log(this.props);
    const { current } = this.state;
    const { loggedIn } = this.state;

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        <Item key="app" icon={<AppstoreOutlined />}>
          Account
        </Item>
        <Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        </Item>
        {loggedIn ? (
          <SubMenu
            key="SubMenu"
            icon={<LockOutlined />}
            title="Account"
            className="float-right"
          >
            <Item
              key="auth/login"
              icon={<UserOutlined />}
              onClick={this.handleLogout}
            >
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
            title={this.state.name}
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
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(HeaderComponent);
